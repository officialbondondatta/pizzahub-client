import Image from "next/image"
import { getAllTransactions } from "@/app/lib/actions/payment"
import type { ITransaction } from "@/app/Types/transactions"
import TransactionsTable from "@/app/components/transactions/TransactionsTable"

export default async function TransactionsPage() {
  const transactions: ITransaction[] = await getAllTransactions()
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="grid overflow-hidden rounded-2xl border border-brand-300 bg-brand-100/50 md:grid-cols-[1fr_360px] dark:border-brand-800 dark:bg-brand-900/20">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 text-xs font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            PizzaHub payments
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Transactions{" "}
            <span className="ml-2 inline-flex rounded-full bg-brand-500/15 px-3 py-1 align-middle text-base text-brand-700 dark:text-brand-300">
              {transactions.length}
            </span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Every payment, in one place. Review vendor subscriptions, payment
            amounts, and transaction history.
          </p>
        </div>
        <div className="relative min-h-72">
          <Image
            src="/images/pizzahub-payment.png"
            alt="An adult South Asian woman in a modern orange outfit paying by card at a pizza restaurant."
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover"
          />
        </div>
      </section>
      <TransactionsTable transactions={transactions} />
    </div>
  )
}
