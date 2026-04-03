"use client"

import { 
    LayoutDashboard, Package, ShoppingCart, Zap, Truck, Users, Radar, Receipt, BarChart3, Settings 
} from "lucide-react"
import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
    { title: "Turbo Confirm", url: "/dashboard/turbo", icon: Zap },
    { title: "Products", url: "/dashboard/products", icon: Package },
    { title: "Shipments", url: "/dashboard/shipments", icon: Truck },
    { title: "Smart Radar", url: "/dashboard/radar", icon: Radar },
    { title: "Customers", url: "/dashboard/customers", icon: Users },
    { title: "Expenses", url: "/dashboard/expenses", icon: Receipt },
    { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" >
        <SidebarHeader className="border-b px-6 py-4">
            <span className="font-bold text-xl text-primary tracking-tight">Arba7i</span>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                        <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        </Sidebar>
    )
}