import { db } from "@/db"
import { auditLogs } from "@/db/schema"

// 1. We combine your Auth actions with the new Product actions
export type AuditAction =
  | "user_login"
  | "user_logout"
  | "password_reset"
  | "profile_completed"
  | "role_check_allowed"
  | "role_check_denied"
  | "product_created"
  | "product_updated"
  | "product_deleted"
  | "product_status_changed";

// 2. Unified function that handles both System events (no storeId) and Store events
export async function writeAuditLog({
  storeId,
  userId,
  action,
  details,
}: {
  storeId?: string | null; // Optional for login/logout events
  userId?: string | null;  // Optional if it's an automated system event
  action: AuditAction | string;
  details: string;
}) {
  try {
    await db.insert(auditLogs).values({
      storeId: storeId || null,
      userId: userId || null,
      action,
      details,
    });
  } catch (error) {
    console.error("[AUDIT LOG ERROR]:", error);
  }
}