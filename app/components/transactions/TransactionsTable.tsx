"use client"

import VendorAvatar from "./VendorAvatar"
import { Eye, Receipt } from "lucide-react"
import type { ITransaction } from "@/app/Types/transactions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { IUser } from "@/app/Types/user"

function formatDate(value?: string) {
  if (!value) return "—"
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeZone: "Asia/Dhaka",
    }).format(date)
}
export interface ITransactionTableProps {
  transactions: ITransaction[]
  users: Pick<IUser, "_id" | "name" | "email" | "image">[]
}

export default function TransactionsTable({
  transactions,
  users,
}: ITransactionTableProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-brand-300 bg-card shadow-lg shadow-brand-900/5 dark:border-brand-800"
      role="region"
      aria-label="Transactions table"
      tabIndex={0}
    >
      <Table className="min-w-200 text-left text-sm">
        <TableCaption className="sr-only">
          Vendor subscription payments and transaction dates
        </TableCaption>
        <TableHeader className="border-b border-brand-600 bg-brand-700 [&_tr:hover]:bg-brand-700">
          <TableRow>
            {[
              "Vendor",
              "Subscription plan",
              "Payment amount",
              "Payment status",
              "Transaction date",
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
          {transactions.map((transaction, index) => {
            const vendor = users.find(
              (user) => user._id === transaction.vendorId
            )
            return (
              <TableRow
                key={
                  transaction.stripeSessionId ||
                  `${transaction.vendorId}-${index}`
                }
                className="border-brand-200/60 odd:bg-background even:bg-brand-100/40 hover:bg-brand-200/50 dark:border-brand-800/60 dark:even:bg-brand-900/20 dark:hover:bg-brand-800/30"
              >
                <TableHead scope="row" className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <VendorAvatar name={vendor?.name} image={vendor?.image} />
                    <div>
                      <p className="font-semibold">
                        {vendor?.name || "Unknown vendor"}
                      </p>
                      <p className="mt-1 max-w-52 text-xs font-normal break-all whitespace-normal text-muted-foreground">
                        {vendor?.email || "Email not available"}
                      </p>
                    </div>
                  </div>
                </TableHead>
                <TableCell className="px-5 py-4">
                  <Badge
                    variant="outline"
                    className="border-brand-300 bg-brand-100 text-brand-800 capitalize dark:border-brand-700 dark:bg-brand-900 dark:text-brand-200"
                  >
                    {transaction.plan}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4 text-base font-semibold text-brand-700 dark:text-brand-300">
                  <span className="text-sm uppercase">
                    {(transaction.amount / 100).toFixed(2)} USD
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Badge variant="outline" className="capitalize">
                    {transaction.status || "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4">
                  {formatDate(
                    transaction.payment_date || transaction.createdAt
                  )}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Dialog>
                    <DialogTrigger
                      render={<Button variant="outline" className="h-10" />}
                      aria-label={`View transaction for ${vendor?.name || "vendor"}`}
                    >
                      <Eye aria-hidden="true" />
                      View
                    </DialogTrigger>
                    <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Transaction details</DialogTitle>
                        <DialogDescription>
                          Vendor information and subscription payment details.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center gap-4 rounded-xl bg-brand-500/10 p-4">
                        <VendorAvatar
                          name={vendor?.name}
                          image={vendor?.image}
                          large
                        />
                        <div className="min-w-0">
                          <p className="font-semibold wrap-break-word">
                            {vendor?.name || "Unknown vendor"}
                          </p>
                          <p className="mt-1 break-all text-muted-foreground">
                            {vendor?.email || "Email not available"}
                          </p>
                        </div>
                      </div>
                      <dl className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <dt className="text-xs text-muted-foreground">
                            Subscription plan
                          </dt>
                          <dd className="mt-1 font-medium capitalize">
                            {transaction.plan}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-muted-foreground">
                            Payment amount
                          </dt>
                          <dd className="mt-1 font-semibold text-brand-700 dark:text-brand-300">
                            {(transaction.amount / 100).toFixed(2)} USD
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-muted-foreground">
                            Payment status
                          </dt>
                          <dd className="mt-1">
                            <Badge variant="outline" className="capitalize">
                              {transaction.status || "Unknown"}
                            </Badge>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-muted-foreground">
                            Transaction date
                          </dt>
                          <dd className="mt-1">
                            {formatDate(
                              transaction.payment_date || transaction.createdAt
                            )}
                          </dd>
                        </div>
                      </dl>
                      <DialogFooter showCloseButton />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            )
          })}
          {!transactions.length && (
            <TableRow>
              <TableCell colSpan={6} className="px-6 py-14 text-center">
                <Receipt
                  aria-hidden="true"
                  className="mx-auto mb-3 size-9 text-muted-foreground"
                />
                <p className="text-base font-semibold">No transactions yet</p>
                <p className="mt-2 text-muted-foreground">
                  Subscription payments will appear here.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
