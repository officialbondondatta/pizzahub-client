"use client"

import { formatSubscriptionExpiry, getSubscriptionPlan } from "@/app/lib/subscription"
import { useState } from "react"
import Image from "next/image"
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
import type { TableUser } from "./UsersTable"

function UserPhoto({
  user,
  large = false,
}: {
  user: TableUser
  large?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const initials =
    user.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?"
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-500/15 font-semibold text-brand-700 dark:text-brand-300 ${large ? "size-24 text-2xl" : "size-11"}`}
    >
      {user.image && !failed ? (
        <Image
          src={user.image}
          alt={`${user.name}'s profile`}
          fill
          sizes={large ? "96px" : "44px"}
          unoptimized
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-label={`${user.name}'s initials`}>{initials}</span>
      )}
    </span>
  )
}

export default function UserDetailsDialog({ user }: { user: TableUser }) {
  const details = [
    ["Name", user.name],
    ["Email", user.email],
    ["Role", user.role],
    ["Business name", user.businessName || "Not provided"],
    ["Plan", getSubscriptionPlan(user)],
    ["Account status", user.isBlocked ? "Blocked" : "Active"],
    ...(getSubscriptionPlan(user) === "premium" && user.subscriptionExpiresAt
      ? [["Subscription expires", formatSubscriptionExpiry(user.subscriptionExpiresAt)]]
      : []),
  ]
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            className="h-auto w-full cursor-pointer  justify-start gap-3 rounded-xl p-2 text-left whitespace-normal"
          />
        }
        aria-label={`View profile for ${user.name}`}
      >
        <UserPhoto user={user} />
        <span className="max-w-72 min-w-0">
          <span className="block font-semibold wrap-break-word text-brand-700 underline-offset-4 hover:underline dark:text-brand-300">
            {user.name}
          </span>
          <span className="mt-1 block text-xs font-normal break-all text-muted-foreground">
            {user.email}
          </span>
        </span>
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>User profile</DialogTitle>
          <DialogDescription>
            Profile and account details for {user.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 rounded-xl bg-brand-500/10 p-4">
          <UserPhoto user={user} large />
          <div className="min-w-0">
            <p className="text-lg font-semibold wrap-break-word">{user.name}</p>
            <Badge variant="outline" className="mt-2 capitalize">
              {user.role}
            </Badge>
          </div>
        </div>
        <dl className="grid gap-4 py-2 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <div
              key={label}
              className={label === "Email" ? "sm:col-span-2" : ""}
            >
              <dt className="text-xs font-medium text-muted-foreground">
                {label}
              </dt>
              <dd
                className={`mt-1 wrap-break-word ${label === "Role" || label === "Plan" ? "capitalize" : ""}`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
