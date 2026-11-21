export interface IOrder {
  _id?: string
  customerId: string
  vendorId: string
  menuItemId: string
  deliveryDate: string
  deliveryAddress: string
  additionalMessage?: string
  status: "Pending" | "Accepted" | "Rejected" | "Cancelled"
}
