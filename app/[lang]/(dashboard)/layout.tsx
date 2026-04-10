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
            <main className="flex-1 bg-background px-4 py-6 sm:px-6">
                {children}
            </main>
            </SidebarInset>
        </div>
        </SidebarProvider>
    )
}
