import Image from "next/image"
import { getMyOrders } from "@/app/lib/actions/order"
import { getSessionNow } from "@/app/lib/core/server"
import { getAllMenuItems } from "@/app/lib/actions/menu-items"
import { withVendorBusinessNames } from "@/app/lib/vendor-business-names"
import type { IOrder } from "@/app/Types/order"
import MyOrdersTable from "@/app/components/orders/MyOrdersTable"
import { redirect } from "next/navigation"
import { orderCreatedAt } from "@/app/lib/order-created-at"

export default async function MyOrdersPage() {
  const session = await getSessionNow()
  if (!session) redirect("/sign-in")
  const [orders, menuItems] = await Promise.all([
    getMyOrders(session.user.id) as Promise<IOrder[]>,
    getAllMenuItems(),
  ])
  if (!Array.isArray(orders)) throw new Error("Could not load orders")
  const newestOrders = [...orders].sort(
    (a, b) => orderCreatedAt(b) - orderCreatedAt(a)
  )
  const items = await withVendorBusinessNames(
    menuItems.filter((item) =>
      orders.some((order) => order.menuItemId === item._id)
    )
  )
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="grid overflow-hidden rounded-2xl border border-brand-300 bg-brand-100/50 md:grid-cols-[1fr_360px] dark:border-brand-800 dark:bg-brand-900/20">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 text-xs font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            From the oven to your door
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">
            My orders{" "}
            <span className="ml-2 inline-flex rounded-full bg-brand-500/15 px-3 py-1 align-middle text-base text-brand-700 dark:text-brand-300">
              {orders.length}
            </span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Good pizza is on the way. View your order details, check delivery
            information, and manage pending orders.
          </p>
        </div>
        <div className="relative min-h-72">
          <Image
            src="/images/pizzahub-delivery.png"
            alt="A young adult woman in a modern orange dress receiving pizza boxes from a PizzaHub delivery worker."
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover"
          />
        </div>
      </section>
      <MyOrdersTable orders={newestOrders} items={items} />
    </div>
  )
}
