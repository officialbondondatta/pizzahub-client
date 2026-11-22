export interface IOrder {
  _id?: string
  // ISO date returned by the server; omitted when creating an order.
  createdAt?: string
  customerId: string
  vendorId: string
  menuItemId: string
  deliveryDate: string
  deliveryAddress: string
  additionalMessage?: string
  status: "pending" | "accepted" | "rejected" | "cancelled"
}
