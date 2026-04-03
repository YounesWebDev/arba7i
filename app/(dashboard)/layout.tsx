import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Topbar } from "@/components/topbar"

export default function DashboardLayout({
    children,
    }: {
    children: React.ReactNode
    }) {
    return (
        <SidebarProvider>
        <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset className="flex flex-col">
            <Topbar />
            <main className="p-6 bg-slate-50 flex-1">
                {children}
            </main>
            </SidebarInset>
        </div>
        </SidebarProvider>
    )
}