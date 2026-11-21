"use client"
import Image from "next/image"
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
import { changeAvailability, changeStatus, type IStatus } from "@/app/lib/actions/menu-items"
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

const statusStyles = {
  pending:
    "border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200",
  accepted:
    "border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
  rejected:
    "border-rose-300 bg-rose-100 text-rose-900 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-200",
}

export default function AdminMenuTable({ items }: { items: IMenuItem[] }) {
  const router = useRouter()
  const handleStatusChange = async (id: string, value: IStatus) => {
    const result = await changeStatus(id, value)
    if (result.modifiedCount > 0) {
      toast.add({
        title: `Item is ${value.status}`,
        description: " Item status changed successfully"
      })
      router.refresh()
    }
  }
  const handleChangeAvailability = async (id: string, value: string) => {
    console.log(value)
    let currentData = false
    if (value === "Active") {
      currentData = true
    }
    if (value === "Inactive") {
      currentData = false
    }
    const updateData = {
      isActive: currentData
    }
    const result = await changeAvailability(id, updateData)
    if (result.message) {
      toast.add({
        title: `Item availability can not be changed!`,
        description: result.message
      })
      router.refresh()
    }
    if (result.modifiedCount > 0) {
      toast.add({
        title: `Item is ${value} now !`,
        description: " Item availability changed successfully"
      })
      router.refresh()
    }
  }
  return (
    <div
      className="overflow-hidden rounded-2xl border border-brand-300 bg-card shadow-lg shadow-brand-900/5 dark:border-brand-800"
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
          {items.map((item) => (
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
                {/* TODO: Resolve the vendor name using item.vendorId. */}—
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
                  onValueChange={(value) => handleChangeAvailability(item?._id as string, value as string)}
                >
                  <SelectTrigger
                    aria-label={`Availability for ${item.name}`}
                    className="min-w-28 bg-background data-[size=default]:h-10"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
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
                    <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>{item.name}</DialogTitle>
                        <DialogDescription>Menu item details</DialogDescription>
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
                          ["Vendor", "—"],
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
                    <SelectContent>
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
                    <DialogContent>
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
                            console.log("Delete menu item", {
                              itemId: item._id,
                            })
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
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
