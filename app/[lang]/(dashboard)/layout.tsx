import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Topbar } from "@/components/topbar"
import { requirePermission } from "@/lib/auth-guard"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const auth = await requirePermission(lang, "view_dashboard")
  const dict = await getDictionary(lang as Locale)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-muted/20">
        <AppSidebar lang={lang} role={auth.role} />
        <SidebarInset className="flex min-w-0 flex-col overflow-x-hidden">
          <Topbar lang={lang} copy={dict.dashboardShell.topbar} />
          <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
