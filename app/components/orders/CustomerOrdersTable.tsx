"use client"

import type { IOrder } from "@/app/Types/order"
import type { IMenuItem } from "@/app/Types/menu-items"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CustomerOrdersTable({
  orders,
  items,
}: {
  orders: IOrder[]
  items: IMenuItem[]
}) {
  // Placeholder only: connect these actions to the API later.
  const handleOrderAction = (
    order: IOrder,
    status: "accepted" | "rejected"
  ) => {
    console.log("Order action", { orderId: order._id, status })
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <Table>
        <TableHeader className="bg-brand-700 [&_tr:hover]:bg-brand-700">
          <TableRow>
            {[
              "Customer",
              "Item",
              "Delivery date",
              "Delivery address",
              "Message",
              "Status",
              "Actions",
            ].map((label) => (
              <TableHead key={label} className="px-5 py-4 text-white">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => {
            const item = items.find((item) => item._id === order.menuItemId)
            const date = new Date(order.deliveryDate)
            return (
              <TableRow key={order._id || index}>
                <TableCell className="max-w-48 px-5 py-4 break-all whitespace-normal">
                  <p className="text-xs text-muted-foreground">Customer ID</p>
                  {order.customerId}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <p className="font-medium">
                    {item?.name || "Item unavailable"}
                  </p>
                  {item && (
                    <p className="text-xs text-muted-foreground">
                      {item.category}
                    </p>
                  )}
                </TableCell>
                <TableCell className="px-5 py-4">
                  {Number.isNaN(date.getTime())
                    ? "Not available"
                    : date.toLocaleDateString("en-GB", {
                        timeZone: "Asia/Dhaka",
                      })}
                </TableCell>
                <TableCell className="max-w-56 min-w-40 px-5 py-4 wrap-break-word whitespace-pre-wrap">
                  {order.deliveryAddress}
                </TableCell>
                <TableCell className="max-w-56 min-w-36 px-5 py-4 wrap-break-word whitespace-pre-wrap">
                  {order.additionalMessage || "No message"}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Badge variant="secondary" className="capitalize">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <div className="flex gap-2">
                    <Button
                      disabled={order.status !== "pending" || !order._id}
                      onClick={() => handleOrderAction(order, "accepted")}
                      className="bg-brand-700 text-white hover:bg-brand-800"
                    >
                      Accept
                    </Button>
                    <Button
                      disabled={order.status !== "pending" || !order._id}
                      variant="outline"
                      onClick={() => handleOrderAction(order, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
          {!orders.length && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-14 text-center text-muted-foreground"
              >
                No customer orders yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
