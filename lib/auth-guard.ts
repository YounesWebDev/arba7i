import { cache } from "react";
import { redirect } from "next/navigation";
import type { Permission, Role } from "@/lib/permissions";
import { hasPermission } from "@/lib/permissions";
import { writeAuditLog } from "@/lib/audit";
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

function getUnauthorizedPath(lang: string) {
  return `/${lang}/unauthorized`;
}

const getAuthState = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    supabase,
    user,
    userData,
    role: normalizeRole(userData?.role),
  };
});

export async function requireAuth(lang: string) {
  const auth = await getAuthState();

  if (!auth?.user) {
    redirect(`/${lang}/login`);
  }

  if (!auth.userData?.username || !auth.userData?.phone_number) {
    redirect(`/${lang}/complete-profile`);
  }

  return auth;
}

export async function requirePermission(lang: string, permission: Permission) {
  const auth = await requireAuth(lang);

  if (!hasPermission(auth.role, permission)) {
    await writeAuditLog({
      userId: auth.user.id,
      action: "role_check_denied",
      details: `Role "${auth.role}" was denied permission "${permission}".`,
    });

    redirect(getUnauthorizedPath(lang));
  }

  return auth;
}
