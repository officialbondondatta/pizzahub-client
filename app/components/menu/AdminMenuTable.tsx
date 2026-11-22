"use client"
import Image from "next/image"
import RequestDate from "@/app/components/orders/RequestDate"
import { Eye, Trash2, MapPin, Clock3, CircleCheck, CircleX } from "lucide-react"
import type { IMenuItem } from "@/app/Types/menu-items"
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
import { Button } from "@/components/ui/button"
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  changeAvailability,
  changeStatus,
  deleteMenuItem,
  type IStatus,
} from "@/app/lib/actions/menu-items"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"
import { IUser } from "@/app/Types/user"
import VendorAvatar from "@/app/components/transactions/VendorAvatar"

const statusStyles = {
  pending:
    "border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200",
  accepted:
    "border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
  rejected:
    "border-rose-300 bg-rose-100 text-rose-900 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-200",
}

export default function AdminMenuTable({
  items,
  users,
}: {
  items: IMenuItem[]
  users: IUser[]
}) {
  const router = useRouter()
  const vendorsById = new Map(
    users
      .filter((user) => user.role === "vendor" && user._id)
      .map((vendor) => [vendor._id, vendor])
  )
  const handleStatusChange = async (id: string, value: IStatus) => {
    const result = await changeStatus(id, value)
    if (result.modifiedCount > 0) {
      toast.add({
        title: `Item is ${value.status}`,
        description: " Item status changed successfully",
      })
      router.refresh()
    }
  }
  const handleChangeAvailability = async (id: string, value: string) => {
    let currentData = false
    if (value === "Active") {
      currentData = true
    }
    if (value === "Inactive") {
      currentData = false
    }
    const updateData = {
      isActive: currentData,
    }
    const result = await changeAvailability(id, updateData)
    if (result.message) {
      toast.add({
        title: `Item availability can not be changed!`,
        description: result.message,
      })
      router.refresh()
    }
    if (result.modifiedCount > 0) {
      toast.add({
        title: `Item is ${value} now !`,
        description: " Item availability changed successfully",
      })
      router.refresh()
    }
  }
  const handleDeleteItem = async (id: string, item: IMenuItem) => {
    const result = await deleteMenuItem(id)
    if (result.deletedCount > 0) {
      toast.add({
        title: `${item.name} is deleted`,
        description: "Item deleted successfully",
      })
      router.refresh()
    }
  }

  return (
    <div
      className="overflow-hidden rounded-2xl border border-brand-300 bg-card shadow-lg shadow-brand-900/5 dark:border-brand-800 [&_button:not(:disabled):not([data-disabled])]:cursor-pointer"
      role="region"
      aria-label="All menu items"
      tabIndex={0}
    >
      <Table className="w-full min-w-225 text-left text-sm">
        <TableCaption className="sr-only">
          All menu items and their review status
        </TableCaption>
        <TableHeader className="border-b border-brand-600 bg-brand-700 [&_tr:hover]:bg-brand-700">
          <TableRow>
            {[
              "Item",
              "Category",
              "Vendor",
              "Price",
              "Location",
              "Status",
              "Availability",
              "Created at",
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
        <TableBody className="divide-y">
          {items.map((item) => {
            const vendor = vendorsById.get(item.vendorId)
            const businessName =
              vendor?.businessName ||
              item.vendorBusinessName ||
              "Business name not provided"
            return (
              <TableRow
                key={item._id}
                className="border-brand-200/60 transition-colors odd:bg-background even:bg-brand-100/40 hover:bg-brand-200/50 dark:border-brand-800/60 dark:even:bg-brand-900/20 dark:hover:bg-brand-800/30"
              >
                <TableHead scope="row" className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      alt=""
                      width={64}
                      height={64}
                      unoptimized
                      className="size-16 shrink-0 rounded-xl object-cover shadow-sm ring-2 ring-brand-300/60"
                    />
                    <span className="max-w-60 min-w-32 text-base font-semibold wrap-break-word whitespace-normal">
                      {item.name}
                    </span>
                  </div>
                </TableHead>
                <TableCell className="px-5 py-4">
                  <Badge
                    variant="outline"
                    className="border-brand-300 bg-brand-100 px-3 py-1 text-brand-800 dark:border-brand-700 dark:bg-brand-900 dark:text-brand-200"
                  >
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4 text-muted-foreground">
                  {vendor ? (
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button
                            variant="ghost"
                            className="h-auto max-w-60 justify-start p-2 text-left whitespace-normal"
                          />
                        }
                        aria-label={`View vendor details for ${businessName}`}
                      >
                        <span className="font-semibold wrap-break-word text-brand-700 underline-offset-4 hover:underline dark:text-brand-300">
                          {businessName}
                        </span>
                      </DialogTrigger>
                      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg [&_button:not(:disabled)]:cursor-pointer">
                        <DialogHeader>
                          <DialogTitle>Vendor details</DialogTitle>
                          <DialogDescription>
                            Profile and subscription details for {vendor.name}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-center py-2">
                          <VendorAvatar
                            name={vendor.name}
                            image={vendor.image}
                            large
                          />
                        </div>
                        <dl className="grid gap-4 py-2 sm:grid-cols-2">
                          <div>
                            <dt className="text-muted-foreground">Name</dt>
                            <dd className="mt-1 font-medium wrap-break-word">
                              {vendor.name}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">
                              Business name
                            </dt>
                            <dd className="mt-1 font-medium wrap-break-word">
                              {businessName}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">
                              Subscription plan
                            </dt>
                            <dd className="mt-1">
                              <Badge variant="outline" className="capitalize">
                                {vendor.plan || "Not available"}
                              </Badge>
                            </dd>
                          </div>
                        </dl>
                        <DialogFooter showCloseButton />
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <span>
                      {item.vendorBusinessName || "Vendor unavailable"}
                    </span>
                  )}
                </TableCell>
                <TableCell className="px-5 py-4 text-lg font-bold whitespace-nowrap text-brand-700 dark:text-brand-300">
                  ৳{item.price.toLocaleString("en-BD")}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <span className="flex items-center gap-2">
                    <MapPin
                      className="size-4 shrink-0 text-brand-600 dark:text-brand-400"
                      aria-hidden="true"
                    />
                    {item.location}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Badge
                    className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${statusStyles[item.status]}`}
                  >
                    {item.status === "accepted" ? (
                      <CircleCheck aria-hidden="true" />
                    ) : item.status === "rejected" ? (
                      <CircleX aria-hidden="true" />
                    ) : (
                      <Clock3 aria-hidden="true" />
                    )}
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Select
                    value={item.isActive ? "Active" : "Inactive"}
                    disabled={!item._id}
                    onValueChange={(value) =>
                      handleChangeAvailability(
                        item?._id as string,
                        value as string
                      )
                    }
                  >
                    <SelectTrigger
                      aria-label={`Availability for ${item.name}`}
                      className="min-w-28 bg-background data-[size=default]:h-10"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="[&_[role=option]:not([data-disabled])]:cursor-pointer">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="min-w-36 px-5 py-4">
                  <RequestDate value={item.createdAt} />
                </TableCell>
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button
                            size="icon"
                            variant="outline"
                            className="size-10"
                          />
                        }
                        aria-label={`View details for ${item.name}`}
                        title="View details"
                      >
                        <Eye aria-hidden="true" />
                      </DialogTrigger>
                      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg [&_button:not(:disabled)]:cursor-pointer">
                        <DialogHeader>
                          <DialogTitle>{item.name}</DialogTitle>
                          <DialogDescription>
                            Menu item details
                          </DialogDescription>
                        </DialogHeader>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={480}
                          height={320}
                          unoptimized
                          className="h-56 w-full rounded-xl object-cover"
                        />
                        <p className="wrap-break-word whitespace-pre-wrap text-muted-foreground">
                          {item.description}
                        </p>
                        <dl className="grid grid-cols-2 gap-4 text-sm">
                          {[
                            ["Category", item.category],
                            ["Price", `৳${item.price.toLocaleString("en-BD")}`],
                            ["Location", item.location],
                            [
                              "Vendor",
                              vendor
                                ? businessName
                                : item.vendorBusinessName ||
                                  "Vendor unavailable",
                            ],
                            ["Status", item.status],
                            [
                              "Availability",
                              item.isActive ? "Active" : "Inactive",
                            ],
                          ].map(([label, value]) => (
                            <div key={label}>
                              <dt className="text-muted-foreground">{label}</dt>
                              <dd className="mt-1 font-medium wrap-break-word capitalize">
                                {value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <DialogFooter showCloseButton />
                      </DialogContent>
                    </Dialog>
                    <Select
                      value={item.status}
                      disabled={!item._id}
                      onValueChange={(value) => {
                        if (
                          item._id &&
                          (value === "pending" ||
                            value === "accepted" ||
                            value === "rejected")
                        ) {
                          handleStatusChange(item._id, { status: value })
                        }
                      }}
                    >
                      <SelectTrigger
                        aria-label={`Review status for ${item.name}`}
                        className="min-w-28 bg-background data-[size=default]:h-10"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="[&_[role=option]:not([data-disabled])]:cursor-pointer">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="accepted">Approve</SelectItem>
                        <SelectItem value="rejected">Reject</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button
                            variant="destructive"
                            disabled={!item._id}
                            size="icon"
                            aria-label={`Delete ${item.name}`}
                            title="Delete"
                            className="size-10"
                          />
                        }
                      >
                        <Trash2 aria-hidden="true" />
                      </DialogTrigger>
                      <DialogContent className="[&_button:not(:disabled)]:cursor-pointer">
                        <DialogHeader>
                          <DialogTitle>Delete menu item?</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete {item.name}?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose render={<Button variant="outline" />}>
                            Cancel
                          </DialogClose>
                          <DialogClose
                            render={<Button variant="destructive" />}
                            onClick={() =>
                              handleDeleteItem(item?._id as string, item)
                            }
                          >
                            Delete
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
