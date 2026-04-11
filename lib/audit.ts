import { createClient } from "@/utils/supabase/server";

export type AuditAction =
  | "user_login"
  | "user_logout"
  | "password_reset"
  | "profile_completed"
  | "role_check_allowed"
  | "role_check_denied";

export async function writeAuditLog({
  userId,
  action,
  details,
}: {
  userId: string | null;
  action: AuditAction;
  details: string;
}) {
  const supabase = await createClient();

  await supabase.from("audit_logs").insert({
    user_id: userId,
    action,
    details,
  });
}
