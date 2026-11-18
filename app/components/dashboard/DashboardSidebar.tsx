import Link from "next/link"
import BrandLogo from "@/app/components/shared/BrandLogo"
import {
  type LucideIcon,
  ShoppingBag,
  Gauge,
  DollarSignIcon,
  User,
  User2Icon,
  Menu,
  Plus,
  ListOrderedIcon,
  SubscriptIcon,
} from "lucide-react"
import { auth } from "@/app/lib/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { headers } from "next/headers"

type SidebarItem = { title: string; url: string; icon: LucideIcon }

const itemsDescriptions = {
  customer: [
    { title: "Overview", url: "/dashboard/customer", icon: Gauge },
    {
      title: "My Orders",
      url: "/dashboard/customer/my-orders",
      icon: ShoppingBag,
    },
    { title: "Profile Settings", url: "/profile", icon: User },
  ],
  admin: [
    { title: "Overview", url: "/dashboard/admin", icon: Gauge },
    {
      title: "Manage Users",
      url: "/dashboard/admin/manage-users",
      icon: User2Icon,
    },
    {
      title: "Manage Menu Items",
      url: "/dashboard/admin/manage-menu-items",
      icon: Menu,
    },
    {
      title: "Transactions",
      url: "/dashboard/admin/transactions",
      icon: DollarSignIcon,
    },
    { title: "Profile", url: "/profile", icon: User },
  ],
  vendor: [
    { title: "Overview", url: "/dashboard/vendor", icon: Gauge },
    {
      title: "My Menu Items",
      url: "/dashboard/vendor/my-menu-items",
      icon: Menu,
    },
    {
      title: "Add Menu Items",
      url: "/dashboard/vendor/add-menu-items",
      icon: Plus,
    },
    {
      title: "Customer Orders",
      url: "/dashboard/vendor/customer-orders",
      icon: ListOrderedIcon,
    },
    {
      title: "Subscription",
      url: "/dashboard/vendor/subscription",
      icon: SubscriptIcon,
    },
    { title: "Profile Settings", url: "/profile", icon: User },
  ],
} satisfies Record<"customer" | "admin" | "vendor", SidebarItem[]>

const DashboardSidebar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const user = session?.user
  const role: string = user?.role ?? "customer"
  const sidebarItems =
    itemsDescriptions[role === "admin" || role === "vendor" ? role : "customer"]
  return (
    <Sidebar>
      <SidebarHeader className="h-20 justify-center border-b px-5">
        <Link
          href="/"
          aria-label="PizzaHub home"
          className="w-fit rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <BrandLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon aria-hidden="true" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default DashboardSidebar
