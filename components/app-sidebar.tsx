"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
  Wallet,
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
import { useDirection } from "@/components/ui/direction"
import { hasPermission, type Permission, type Role } from "@/lib/permissions"

type SidebarItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  permission: Permission
}

// Icon mapping for sidebar items
const iconMap = {
  overview: LayoutDashboard,
  orders: ShoppingCart,
  turbo: Boxes,
  products: Package,
  shipments: Truck,
  radar: Radar,
  customers: Users,
  expenses: CreditCard,
  analytics: BarChart3,
  settings: Settings,
} as const;

const permissionMap = {
  overview: "view_dashboard",
  orders: "process_orders",
  turbo: "process_orders",
  products: "manage_products",
  shipments: "process_orders",
  radar: "view_financials",
  customers: "manage_team",
  expenses: "view_financials",
  analytics: "view_financials",
  settings: "manage_store_settings",
} as const;

type ItemKey = keyof typeof iconMap;

export function AppSidebar({
  lang,
  role,
  copy,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  lang: string
  role: Role
  copy: {
    productName: string
    productTagline: string
    workspace: string
    insights: string
    footerTitle: string
    footerDescription: string
    primaryItems: Record<string, string>
    secondaryItems: Record<string, string>
  }
}) {
  const pathname = usePathname()
  const dir = useDirection()

  // Build primary items array from translation object
  const primaryItemsArray: SidebarItem[] = Object.entries(copy.primaryItems).map(([key, title]) => ({
    title,
    href: `/${key === "overview" ? "dashboard" : `dashboard/${key}`}`,
    icon: iconMap[key as ItemKey],
    permission: permissionMap[key as ItemKey] as Permission,
  }));

  // Build secondary items array from translation object
  const secondaryItemsArray: SidebarItem[] = Object.entries(copy.secondaryItems).map(([key, title]) => ({
    title,
    href: `/dashboard/${key}`,
    icon: iconMap[key as ItemKey],
    permission: permissionMap[key as ItemKey] as Permission,
  }));

  const primaryItems = primaryItemsArray.filter((item) => hasPermission(role, item.permission))
  const secondaryItems = secondaryItemsArray.filter((item) => hasPermission(role, item.permission))

  const renderItem = (item: SidebarItem) => {
    const href = `/${lang}${item.href}`
    const isActive = item.href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`)

    return (
      <SidebarMenuItem key={item.href}>
        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title} className="gap-3">
          <Link href={href}>
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar collapsible="offcanvas" side={dir === "rtl" ? "right" : "left"} dir={dir} {...props}>
      <SidebarHeader className="border-b border-sidebar-border/70">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href={`/${lang}/dashboard`}>
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-linear-to-br from-primary to-accent text-primary-foreground">
                  <Wallet className="h-4 w-4" />
                </div>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-semibold">{copy.productName}</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">{copy.productTagline}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{copy.workspace}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{primaryItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {secondaryItems.length > 0 ? (
          <SidebarGroup>
            <SidebarGroupLabel>{copy.insights}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{secondaryItems.map(renderItem)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/70 p-3">
        <div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40 p-3 text-sm">
          <p className="font-medium text-sidebar-foreground">{copy.footerTitle}</p>
          <p className="mt-1 text-xs text-sidebar-foreground/70">{copy.footerDescription}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
