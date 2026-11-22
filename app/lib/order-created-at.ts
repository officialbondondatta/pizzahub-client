import type { IOrder } from "@/app/Types/order"

export function orderCreatedAt(order: IOrder) {
  const timestamp = Date.parse(order.createdAt || "")
  if (Number.isFinite(timestamp)) return timestamp
  // Older orders may only have MongoDB's creation timestamp in their ID.
  return order._id && /^[a-f\d]{24}$/i.test(order._id)
    ? parseInt(order._id.slice(0, 8), 16) * 1000
    : 0
}
