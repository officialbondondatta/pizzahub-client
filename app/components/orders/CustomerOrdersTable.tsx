"use client"

import Image from "next/image"
import RequestDate from "./RequestDate"
import { formatOrderDate } from "@/app/lib/format-order-date"
import type { IUser } from "@/app/Types/user"
import type { IOrder } from "@/app/Types/order"
import type { IMenuItem } from "@/app/Types/menu-items"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { changeOrderStatus } from "@/app/lib/actions/order"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"

export default function CustomerOrdersTable({
  orders,
  items,
  customers,
}: {
  orders: IOrder[]
  items: IMenuItem[]
  customers: Pick<IUser, "_id" | "name" | "email" | "image">[]
}) {
  const router = useRouter()
  const handleOrderAction = async (
    order: IOrder,
    status: "accepted" | "rejected"
  ) => {
    const result = await changeOrderStatus(order._id as string, {
      status: status,
    })
    console.log(result)
    if (result.modifiedCount > 0) {
      toast.add({
        title: `Order ${status}`,
        description: `Successful`,
      })
      router.refresh()
    }
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border bg-card">
      <Table className="min-w-320">
        <TableHeader className="bg-brand-700 [&_tr:hover]:bg-brand-700">
          <TableRow>
            {[
              "Customer",
              "Item",
              "Request date",
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
            const customer = customers.find(
              (user) => user._id === order.customerId
            )
            return (
              <TableRow key={order._id || index}>
                <TableCell className="max-w-72 min-w-56 px-5 py-4 whitespace-normal">
                  <Dialog>
                    <DialogTrigger
                      disabled={!customer}
                      aria-label={`View customer information for ${customer?.name || "unavailable customer"}`}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-lg text-left outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-default"
                    >
                      {customer?.image ? (
                        <Image
                          src={customer.image}
                          alt={customer.name}
                          width={40}
                          height={40}
                          unoptimized
                          className="size-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span
                          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-500/15 font-semibold text-brand-700 dark:text-brand-300"
                          aria-hidden="true"
                        >
                          {customer?.name?.charAt(0).toUpperCase() || "?"}
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block font-medium wrap-break-word">
                          {customer?.name || "Customer unavailable"}
                        </span>
                        <span className="block text-xs break-all text-muted-foreground">
                          {customer?.email || "Email unavailable"}
                        </span>
                      </span>
                    </DialogTrigger>
                    {customer && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Customer information</DialogTitle>
                          <DialogDescription>
                            Contact details for this customer.
                          </DialogDescription>
                        </DialogHeader>
                        {customer.image ? (
                          <Image
                            src={customer.image}
                            alt={customer.name}
                            width={96}
                            height={96}
                            unoptimized
                            className="mx-auto size-24 rounded-full object-cover"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="mx-auto flex size-24 items-center justify-center rounded-full bg-brand-500/15 text-3xl font-semibold text-brand-700 dark:text-brand-300"
                          >
                            {customer.name?.charAt(0).toUpperCase() || "?"}
                          </span>
                        )}
                        <dl className="space-y-4">
                          <div>
                            <dt className="text-xs text-muted-foreground">
                              Name
                            </dt>
                            <dd className="mt-1 font-medium wrap-break-word">
                              {customer.name || "Name unavailable"}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs text-muted-foreground">
                              Email
                            </dt>
                            <dd className="mt-1 break-all">
                              {customer.email || "Email unavailable"}
                            </dd>
                          </div>
                        </dl>
                        <DialogFooter showCloseButton />
                      </DialogContent>
                    )}
                  </Dialog>
                </TableCell>
                <TableCell className="w-72 min-w-64 px-5 py-4 whitespace-normal">
                  {item ? (
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/browse-menu/${encodeURIComponent(order.menuItemId)}`
                        )
                      }
                      aria-label={`View item details for ${item.name}`}
                      className="flex w-full min-w-54 cursor-pointer flex-col gap-1.5 rounded-lg p-2 text-left whitespace-normal outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      <span className="block text-base leading-snug font-semibold wrap-break-word text-brand-700 underline-offset-4 hover:underline dark:text-brand-300">
                        {item.name}
                      </span>
                      <span className="block text-sm leading-relaxed text-muted-foreground">
                        {item.category}
                      </span>
                    </button>
                  ) : (
                    <p className="font-medium">Item unavailable</p>
                  )}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <RequestDate value={order.createdAt} />
                </TableCell>
                <TableCell className="px-5 py-4">
                  {formatOrderDate(order.deliveryDate)}
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
                colSpan={8}
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
