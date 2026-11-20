import Link from "next/link"
import { redirect } from "next/navigation"
import { stripe } from "@/app/lib/stripe"
import { checkoutVerify } from "@/app/lib/actions/payment"
import PaymentToast from "@/app/components/subscription/PaymentToast"

type PaymentSuccessPageProps = {
  searchParams: Promise<{ session_id?: string | string[] }>
}

const PaymentSuccessPage = async ({
  searchParams,
}: PaymentSuccessPageProps) => {
  const { session_id } = await searchParams

  if (typeof session_id !== "string" || !session_id.startsWith("cs_")) {
    redirect("/dashboard/vendor/subscription")
  }
  const { payment_status, status, customer_email } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    })

  if (status === "open") {
    return redirect("/dashboard/vendor/subscription")
  }

  if (status === "expired") {
    redirect("/payment/cancel")
  }

  let verification: { success: boolean; message: string } | null = null
  if (status === "complete" && payment_status === "paid") {
    const result = await checkoutVerify(session_id)
    verification = {
      success: result.success === true,
      message: typeof result.message === "string" ? result.message : "",
    }
  }

  const paid = payment_status === "paid"

  return (
    <section className="flex min-h-[75svh] items-center justify-center px-4 py-16">
      {verification && (
        <PaymentToast
          success={verification.success}
          message={verification.message}
        />
      )}
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
        {paid && customer_email && (
          <p className="mt-3 text-sm wrap-break-word text-muted-foreground">
            Checkout email:{" "}
            <span className="font-medium text-foreground">
              {customer_email}
            </span>
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
export default PaymentSuccessPage
