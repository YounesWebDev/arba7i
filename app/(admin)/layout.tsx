// --- app/(admin)/layout.tsx ---

import { redirect } from "next/navigation";
import { writeAuditLog } from "@/lib/audit";
import { hasPermission, type Role } from "@/lib/permissions";
import { createClient } from "@/utils/supabase/server";

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
    // We use a dark slate theme here so it is instantly visually distinct 
    // from the white/light-gray Seller Dashboard.
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-50">
      
      {/* Admin Sidebar (Simplified for now) */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6 hidden md:block">
        <div className="mb-8">
          <span className="font-bold text-2xl text-white tracking-tight">Arba7i</span>
          <span className="text-xs text-blue-400 block mt-1">Super Admin Console</span>
        </div>
        <nav className="flex flex-col gap-4 text-sm text-slate-300">
          <div className="hover:text-white cursor-pointer transition-colors">Overview</div>
          <div className="hover:text-white cursor-pointer transition-colors">Sellers & Stores</div>
          <div className="hover:text-white cursor-pointer transition-colors">Subscriptions</div>
          <div className="hover:text-white cursor-pointer transition-colors">System Health</div>
        </nav>
      </aside>

      {/* Admin Main Content Area */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
