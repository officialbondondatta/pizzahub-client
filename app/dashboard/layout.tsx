import React from "react"
import DashboardSidebar from "../components/dashboard/DashboardSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardNavbar from "../components/dashboard/DashboardNavbar"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar></DashboardSidebar>
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardNavbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default layout
