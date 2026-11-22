import Image from "next/image"
import { getAllOrders, getUserInfo } from "@/app/lib/actions/order"
import { getMenuItemsByID } from "@/app/lib/actions/menu-items"
import { requireRoleFromSession } from "@/app/lib/core/server"
import type { IOrder } from "@/app/Types/order"
import type { IUser } from "@/app/Types/user"
import CustomerOrdersTable from "@/app/components/orders/CustomerOrdersTable"
import { orderCreatedAt } from "@/app/lib/order-created-at"

export default async function CustomerOrdersPage() {
  const session = await requireRoleFromSession("vendor")
  const [allOrders, items] = await Promise.all([
    getAllOrders(),
    getMenuItemsByID(),
  ])
  if (!Array.isArray(allOrders)) throw new Error("Could not load orders")
  const orders = (allOrders as IOrder[])
    .filter((order) => order.vendorId === session.user.id)
    .sort((a, b) => orderCreatedAt(b) - orderCreatedAt(a))
  const users: IUser[] = await getUserInfo()
  if (!Array.isArray(users)) throw new Error("Could not load customers")
  const customers = users
    .filter((user) => orders.some((order) => order.customerId === user._id))
    .map(({ _id, name, email, image }) => ({ _id, name, email, image }))

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="grid overflow-hidden rounded-2xl border border-brand-300 bg-brand-100/50 md:grid-cols-2 dark:border-brand-800 dark:bg-brand-900/20">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 text-xs font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            Fresh orders, happy customers
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Customer orders{" "}
            <span className="ml-2 rounded-full bg-brand-500/15 px-3 py-1 align-middle text-base text-brand-700 dark:text-brand-300">
              {orders.length}
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            View customer requests and delivery details. Only pending orders can
            be accepted or rejected.
          </p>
        </div>
        <Image
          src="/images/pizzahub-customer-orders.png"
          alt="A young adult woman in a modern short orange dress holding a pizza box in a pizzeria."
          width={1672}
          loading="eager"
          height={941}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </section>
      <CustomerOrdersTable
        orders={orders}
        items={items}
        customers={customers}
      />
    </div>
  )
}
