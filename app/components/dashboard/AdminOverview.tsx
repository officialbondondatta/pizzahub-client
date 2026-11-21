import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  Clock3,
  Pizza,
  Receipt,
  Store,
  UserRound,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type OverviewTotals = {
  users: number
  vendors: number
  customers: number
  menuItems: number
  pendingItems: number
  transactions: number
}

export default function AdminOverview({ totals }: { totals: OverviewTotals }) {
  const stats = [
    {
      label: "Total registered users",
      value: totals.users,
      icon: Users,
      detail: "Everyone in the PizzaHub community",
    },
    {
      label: "Total vendors",
      value: totals.vendors,
      icon: Store,
      detail: "The kitchens behind every slice",
    },
    {
      label: "Total customers",
      value: totals.customers,
      icon: UserRound,
      detail: "Registered pizza lovers",
    },
    {
      label: "Total menu items",
      value: totals.menuItems,
      icon: Pizza,
      detail: "Across all vendors and review statuses",
    },
    {
      label: "Pending menu items",
      value: totals.pendingItems,
      icon: Clock3,
      detail: "Waiting for your review",
    },
    {
      label: "Total transactions",
      value: totals.transactions,
      icon: Receipt,
      detail: "Recorded subscription payments",
    },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="grid overflow-hidden rounded-2xl border border-brand-300 bg-brand-100/50 md:grid-cols-[1fr_360px] dark:border-brand-800 dark:bg-brand-900/20">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 text-xs font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            PizzaHub at a glance
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">Admin overview</h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            A little oversight. A lot of great pizza. Keep track of your
            community, menu submissions, and payments in one place.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/admin/manage-menu-items" />}
            className="mt-5 h-11 w-fit rounded-xl bg-brand-700 px-5 text-white hover:bg-brand-800"
          >
            Manage menu items
            <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
        <div className="relative min-h-72">
          <Image
            src="/images/pizza-seller.png"
            alt="A pizza shop owner in a modern orange dress offering a fresh pizza."
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section
        aria-label="Overview totals"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
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
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.label === "Pending menu items" ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" : "bg-brand-500/15 text-brand-700 dark:text-brand-300"}`}
              >
                <stat.icon aria-hidden="true" className="size-5" />
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tabular-nums">
                {stat.value.toLocaleString("en-BD")}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {stat.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section aria-label="Quick links" className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/dashboard/admin/manage-users" />}
          className="h-11 rounded-xl"
        >
          <Users aria-hidden="true" />
          Manage users
          <ArrowUpRight aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/dashboard/admin/transactions" />}
          className="h-11 rounded-xl"
        >
          <Receipt aria-hidden="true" />
          View transactions
          <ArrowUpRight aria-hidden="true" />
        </Button>
      </section>
    </div>
  )
}
