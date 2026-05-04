// --- app/(admin)/layout.tsx ---
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import { writeAuditLog } from "@/lib/audit";
import { hasPermission, type Role } from "@/lib/permissions";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({
  subsets: ["latin"],
});

function normalizeRole(role: string | null | undefined): Role {
  if (
    role === "owner" ||
    role === "admin" ||
    role === "manager" ||
    role === "confirmation_agent" ||
    role === "warehouse_staff"
  ) {
    return role;
  }

  return "owner";
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/ar/login");
  }

  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = normalizeRole(userData?.role);

  if (!hasPermission(role, "access_admin")) {
    await writeAuditLog({
      userId: user.id,
      action: "role_check_denied",
      details: `Role "${role}" was denied permission "access_admin".`,
    });

    redirect("/ar/unauthorized");
  }

  await writeAuditLog({
    userId: user.id,
    action: "role_check_allowed",
    details: `Role "${role}" was granted permission "access_admin".`,
  });

  return (
    <div className={`${inter.className} flex min-h-screen w-full bg-sidebar text-sidebar-foreground font-sans`}>
      
      {/* Admin Sidebar (Simplified for now) */}
      <aside className="hidden w-64 border-r border-sidebar-border bg-sidebar-accent p-6 md:block">
        <div className="mb-8">
          <span className="text-2xl font-bold tracking-tight text-sidebar-foreground">Arba7i</span>
          <span className="mt-1 block text-xs text-sidebar-primary">Super Admin Console</span>
        </div>
        <nav className="flex flex-col gap-4 text-sm text-sidebar-foreground/80">
          <div className="cursor-pointer transition-colors hover:text-sidebar-primary">Overview</div>
          <div className="cursor-pointer transition-colors hover:text-sidebar-primary">Sellers & Stores</div>
          <div className="cursor-pointer transition-colors hover:text-sidebar-primary">Subscriptions</div>
          <div className="cursor-pointer transition-colors hover:text-sidebar-primary">System Health</div>
        </nav>
      </aside>

      {/* Admin Main Content Area */}
      <main className="flex-1 bg-background p-8 text-foreground">
        {children}
      </main>
    </div>
  )
}
