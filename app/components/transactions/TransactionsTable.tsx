"use client"

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

export default function TransactionsTable({
  transactions,
}: {
  transactions: ITransaction[]
}) {
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
          {transactions.map((transaction, index) => (
            <TableRow
              key={
                transaction.stripeSessionId ||
                `${transaction.vendorId}-${index}`
              }
              className="border-brand-200/60 odd:bg-background even:bg-brand-100/40 hover:bg-brand-200/50 dark:border-brand-800/60 dark:even:bg-brand-900/20 dark:hover:bg-brand-800/30"
            >
              <TableHead scope="row" className="px-5 py-4">
                {/* TODO: Load the vendor name and email using vendorId. */}
                <p className="font-semibold">Vendor</p>
                <p className="mt-1 max-w-52 text-xs font-normal break-all whitespace-normal text-muted-foreground">
                  {transaction.vendorId || "Not available"}
                </p>
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
                {transaction.amount.toLocaleString("en-BD", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-xs uppercase">
                  {transaction.currency}
                </span>
              </TableCell>
              <TableCell className="px-5 py-4">
                <Badge variant="outline" className="capitalize">
                  {transaction.status || "Unknown"}
                </Badge>
              </TableCell>
              <TableCell className="px-5 py-4">
                {formatDate(transaction.payment_date || transaction.createdAt)}
              </TableCell>
              <TableCell className="px-5 py-4">
                <Button
                  variant="outline"
                  className="h-10"
                  aria-label={`View transaction for vendor ${transaction.vendorId}`}
                  onClick={() => console.log("View transaction", transaction)}
                >
                  <Eye aria-hidden="true" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
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
