"use client"

import { logout } from "@/app/actions/auth"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

export function Topbar() {
const params = useParams<{ lang?: string }>()
const lang = typeof params?.lang === "string" ? params.lang : "ar"

return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border/60 bg-background/95 px-4 backdrop-blur transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <div className="flex items-center gap-2">
        <SidebarTrigger className="-mx-1" />
        <h1 className="text-sm font-medium text-foreground">Seller Dashboard</h1>
    </div>
    <div className="flex items-center gap-4">
        <form action={logout}>
        <input type="hidden" name="lang" value={lang} />
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-destructive">
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
        </Button>
        </form>
        <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-muted/50">
        <User className="h-5 w-5 text-muted-foreground" />
        </div>
    </div>
    </header>
)
}
