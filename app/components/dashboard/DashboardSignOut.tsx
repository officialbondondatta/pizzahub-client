"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { authClient } from "@/app/lib/auth-client"
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import { toast } from "@/components/ui/toast"

export default function DashboardSignOut() {
  const [pending, setPending] = useState(false)
  const router = useRouter()
  const { setOpenMobile } = useSidebar()

  async function handleSignOut() {
    setPending(true)
    try {
      const { error } = await authClient.signOut()
      if (error) throw new Error(error.message || "Please try again.")
      toast.add({
        title: "Signed out",
        description: "You have successfully signed out.",
        type: "success",
      })
      setOpenMobile(false)
      router.push("/")
      router.refresh()
    } catch (error) {
      toast.add({
        title: "Sign-out failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <SidebarMenuButton
      className="h-10 rounded-sm text-destructive hover:bg-destructive/10 hover:text-destructive"
      onClick={handleSignOut}
      disabled={pending}
    >
      <LogOut aria-hidden="true" />
      <span>{pending ? "Signing out…" : "Sign out"}</span>
    </SidebarMenuButton>
  )
}
