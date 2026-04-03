"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Topbar() {
return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white">
    <div className="flex items-center gap-2">
        <SidebarTrigger className="-mx-1" />
        <h1 className="text-sm font-medium">Seller Dashboard</h1>
    </div>
    <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
        <User className="h-5 w-5 text-slate-500" />
        </div>
    </div>
    </header>
)
}