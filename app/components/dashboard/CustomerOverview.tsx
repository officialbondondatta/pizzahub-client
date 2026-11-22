import Image from "next/image"
import Link from "next/link"
import {
  Package,
  Clock3,
  CircleCheck,
  CircleX,
  ArrowUpRight,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type OrderTotals = {
  total: number
  pending: number
  accepted: number
  rejected: number
}

export default function CustomerOverview({ totals }: { totals: OrderTotals }) {
  const stats = [
    {
      label: "Total orders",
      value: totals.total,
      icon: Package,
      color: "bg-brand-500/15 text-brand-700 dark:text-brand-300",
    },
    {
      label: "Pending orders",
      value: totals.pending,
      icon: Clock3,
      color:
        "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    },
    {
      label: "Accepted orders",
      value: totals.accepted,
      icon: CircleCheck,
      color:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      label: "Rejected orders",
      value: totals.rejected,
      icon: CircleX,
      color: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
    },
  ]
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="grid overflow-hidden rounded-2xl border border-brand-300 bg-brand-100/50 md:grid-cols-[1fr_360px] dark:border-brand-800 dark:bg-brand-900/20">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 text-xs font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            Your PizzaHub at a glance
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">Customer overview</h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Your next great pizza moment starts here. Keep track of your orders
            and see which ones are waiting or accepted.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/customer/my-orders" />}
            className="mt-5 h-11 w-fit rounded-xl bg-brand-700 px-5 text-white hover:bg-brand-800"
          >
            View my orders
            <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
        <div className="relative min-h-72">
          <Image
            src="/images/pizzahub-delivery.png"
            alt="A customer receiving pizza boxes from a PizzaHub delivery worker."
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover"
          />
        </div>
      </section>
      <section
        aria-label="Order totals"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-2xl border border-brand-200 shadow-sm ring-0 dark:border-brand-800"
          >
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <CardTitle className="text-sm text-muted-foreground">
                {stat.label}
              </CardTitle>
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.color}`}
              >
                <stat.icon aria-hidden="true" className="size-5" />
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tabular-nums">
                {stat.value.toLocaleString("en-BD")}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
