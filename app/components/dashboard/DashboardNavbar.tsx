"use client"

import Link from "next/link"
import { Moon, Sun, House, UserRound } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardNavbar() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between gap-3 border-b bg-background/95 px-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="size-10" />
        <div className="h-6 w-px bg-border" aria-hidden="true" />
        <span className="truncate text-sm font-semibold sm:text-base">
          Dashboard
        </span>
      </div>
      <nav
        aria-label="Dashboard navigation"
        className="flex items-center gap-2"
      >
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/" />}
          className="h-10 px-3"
          aria-label="Back to home"
        >
          <House aria-hidden="true" />
          <span className="hidden sm:inline">Home</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-xl"
          aria-label="Toggle light or dark theme"
          title="Toggle light or dark theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <Moon aria-hidden="true" className="size-4 dark:hidden" />
          <Sun aria-hidden="true" className="hidden size-4 dark:block" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          nativeButton={false}
          render={<Link href="/profile" />}
          className="size-10 rounded-xl"
          aria-label="Profile settings"
          title="Profile settings"
        >
          <UserRound aria-hidden="true" />
        </Button>
      </nav>
    </header>
  )
}
