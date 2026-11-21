import AdminOverview from "@/app/components/dashboard/AdminOverview"
import { getUsers } from "@/app/lib/actions/users"
import { getAllMenuItems } from "@/app/lib/actions/menu-items"
import { getAllTransactions } from "@/app/lib/actions/payment"
import type { IUser } from "@/app/Types/user"
import type { IMenuItem } from "@/app/Types/menu-items"
import type { ITransaction } from "@/app/Types/transactions"

export default async function AdminDashboard() {
  const [users, items, transactions]: [IUser[], IMenuItem[], ITransaction[]] =
    await Promise.all([getUsers(), getAllMenuItems(), getAllTransactions()])

  if (
    !Array.isArray(users) ||
    !Array.isArray(items) ||
    !Array.isArray(transactions)
  ) {
    throw new Error("Could not load admin overview")
  }

  return (
    <AdminOverview
      totals={{
        users: users.length,
        vendors: users.filter((user) => user.role === "vendor").length,
        customers: users.filter((user) => user.role === "customer").length,
        menuItems: items.length,
        pendingItems: items.filter((item) => item.status === "pending").length,
        transactions: transactions.length,
      }}
    />
  )
}
