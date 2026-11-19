"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Clock3,
  CircleCheck,
  CircleX,
} from "lucide-react"
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

const statusStyles = {
  pending:
    "border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200",
  accepted:
    "border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
  rejected:
    "border-rose-300 bg-rose-100 text-rose-900 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-200",
}

export default function MenuTable({ items }: { items: IMenuItem[] }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-brand-300 bg-card shadow-lg shadow-brand-900/5 dark:border-brand-800"
      role="region"
      aria-label="Your menu items"
      tabIndex={0}
    >
      <Table className="w-full min-w-[900px] text-left text-sm">
        <TableCaption className="sr-only">
          Your menu items and their review status
        </TableCaption>
        <TableHeader className="border-b border-brand-600 bg-brand-700 [&_tr:hover]:bg-brand-700">
          <TableRow>
            {["Item", "Category", "Price", "Location", "Status", "Actions"].map(
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
                  <span className="max-w-60 min-w-32 text-base font-semibold break-words whitespace-normal">
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
                <div className="flex items-center gap-2">
                  {item._id ? (
                    <Button
                      className="h-10 bg-brand-600 text-white shadow-sm hover:bg-brand-700"
                      nativeButton={false}
                      render={<Link href={`/browse-menu/${item._id}`} />}
                    >
                      <Eye aria-hidden="true" />
                      View details
                    </Button>
                  ) : (
                    <Button disabled>Details unavailable</Button>
                  )}
                  <Button
                    variant="outline"
                    className="h-10 border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-200 dark:hover:bg-sky-900"
                    onClick={() => console.log("Update menu item", item._id)}
                  >
                    <Pencil aria-hidden="true" />
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    className="h-10"
                    onClick={() => console.log("Delete menu item", item._id)}
                  >
                    <Trash2 aria-hidden="true" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
