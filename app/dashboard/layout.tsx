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
        <main className="lg:mx-auto mb-20 w-full min-w-0 lg:max-w-6xl flex-1 p-2 sm:p-4 lg:p-3">
          {children}
        </main>
        <footer className="border-t px-4 py-5 text-center text-sm text-muted-foreground sm:px-6">
          <p>Developed by Bondon Datta</p>
          <p className="mt-1">
            ©{" "}
            {new Intl.DateTimeFormat("en", {
              year: "numeric",
              timeZone: "Asia/Dhaka",
            }).format(new Date())}{" "}
            PizzaHub. All rights reserved.
          </p>
        </footer>
      </div>
    </SidebarProvider>
  )
}

export default layout
