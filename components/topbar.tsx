"use client"

import { logout } from "@/app/actions/auth"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/public/language-switcher"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDirection } from "@/components/ui/direction"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, ChevronDown, LogOut, User } from "lucide-react"

type TopbarCopy = {
  dashboard: string
  overview: string
  notifications: string
  account: string
  profile: string
  logout: string
}

export function Topbar({ lang, copy }: { lang: string; copy: TopbarCopy }) {
  const dir = useDirection()

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border/60 bg-background/95 px-4 backdrop-blur transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-mx-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{copy.dashboard}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbItem className="hidden sm:inline-flex">
              <span className="text-muted-foreground/60">{dir === "rtl" ? "\\" : "/"}</span>
            </BreadcrumbItem>
            <BreadcrumbItem className="hidden sm:inline-flex">
              <BreadcrumbPage>{copy.overview}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher lang={lang} mobileVisible className="w-[9.5rem]" />
        <ModeToggle />

        <Button variant="ghost" size="icon" aria-label={copy.notifications}>
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 rounded-full px-2">
              <Avatar size="sm">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm sm:inline">{copy.account}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={dir === "rtl" ? "start" : "end"} className="w-56">
            <DropdownMenuLabel>{copy.account}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4" />
              <span>{copy.profile}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={logout} className="w-full">
              <input type="hidden" name="lang" value={lang} />
              <button
                type="submit"
                className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-sm text-destructive outline-hidden transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                <span>{copy.logout}</span>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
