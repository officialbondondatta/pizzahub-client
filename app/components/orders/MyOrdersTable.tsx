"use client"

import { toast } from "@/components/ui/toast"
import Image from "next/image"
import RequestDate from "./RequestDate"
import { formatOrderDate as formatDate } from "@/app/lib/format-order-date"
import { Eye, Package, X } from "lucide-react"
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
  TableCaption,
} from "@/components/ui/table"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { cancelOrder } from "@/app/lib/actions/order"
import { useRouter } from "next/navigation"

const statusStyles: Record<IOrder["status"], string> = {
  pending: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  accepted:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  rejected: "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200",
  cancelled: "bg-muted text-muted-foreground",
}

export default function MyOrdersTable({
  orders,
  items,
}: {
  orders: IOrder[]
  items: IMenuItem[]
}) {
  const router = useRouter()
  const handleOrderCancel = async (id: string) => {
    try {
      const result = await cancelOrder(id)
      if (!(result.modifiedCount > 0))
        throw new Error("Order was not cancelled")
      toast.add({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully.",
        type: "success",
      })
      router.refresh()
    } catch {
      toast.add({
        title: "Unable to cancel order",
        description:
          "Your order could not be cancelled. Refresh your orders and try again.",
        type: "error",
      })
    }
  }
  return (
    <div
      className="overflow-hidden rounded-2xl border border-brand-300 bg-card shadow-lg shadow-brand-900/5 dark:border-brand-800"
      role="region"
      aria-label="My orders"
      tabIndex={0}
    >
      <Table className="min-w-250 text-sm">
        <TableCaption className="sr-only">
          Your orders, delivery information, and status
        </TableCaption>
        <TableHeader className="bg-brand-700 [&_tr:hover]:bg-brand-700">
          <TableRow>
            {[
              "Item",
              "Vendor",
              "Delivery date",
              "Delivery address",
              "Status",
              "Request date",
              "Actions",
            ].map((label) => (
              <TableHead
                key={label}
                scope="col"
                className="px-5 py-4 text-xs font-semibold tracking-wider text-white uppercase"
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => {
            const item = items.find((item) => item._id === order.menuItemId)
            return (
              <TableRow
                key={order._id || index}
                className="border-brand-200/60 odd:bg-background even:bg-brand-100/40 hover:bg-brand-200/50 dark:border-brand-800/60 dark:even:bg-brand-900/20 dark:hover:bg-brand-800/30"
              >
                <TableHead scope="row" className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {item?.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        unoptimized
                        className="size-16 shrink-0 rounded-xl object-cover"
                      />
                    ) : (
                      <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <Package aria-hidden="true" />
                      </span>
                    )}
                    <span className="max-w-48 min-w-28 font-semibold wrap-break-word whitespace-normal">
                      {item?.name || "Item unavailable"}
                    </span>
                  </div>
                </TableHead>
                <TableCell className="max-w-44 px-5 py-4 wrap-break-word whitespace-normal">
                  {item?.vendorBusinessName || "Vendor unavailable"}
                </TableCell>
                <TableCell className="px-5 py-4">
                  {formatDate(order.deliveryDate)}
                </TableCell>
                <TableCell className="max-w-56 min-w-40 px-5 py-4 wrap-break-word whitespace-normal">
                  {order.deliveryAddress}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Badge className={`capitalize ${statusStyles[order.status]}`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <RequestDate value={order.createdAt} />
                </TableCell>
                <TableCell className="px-5 py-4">
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger
                        render={<Button variant="outline" className="h-10" />}
                        aria-label={`View order for ${item?.name || "item"}`}
                      >
                        <Eye aria-hidden="true" />
                        View
                      </DialogTrigger>
                      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Order details</DialogTitle>
                          <DialogDescription>
                            {item?.name || "Item unavailable"}
                          </DialogDescription>
                        </DialogHeader>
                        {item?.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={480}
                            height={240}
                            unoptimized
                            className="h-44 w-full rounded-xl object-cover"
                          />
                        )}
                        <dl className="grid gap-4 sm:grid-cols-2">
                          {[
                            [
                              "Vendor",
                              item?.vendorBusinessName || "Vendor unavailable",
                            ],
                            ["Order status", order.status],
                            ["Delivery date", formatDate(order.deliveryDate)],
                            ["Request date", formatDate(order.createdAt, true)],
                            ["Delivery address", order.deliveryAddress],
                            [
                              "Special instructions",
                              order.additionalMessage || "None",
                            ],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className={
                                label === "Delivery address" ||
                                label === "Special instructions"
                                  ? "sm:col-span-2"
                                  : ""
                              }
                            >
                              <dt className="text-xs text-muted-foreground">
                                {label}
                              </dt>
                              <dd className="mt-1 wrap-break-word whitespace-pre-wrap">
                                {value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <DialogFooter showCloseButton />
                      </DialogContent>
                    </Dialog>
                    {order.status === "pending" && (
                      <Dialog>
                        <DialogTrigger
                          render={
                            <Button
                              variant="destructive"
                              className="h-10"
                              disabled={!order._id}
                            />
                          }
                          aria-label={`Cancel order for ${item?.name || "item"}`}
                        >
                          <X aria-hidden="true" />
                          Cancel
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cancel this order?</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to cancel your order for{" "}
                              {item?.name || "this item"}?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose render={<Button variant="outline" />}>
                              Keep order
                            </DialogClose>
                            <DialogClose
                              render={<Button variant="destructive" />}
                              onClick={() =>
                                handleOrderCancel(order._id as string)
                              }
                            >
                              Cancel order
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
          {!orders.length && (
            <TableRow>
              <TableCell colSpan={7} className="px-6 py-14 text-center">
                <Package
                  aria-hidden="true"
                  className="mx-auto mb-3 size-9 text-muted-foreground"
                />
                <p className="text-base font-semibold">No orders yet</p>
                <p className="mt-2 text-muted-foreground">
                  Your pizza orders will appear here.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
