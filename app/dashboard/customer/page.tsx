import { redirect } from "next/navigation"
import CustomerOverview from "@/app/components/dashboard/CustomerOverview"
import { getMyOrders } from "@/app/lib/actions/order"
import { getSessionNow } from "@/app/lib/core/server"
import type { IOrder } from "@/app/Types/order"

export default async function CustomerDashboard() {
  const session = await getSessionNow()
  if (!session) redirect("/sign-in")
  const orders: IOrder[] = await getMyOrders(session.user.id)
  if (!Array.isArray(orders)) throw new Error("Could not load orders")

  return (
    <CustomerOverview
      totals={{
        total: orders.length,
        pending: orders.filter((order) => order.status === "pending").length,
        accepted: orders.filter((order) => order.status === "accepted").length,
        rejected: orders.filter((order) => order.status === "rejected").length,
      }}
    />
  )
}
