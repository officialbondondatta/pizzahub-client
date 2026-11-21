"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/toast"

export default function AccessToast() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = new URL(window.location.href)
    const reason = url.searchParams.get("access")
    if (reason !== "blocked" && reason !== "sign-in-required") return

    toast.add({
      title: reason === "blocked" ? "Account blocked" : "Sign in required",
      description:
        reason === "blocked"
          ? "Your account is blocked. You cannot access this page. Please contact an administrator."
          : "Please sign in to access this page.",
      type: "error",
    })

    // Consume the message so it does not repeat on refresh.
    url.searchParams.delete("access")
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`
    )
  }, [pathname, searchParams])

  return null
}
