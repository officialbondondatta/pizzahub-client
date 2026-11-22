import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  CircleCheck,
  Clock3,
  Crown,
  Pizza,
  UtensilsCrossed,
} from "lucide-react"
import { getMenuItemsByID } from "@/app/lib/actions/menu-items"
import { getAllOrders } from "@/app/lib/actions/order"
import { requireRoleFromSession } from "@/app/lib/core/server"
import type { IOrder } from "@/app/Types/order"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function VendorDashboard() {
  const session = await requireRoleFromSession("vendor")
  const [items, allOrders] = await Promise.all([
    getMenuItemsByID(),
    getAllOrders(),
  ])
  if (!Array.isArray(allOrders)) throw new Error("Could not load orders")
  const orders = (allOrders as IOrder[]).filter(
    (order) => order.vendorId === session.user.id
  )
  const stats = [
    {
      label: "Total menu items",
      value: items.length,
      icon: Pizza,
      href: "/dashboard/vendor/my-menu-items",
    },
    {
      label: "Active menu items",
      value: items.filter((item) => item.isActive).length,
      icon: UtensilsCrossed,
      href: "/dashboard/vendor/my-menu-items",
    },
    {
      label: "Pending customer orders",
      value: orders.filter((order) => order.status === "pending").length,
      icon: Clock3,
      href: "/dashboard/vendor/customer-orders",
    },
    {
      label: "Accepted orders",
      value: orders.filter((order) => order.status === "accepted").length,
      icon: CircleCheck,
      href: "/dashboard/vendor/customer-orders",
    },
    {
      label: "Current subscription plan",
      value: session.user.plan === "premium" ? "Premium" : "Free",
      icon: Crown,
      href: "/dashboard/vendor/subscription",
    },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="grid overflow-hidden rounded-2xl border border-brand-300 bg-brand-100/50 md:grid-cols-2 dark:border-brand-800 dark:bg-brand-900/20">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 text-xs font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            Your kitchen at a glance
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">Vendor overview</h1>
          <p className="mt-3 text-lg font-medium">
            Welcome back, {session.user.businessName || session.user.name}.
          </p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Keep an eye on your menu, customer orders, and subscription.
            Everything you need for your next busy service is right here.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/vendor/customer-orders" />}
            className="mt-5 h-11 w-fit rounded-xl bg-brand-700 px-5 text-white hover:bg-brand-800"
          >
            View customer orders <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
        <Image
          src="/images/pizzahub-customer-orders.png"
          alt="A smiling woman holding a pizza box in a warm, welcoming pizzeria."
          width={1672}
          height={941}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </section>
      <section
        aria-label="Vendor overview totals"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
          >
            <Card className="h-full rounded-2xl border border-brand-200 shadow-sm ring-0 transition-colors hover:bg-brand-100/40 dark:border-brand-800 dark:hover:bg-brand-900/20">
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle className="text-sm text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-700 dark:text-brand-300">
                  <stat.icon aria-hidden="true" className="size-5" />
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tabular-nums">
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString("en-BD")
                    : stat.value}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  )
}
