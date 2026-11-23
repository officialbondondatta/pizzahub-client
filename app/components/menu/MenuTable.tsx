"use client"
import Image from "next/image"
import RequestDate from "@/app/components/orders/RequestDate"
import Link from "next/link"
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
import UpdateMenuItemDialog from "./UpdateMenuItemDialog"
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
import { deleteMenuItem } from "@/app/lib/actions/menu-items"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import HandleAvailability from "./HandleAvailability"

const statusStyles = {
  pending:
    "border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200",
  accepted:
    "border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
  rejected:
    "border-rose-300 bg-rose-100 text-rose-900 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-200",
}

export default function MenuTable({ items }: { items: IMenuItem[] }) {
  const router = useRouter()
  const handleDeleteItem = async (id: string) => {
    if (!id) {
      toast.add({
        title: "Item not found",
        description: "Refresh the menu and select the item again.",
        type: "error",
      })
      return
    }
    try {
      const result = await deleteMenuItem(id)
      if (!(result.deletedCount > 0)) throw new Error("Item was not deleted")
      if (result.deletedCount > 0) {
        toast.add({
          title: "Item deleted",
          type: "success",
          description: "Item Deleted Successfully",
        })
        router.refresh()
      }
    } catch {
      toast.add({
        title: "Unable to delete item",
        description: "The item could not be deleted. Please try again.",
        type: "error",
      })
    }
  }

  return (
    <div
      className="overflow-hidden rounded-2xl border border-brand-300 bg-card shadow-lg shadow-brand-900/5 dark:border-brand-800"
      role="region"
      aria-label="Your menu items"
      tabIndex={0}
    >
      <Table className="w-full min-w-225 text-left text-sm">
        <TableCaption className="sr-only">
          Your menu items and their review status
        </TableCaption>
        <TableHeader className="border-b border-brand-600 bg-brand-700 [&_tr:hover]:bg-brand-700">
          <TableRow>
            {[
              "Item",
              "Category",
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
          {items.map((item) => (
            <TableRow
              key={item._id}
              className="border-brand-200/60 transition-colors odd:bg-background even:bg-brand-100/40 hover:bg-brand-200/50 dark:border-brand-800/60 dark:even:bg-brand-900/20 dark:hover:bg-brand-800/30"
            >
              <TableHead scope="row" className="min-w-74 px-5 py-4">
                <div className="flex w-64 items-center gap-3">
                  <Image
                    src={item.image}
                    alt=""
                    width={64}
                    height={64}
                    unoptimized
                    className="size-16 shrink-0 rounded-xl object-cover shadow-sm ring-2 ring-brand-300/60"
                  />
                  <span className="min-w-0 flex-1 text-base font-semibold wrap-anywhere whitespace-normal">
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
                <HandleAvailability item={item}></HandleAvailability>
              </TableCell>
              <TableCell className="min-w-36 px-5 py-4">
                <RequestDate value={item.createdAt} />
              </TableCell>
              <TableCell className="px-5 py-4">
                <div className="flex items-center gap-2">
                  {item._id ? (
                    <Button
                      size="icon"
                      aria-label={`View details for ${item.name}`}
                      title="View details"
                      className="size-10 bg-brand-600 text-white shadow-sm hover:bg-brand-700"
                      nativeButton={false}
                      render={<Link href={`/browse-menu/${item._id}`} />}
                    >
                      <Eye aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button
                      disabled
                      size="icon"
                      aria-label="Details unavailable"
                      title="Details unavailable"
                    >
                      <Eye aria-hidden="true" />
                    </Button>
                  )}
                  <UpdateMenuItemDialog item={item} />
                  <Dialog>
                    <DialogTrigger
                      render={
                        <Button
                          variant="destructive"
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
                          onClick={() => handleDeleteItem(item._id as string)}
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
