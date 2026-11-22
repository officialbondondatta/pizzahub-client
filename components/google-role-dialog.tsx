"use client"

import { toast } from "@/components/ui/toast"
import { useState } from "react"
import { LoaderCircle, ShoppingBag, UserRound } from "lucide-react"
import { authClient } from "@/app/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function GoogleRoleDialog() {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<"customer" | "vendor">("customer")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  function showError(message: string) {
    setError(message)
    toast.add({
      title: "Unable to continue with Google",
      description: message,
      type: "error",
    })
  }
  const [businessName, setBusinessName] = useState("")

  async function continueWithGoogle() {
    if (pending) return
    if (role === "vendor" && !businessName.trim()) {
      showError("Business name is required for vendors.")
      return
    }
    setPending(true)
    setError("")
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        additionalData: {
          role,
          ...(role === "vendor" ? { businessName: businessName.trim() } : {}),
        },
      })
      if (result.error) {
        showError(
          result.error.message || "Google sign-in failed. Please try again."
        )
        setPending(false)
      }
      // Keep the button disabled until navigation to Google completes.
    } catch {
      showError("Unable to connect to Google. Please try again.")
      setPending(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (pending) return
        setOpen(value)
        setError("")
        if (value) setRole("customer")
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full border-[#e6dbcf] bg-white text-[#2b2521] hover:bg-[#f9eee2] dark:border-[#e6dbcf] dark:bg-white dark:hover:bg-[#f9eee2]"
          />
        }
      >
        Continue with Google
      </DialogTrigger>
      <DialogContent showCloseButton={!pending} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How would you like to join?</DialogTitle>
          <DialogDescription>
            Choose an account type for your Google sign-up.
          </DialogDescription>
        </DialogHeader>
        <fieldset disabled={pending} className="space-y-3">
          <legend className="sr-only">Account type</legend>
          {(
            [
              {
                value: "customer",
                title: "Customer",
                description: "Discover kitchens and order your favorite pizza.",
                icon: UserRound,
              },
              {
                value: "vendor",
                title: "Vendor",
                description: "Share your menu and serve your customers.",
                icon: ShoppingBag,
              },
            ] as const
          ).map(({ value, title, description, icon: Icon }) => (
            <label key={value} className="relative block cursor-pointer">
              <input
                type="radio"
                name="google-role"
                value={value}
                checked={role === value}
                onChange={() => setRole(value)}
                className="peer sr-only"
              />
              <span className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors peer-checked:border-brand-600 peer-checked:bg-primary/20 peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                <Icon
                  aria-hidden="true"
                  className="size-6 shrink-0 text-brand-600 dark:text-brand-300"
                />
                <span>
                  <span className="block font-semibold">{title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {description}
                  </span>
                </span>
              </span>
            </label>
          ))}
        </fieldset>
        {role === "vendor" && (
          <div className="space-y-2">
            <Label htmlFor="google-business-name">Business name</Label>
            <Input
              id="google-business-name"
              autoComplete="organization"
              placeholder="Your business name"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              disabled={pending}
              required
            />
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Already have an account? You’ll sign in with your existing account
          type.
        </p>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={pending}
            onClick={continueWithGoogle}
            className="bg-brand-700 text-white hover:bg-brand-800"
          >
            {pending && (
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            {pending ? "Connecting to Google…" : `Continue as ${role}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
