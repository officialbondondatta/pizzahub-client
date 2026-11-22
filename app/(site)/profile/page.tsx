"use client"

import { formatSubscriptionExpiry, getSubscriptionPlan } from "@/app/lib/subscription"
import { useState, type FormEvent, type ReactNode } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Link2,
  LoaderCircle,
  LockKeyhole,
  Pizza,
  UserRound,
} from "lucide-react"
import { authClient, useSession } from "@/app/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"
import SubscriptionPlan from "@/app/utils/SubscriptionPlan"

function ProfileBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-brand-950 px-4 py-12 sm:px-6 sm:py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 scale-105 bg-[url('/images/profile-pizza-evening.jpg')] bg-cover bg-center blur-[3px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-brand-950/55 via-brand-950/35 to-brand-950/80"
      />
      {children}
    </div>
  )
}

function isImageUrl(value: string) {
  try {
    return ["https:", "http:"].includes(new URL(value).protocol)
  } catch {
    return false
  }
}

function ProfileForm({
  user,
}: {
  user: {
    name: string
    email: string
    image?: string | null
    role?: string | null
    businessName?: string | null
    subscriptionExpiresAt?: string | null
    plan: string
  }
}) {
  const [viewedAt] = useState(() => Date.now())
  const [name, setName] = useState(user.name)
  const [image, setImage] = useState(user.image || "")
  const [failedImage, setFailedImage] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  function showError(message: string) {
    setError(message)
    toast.add({
      title: "Unable to update profile",
      description: message,
      type: "error",
    })
  }
  const imageUrl = image.trim()
  const showImage = isImageUrl(imageUrl) && failedImage !== imageUrl

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage("")
    setError("")
    if (!name.trim()) return showError("Please enter your name.")
    if (imageUrl && !isImageUrl(imageUrl))
      return showError(
        "Please enter an image link beginning with https:// or http://."
      )
    setSaving(true)
    try {
      const result = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl || null,
      })
      if (result.error) {
        showError(
          result.error.message ||
            "Unable to save your profile. Please try again."
        )
      } else {
        toast.add({
          title: "Profile updated",
          type: "success",
          description: "Your profile has been updated successfully.",
        })
        setMessage("Your profile has been updated.")
      }
    } catch {
      showError(
        "Unable to save your profile. Check your connection and try again."
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <section
      className="overflow-hidden rounded-3xl border border-white/40 bg-background/95 shadow-2xl backdrop-blur-xl"
      aria-label="Profile details"
    >
      <div className="flex items-center gap-5 border-b border-border/60 bg-linear-to-r from-primary/20 to-transparent px-6 py-7 sm:px-9">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-primary/25 text-brand-700 shadow-md dark:text-brand-200">
          {showImage ? (
            // Hosted avatar URLs can come from any provider; load directly without an image proxy.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="Your profile preview"
              className="size-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => setFailedImage(imageUrl)}
            />
          ) : (
            <UserRound className="size-9" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Good food. Great company.
          </p>
          <h2 className="mt-1 truncate text-xl font-semibold">
            {name.trim() || "Your profile"}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-center">
            <span className="mt-2 inline-flex rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-xs font-medium capitalize">
              {user.role || "customer"}
            </span>
            <SubscriptionPlan plan={getSubscriptionPlan(user)}></SubscriptionPlan>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-9">
        {user.role === "vendor" && (
          <section aria-labelledby="profile-subscription-heading" className="rounded-xl border border-primary/20 bg-primary/10 p-4">
            <h3 id="profile-subscription-heading" className="font-semibold">Your subscription</h3>
            <p className="mt-2 text-sm leading-relaxed">
              {user.subscriptionExpiresAt && !Number.isNaN(new Date(user.subscriptionExpiresAt).getTime()) ? (
                <>
                  Your Premium subscription {new Date(user.subscriptionExpiresAt).getTime() > viewedAt ? "will end on" : "ended on"}{" "}
                  <strong>{formatSubscriptionExpiry(user.subscriptionExpiresAt)}</strong>.
                </>
              ) : user.plan === "premium" ? (
                "Your Premium subscription is active, but its end date has not been saved yet."
              ) : (
                "You are on the Free plan. When you subscribe to Premium, your subscription will end 60 days after activation."
              )}
            </p>
            <Link href="/dashboard/vendor/subscription" className="mt-3 inline-block text-sm font-medium underline underline-offset-4">
              View subscription
            </Link>
          </section>
        )}
        <div>
          <h3 className="text-lg font-semibold">Personal details</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            A little about you, a more personal PizzaHub.
          </p>
        </div>
        <fieldset disabled={saving} className="space-y-5 disabled:opacity-70">
          {user.role === "vendor" && (
            <div className="space-y-2">
              <Label htmlFor="business-name">
                Business name
                <LockKeyhole className="size-3.5 text-muted-foreground" aria-hidden="true" />
              </Label>
              <Input
                id="business-name"
                value={user.businessName || "Not provided"}
                readOnly
                aria-describedby="business-name-help"
                className="h-12 rounded-xl bg-muted/60 text-muted-foreground"
              />
              <p id="business-name-help" className="text-xs text-muted-foreground">
                Your business name cannot be changed here.
              </p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setMessage("")
              }}
              autoComplete="name"
              required
              maxLength={100}
              className="h-12 rounded-xl bg-background/70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email address{" "}
              <LockKeyhole
                className="size-3.5 text-muted-foreground"
                aria-hidden="true"
              />
            </Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              readOnly
              aria-describedby="email-help"
              className="h-12 rounded-xl bg-muted/60 text-muted-foreground"
            />
            <p id="email-help" className="text-xs text-muted-foreground">
              Your sign-in email cannot be changed here.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">
              Profile image URL{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <div className="relative">
              <Link2
                className="pointer-events-none absolute top-4 left-3.5 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="image"
                name="image"
                type="url"
                value={image}
                onChange={(event) => {
                  setImage(event.target.value)
                  setFailedImage(null)
                  setMessage("")
                }}
                placeholder="https://example.com/your-photo.jpg"
                aria-describedby="image-help"
                className="h-12 rounded-xl bg-background/70 pl-10"
              />
            </div>
            <p
              id="image-help"
              className="text-xs leading-relaxed text-muted-foreground"
            >
              Paste a public, direct link to your photo to preview it above.
              Leave blank to use the default avatar.
            </p>
            {failedImage === imageUrl && imageUrl && (
              <p className="text-xs text-destructive" role="status">
                We couldn&apos;t load this image. Check that the link is public
                and points directly to an image.
              </p>
            )}
          </div>
        </fieldset>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {message && (
          <p
            role="status"
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <Check className="size-4" aria-hidden="true" />
            {message}
          </p>
        )}
        <div className="flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Make yourself at home.
          </p>
          <Button
            type="submit"
            disabled={saving}
            className="h-12 rounded-xl bg-brand-700 px-6 text-white hover:bg-brand-800"
          >
            {saving ? (
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
            ) : null}
            {saving ? "Saving…" : "Save changes"}
            {!saving && <ArrowRight className="size-4" aria-hidden="true" />}
          </Button>
        </div>
      </form>
    </section>
  )
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession()
  const user = session?.user

  return (
    <ProfileBackdrop>
      <div className="mx-auto max-w-xl">
        <header className="mb-8 text-center text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-md">
            <Pizza className="size-4" aria-hidden="true" />
            Your PizzaHub
          </div>
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            My profile
          </h1>
          <p className="mt-3 text-sm text-white/85">
            Your own little corner of the table.
          </p>
        </header>
        {isPending ? (
          <div
            role="status"
            className="flex items-center justify-center gap-3 rounded-3xl bg-background/95 p-10"
          >
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            Loading your profile…
          </div>
        ) : user ? (
          <ProfileForm key={user.id} user={user} />
        ) : (
          <div className="rounded-3xl border border-white/40 bg-background/95 p-10 text-center shadow-xl backdrop-blur-xl">
            <UserRound
              className="mx-auto mb-4 size-9 text-muted-foreground"
              aria-hidden="true"
            />
            <h2 className="text-xl font-semibold">
              A seat with your name on it
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Sign in to view and personalize your profile.
            </p>
            <Button
              className="mt-6"
              nativeButton={false}
              render={<Link href="/sign-in" />}
            >
              Sign in
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </ProfileBackdrop>
  )
}
