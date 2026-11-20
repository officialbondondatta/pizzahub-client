import Link from "next/link"
import { redirect } from "next/navigation"
import { stripe } from "@/lib/stripe"

type PaymentSuccessPageProps = {
    searchParams: Promise<{ session_id?: string | string[] }>
}

export default async function PaymentSuccessPage({
    searchParams,
}: PaymentSuccessPageProps) {
    const { session_id } = await searchParams

    if (typeof session_id !== "string" || !session_id.startsWith("cs_")) {
        redirect("/dashboard/vendor/subscription")
    }

    const session = await stripe.checkout.sessions
        .retrieve(session_id)
        .catch(() => null)

    if (!session) {
        return (
            <section className="mx-auto max-w-lg px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Unable to confirm your payment</h1>
                <p className="mt-3 text-muted-foreground">
                    Please refresh this page to try again. If you already paid, avoid
                    submitting another payment while confirmation is unavailable.
                </p>
                <Link
                    href="/dashboard/vendor/subscription"
                    className="mt-6 inline-block underline underline-offset-4"
                >
                    Back to subscription
                </Link>
            </section>
        )
    }

    if (session.status === "open") {
        redirect("/dashboard/vendor/subscription")
    }

    if (session.status === "expired") {
        redirect("/payment/cancel")
    }

    const paid = session.payment_status === "paid"
    const customerEmail = session.customer_details?.email

    return (
        <section className="flex min-h-[75svh] items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg rounded-3xl border bg-card p-8 text-center shadow-lg sm:p-10">
                <p className="text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase dark:text-brand-300">
                    PizzaHub
                </p>
                <h1 className="mt-4 text-3xl font-bold">
                    {paid ? "Payment successful!" : "Payment awaiting confirmation"}
                </h1>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {paid
                        ? "Thank you for your purchase. We appreciate your business!"
                        : "Your payment has not been confirmed yet. Please check back shortly."}
                </p>
                {paid && customerEmail && (
                    <p className="mt-3 text-sm wrap-break-word text-muted-foreground">
                        Checkout email:{" "}
                        <span className="font-medium text-foreground">{customerEmail}</span>
                    </p>
                )}
                <Link
                    href="/dashboard/vendor/subscription"
                    className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-700 px-6 text-sm font-semibold text-white hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
                >
                    Back to subscription
                </Link>
            </div>
        </section>
    )
}
