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
import { Badge } from "@/components/ui/badge"
import { useDirection } from "@/components/ui/direction"
import { hasPermission, type Permission, type Role } from "@/lib/permissions"

type SidebarItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  permission: Permission
  available: boolean
}

function getSidebarCopy(lang: string): {
  productName: string
  productTagline: string
  workspace: string
  insights: string
  comingSoon: string
  footerTitle: string
  footerDescription: string
  primaryItems: SidebarItem[]
  secondaryItems: SidebarItem[]
} {
  if (lang === "ar") {
    return {
      productName: "Arba7i",
      productTagline: "لوحة التاجر",
      workspace: "مساحة العمل",
      insights: "التحليلات",
      comingSoon: "قريبًا",
      footerTitle: "Arba7i",
      footerDescription: "سيّر الطلبيات والشحن والمخزون والربح من بلاصة وحدة.",
      primaryItems: [
        { title: "نظرة عامة", href: "/dashboard", icon: LayoutDashboard, permission: "view_dashboard", available: true },
        { title: "الطلبات", href: "/dashboard/orders", icon: ShoppingCart, permission: "process_orders", available: false },
        { title: "توربو", href: "/dashboard/turbo", icon: Boxes, permission: "process_orders", available: false },
        { title: "المنتجات", href: "/dashboard/products", icon: Package, permission: "manage_products", available: false },
        { title: "الشحنات", href: "/dashboard/shipments", icon: Truck, permission: "process_orders", available: false },
      ],
      secondaryItems: [
        { title: "الرادار", href: "/dashboard/radar", icon: Radar, permission: "view_financials", available: false },
        { title: "العملاء", href: "/dashboard/customers", icon: Users, permission: "manage_team", available: false },
        { title: "المصاريف", href: "/dashboard/expenses", icon: CreditCard, permission: "view_financials", available: false },
        { title: "التحليلات", href: "/dashboard/analytics", icon: BarChart3, permission: "view_financials", available: false },
        { title: "الإعدادات", href: "/dashboard/settings", icon: Settings, permission: "manage_store_settings", available: false },
      ],
    }
  }

  return {
    productName: "Arba7i",
    productTagline: "Seller Dashboard",
    workspace: "Workspace",
    insights: "Insights",
    comingSoon: "Soon",
    footerTitle: "Arba7i",
    footerDescription: "Manage orders, shipping, stock, and profit from one place.",
    primaryItems: [
      { title: "Overview", href: "/dashboard", icon: LayoutDashboard, permission: "view_dashboard", available: true },
      { title: "Orders", href: "/dashboard/orders", icon: ShoppingCart, permission: "process_orders", available: false },
      { title: "Turbo", href: "/dashboard/turbo", icon: Boxes, permission: "process_orders", available: false },
      { title: "Products", href: "/dashboard/products", icon: Package, permission: "manage_products", available: false },
      { title: "Shipments", href: "/dashboard/shipments", icon: Truck, permission: "process_orders", available: false },
    ],
    secondaryItems: [
      { title: "Radar", href: "/dashboard/radar", icon: Radar, permission: "view_financials", available: false },
      { title: "Customers", href: "/dashboard/customers", icon: Users, permission: "manage_team", available: false },
      { title: "Expenses", href: "/dashboard/expenses", icon: CreditCard, permission: "view_financials", available: false },
      { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3, permission: "view_financials", available: false },
      { title: "Settings", href: "/dashboard/settings", icon: Settings, permission: "manage_store_settings", available: false },
    ],
  }
}

export function AppSidebar({
  lang,
  role,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  lang: string
  role: Role
}) {
  const pathname = usePathname()
  const dir = useDirection()
  const copy = getSidebarCopy(lang)
  const primaryItems = copy.primaryItems.filter((item) => hasPermission(role, item.permission))
  const secondaryItems = copy.secondaryItems.filter((item) => hasPermission(role, item.permission))

  const renderItem = (item: SidebarItem) => {
    const href = `/${lang}${item.href}`
    const isActive = pathname === href

    return (
      <SidebarMenuItem key={item.href}>
        {item.available ? (
          <SidebarMenuButton asChild isActive={isActive} tooltip={item.title} className="gap-3">
            <Link href={href}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton
            tooltip={item.title}
            className="gap-3 opacity-70"
            disabled
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            <Badge variant="outline" className="ml-auto text-[10px]">
              {copy.comingSoon}
            </Badge>
          </SidebarMenuButton>
        )}
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
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    {copy.productTagline}
                  </span>
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
