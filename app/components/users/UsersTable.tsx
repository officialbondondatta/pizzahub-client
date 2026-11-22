"use client"

import { getSubscriptionPlan } from "@/app/lib/subscription"
import { useState } from "react"
import { Ban, Search, ShieldCheck, Users } from "lucide-react"
import type { IUser } from "@/app/Types/user"
import { Button } from "@/components/ui/button"
import UserDetailsDialog from "./UserDetailsDialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
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
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import { blockUser } from "@/app/lib/actions/users"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"

export type TableUser = Pick<
  IUser,
  | "_id"
  | "name"
  | "email"
  | "role"
  | "plan"
  | "isBlocked"
  | "businessName"
  | "image"
  | "subscriptionExpiresAt"
>

export default function UsersTable({ users }: { users: TableUser[] }) {
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("all")
  const router = useRouter()
  const query = search.trim().toLowerCase()
  const filteredUsers = users.filter(
    (user) =>
      (role === "all" || user.role === role) &&
      (user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query))
  )
  const handleBlockUser = async (id: string) => {
    try {
      const result = await blockUser(id)
      toast.add({
        title:
          result.modifiedCount > 0
            ? "User block status updated"
            : "User block status not changed",
        description:
          result.modifiedCount > 0
            ? "The user's access status has been updated."
            : result.message ||
              "No changes were made. Refresh the user list and try again.",
        type: result.modifiedCount > 0 ? "success" : "error",
      })
      router.refresh()
    } catch {
      toast.add({
        title: "Could not update user block status",
        description: "Please try again.",
        type: "error",
      })
    }
  }
  return (
    <section className="space-y-4" aria-label="User directory">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label
            htmlFor="user-search"
            className="mb-2 block text-sm font-medium"
          >
            Search users
          </Label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="absolute top-3.5 left-3.5 size-4 text-muted-foreground"
            />
            <Input
              id="user-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email…"
              className="h-11 w-full rounded-xl border bg-background pr-4 pl-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <Label htmlFor="user-role" className="mb-2 block text-sm font-medium">
            Filter by role
          </Label>
          <Select
            value={role}
            onValueChange={(value) => setRole(value ?? "all")}
          >
            <SelectTrigger
              id="user-role"
              className="w-full rounded-xl data-[size=default]:h-11"
            >
              <SelectValue>
                {
                  {
                    all: "All roles",
                    customer: "Customers",
                    vendor: "Vendors",
                    admin: "Admins",
                  }[role]
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="customer">Customers</SelectItem>
              <SelectItem value="vendor">Vendors</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(search || role !== "all") && (
          <Button
            variant="outline"
            className="h-11 rounded-xl"
            onClick={() => {
              setSearch("")
              setRole("all")
            }}
          >
            Clear filters
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground" role="status">
        Showing {filteredUsers.length} of {users.length} users
      </p>
      <div
        className="overflow-hidden rounded-2xl border border-brand-300 bg-card shadow-lg shadow-brand-900/5 dark:border-brand-800"
        role="region"
        aria-label="Users table"
        tabIndex={0}
      >
        <Table className="min-w-200 text-left text-sm">
          <TableCaption className="sr-only">
            User contact details, roles, plans, account status, and actions
          </TableCaption>
          <TableHeader className="border-b border-brand-600 bg-brand-700 [&_tr:hover]:bg-brand-700">
            <TableRow>
              {["User", "Role", "Business", "Plan", "Status", "Actions"].map(
                (label) => (
                  <TableHead
                    key={label}
                    scope="col"
                    className="px-5 py-4 text-xs font-semibold tracking-wider text-white uppercase"
                  >
                    {label}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user._id || user.email}
                className="border-brand-200/60 odd:bg-background even:bg-brand-100/40 hover:bg-slate-100 dark:border-brand-800/60 dark:even:bg-brand-900/20 dark:hover:bg-brand-800/30"
              >
                <TableHead scope="row" className="px-5 py-4">
                  <UserDetailsDialog user={user} />
                </TableHead>
                <TableCell className="px-5 py-4">
                  <Badge
                    variant="outline"
                    className="border-brand-300 bg-brand-100 text-brand-800 capitalize dark:border-brand-700 dark:bg-brand-900 dark:text-brand-200"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-48 px-5 py-4 wrap-break-word whitespace-normal text-muted-foreground">
                  {user.businessName || "—"}
                </TableCell>
                <TableCell className="px-5 py-4 capitalize">
                  {getSubscriptionPlan(user)}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Badge
                    className={
                      user.isBlocked
                        ? "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200"
                        : "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                    }
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Dialog>
                    <DialogTrigger
                      render={
                        <Button
                          variant={user.isBlocked ? "outline" : "destructive"}
                          className="h-10 min-w-28 cursor-pointer"
                          disabled={!user._id}
                        />
                      }
                      aria-label={`${user.isBlocked ? "Unblock" : "Block"} ${user.name}`}
                    >
                      {user.isBlocked ? (
                        <ShieldCheck aria-hidden="true" />
                      ) : (
                        <Ban aria-hidden="true" />
                      )}
                      {user.isBlocked ? "Unblock" : "Block"}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {user.isBlocked ? "Unblock user?" : "Block user?"}
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to{" "}
                          {user.isBlocked ? "unblock" : "block"} &quot;
                          {user.name}&quot;?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-2 text-sm">
                        <p>
                          Plan:{" "}
                          <span className="font-medium capitalize">
                            {getSubscriptionPlan(user)}
                          </span>
                        </p>
                        <p>
                          Role:{" "}
                          <span className="font-medium capitalize">
                            {user.role}
                          </span>
                        </p>
                      </div>
                      <DialogFooter>
                        <DialogClose render={<Button variant="outline" />}>
                          Cancel
                        </DialogClose>
                        <DialogClose
                          render={
                            <Button
                              variant={
                                user.isBlocked ? "default" : "destructive"
                              }
                            />
                          }
                          onClick={() => handleBlockUser(user?._id as string)}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
            {!filteredUsers.length && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-6 py-14 text-center whitespace-normal"
                >
                  <Users
                    aria-hidden="true"
                    className="mx-auto mb-3 size-9 text-muted-foreground"
                  />
                  <p className="text-base font-semibold">
                    {users.length ? "No matching users" : "No users yet"}
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    {users.length
                      ? "Try another name, email, or role."
                      : "Registered users will appear here."}
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
