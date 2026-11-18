"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"

export default function DashboardNavLink({
  href,
  exact = false,
  children,
}: {
  href: string
  exact?: boolean
  children: ReactNode
}) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  const active =
    pathname === href || (!exact && pathname.startsWith(`${href}/`))

  return (
    <SidebarMenuButton
      isActive={active}
      render={<Link href={href} aria-current={active ? "page" : undefined} />}
      onClick={() => {
        if (isMobile) setOpenMobile(false)
      }}
      className="h-10 rounded-sm data-[active=true]:bg-primary data-[active=true]:font-semibold data-[active=true]:text-primary-foreground"
    >
      {children}
    </SidebarMenuButton>
  )
}
