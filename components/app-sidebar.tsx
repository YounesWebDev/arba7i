"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import {
  BarChart3,
  Boxes,
  CreditCard,
  LayoutDashboard,
  Package,
  Radar,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const primaryItems = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { title: "Turbo", href: "/dashboard/turbo", icon: Boxes },
  { title: "Products", href: "/dashboard/products", icon: Package },
  { title: "Shipments", href: "/dashboard/shipments", icon: Truck },
]

const secondaryItems = [
  { title: "Radar", href: "/dashboard/radar", icon: Radar },
  { title: "Customers", href: "/dashboard/customers", icon: Users },
  { title: "Expenses", href: "/dashboard/expenses", icon: CreditCard },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const params = useParams<{ lang?: string }>()
  const lang = typeof params?.lang === "string" ? params.lang : "en"

  const renderItem = (item: (typeof primaryItems)[number]) => {
    const href = `/${lang}${item.href}`
    const isActive = pathname === href

    return (
      <SidebarMenuItem key={item.href}>
        <SidebarMenuButton
          asChild
          isActive={isActive}
          tooltip={item.title}
          className="gap-3"
        >
          <Link href={href}>
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/70">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href={`/${lang}/dashboard`}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Arba7i</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    Seller Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{primaryItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Insights</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{secondaryItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/70 p-3">
        <div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40 p-3 text-sm">
          <p className="font-medium text-sidebar-foreground">Arba7i</p>
          <p className="mt-1 text-xs text-sidebar-foreground/70">
            Manage orders, shipping, stock, and profit from one place.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
