import Link from "next/link"
import { ArrowLeft, ArrowRight, CreditCard, Pizza, X } from "lucide-react"

export default function PaymentCancelPage() {
  return (
    <section className="flex min-h-[75svh] items-center justify-center bg-linear-to-b from-brand-100/60 to-background px-4 py-16 dark:from-brand-950/30">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border bg-background shadow-xl shadow-brand-950/5">
        <div className="h-1.5 bg-linear-to-r from-brand-300 via-brand-500 to-brand-700" />
        <div className="p-6 text-center sm:p-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase dark:text-brand-300">
            <Pizza className="size-4" aria-hidden="true" />
            PizzaHub Premium
          </span>

          <div className="relative mx-auto mt-8 flex size-20 items-center justify-center rounded-3xl bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
            <CreditCard
              className="size-9"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full border-4 border-background bg-brand-700 text-white">
              <X className="size-3.5" aria-hidden="true" />
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Payment cancelled
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Looks like you left checkout before finishing. No worries—you can
            explore the plans and come back whenever you&apos;re ready.
          </p>

          <div className="mt-7 rounded-2xl border border-dashed bg-muted/40 p-4 text-left">
            <p className="text-sm font-semibold">Your next chapter can wait.</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Premium gives your kitchen more room to grow with unlimited menu
              items, a vendor badge, and featured placement.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/dashboard/vendor/subscription"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
            >
              Back to subscription
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
