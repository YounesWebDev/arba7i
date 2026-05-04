"use server"

import { and, eq, inArray } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { auditLogs, orders, sellerStoreLinks } from "@/db/schema"
import { requirePermission } from "@/lib/auth-guard"

const ORDER_STATUSES = ["new", "pending", "confirmed", "canceled", "shipped", "delivered", "returned"] as const

function normalizeStatus(value: FormDataEntryValue | null) {
  const status = String(value || "")
  return ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number]) ? status : ""
}

async function getActiveStoreId(lang: string) {
  const auth = await requirePermission(lang, "confirm_orders")
  const [storeLink] = await db
    .select({ storeId: sellerStoreLinks.storeId })
    .from(sellerStoreLinks)
    .where(and(eq(sellerStoreLinks.userId, auth.user.id), eq(sellerStoreLinks.isActive, true)))
    .limit(1)

  return { storeId: storeLink?.storeId, userId: auth.user.id }
}

export async function updateOrderStatus(lang: string, orderId: string, formData: FormData) {
  const status = normalizeStatus(formData.get("status"))
  if (!status) return

  const { storeId, userId } = await getActiveStoreId(lang)
  if (!storeId) return

  await db.transaction(async (tx) => {
    await tx
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(and(eq(orders.id, orderId), eq(orders.storeId, storeId)))

    await tx.insert(auditLogs).values({
      storeId,
      userId,
      action: "order_status_updated",
      details: `Updated order ${orderId} status to ${status}.`,
    })
  })

  revalidatePath(`/${lang}/dashboard/orders`)
  revalidatePath(`/${lang}/dashboard/orders/${orderId}`)
}

export async function updateOrderNotes(lang: string, orderId: string, formData: FormData) {
  const internalNotes = String(formData.get("internalNotes") || "").trim()
  const { storeId, userId } = await getActiveStoreId(lang)
  if (!storeId) return

  await db.transaction(async (tx) => {
    await tx
      .update(orders)
      .set({ internalNotes, updatedAt: new Date() })
      .where(and(eq(orders.id, orderId), eq(orders.storeId, storeId)))

    await tx.insert(auditLogs).values({
      storeId,
      userId,
      action: "order_notes_updated",
      details: `Updated internal notes for order ${orderId}.`,
    })
  })

  revalidatePath(`/${lang}/dashboard/orders/${orderId}`)
}

export async function bulkUpdateOrders(lang: string, formData: FormData) {
  const status = normalizeStatus(formData.get("bulkStatus"))
  const orderIds = formData.getAll("orderIds").map((value) => String(value)).filter(Boolean)

  if (!status || orderIds.length === 0) {
    return
  }

  const { storeId, userId } = await getActiveStoreId(lang)
  if (!storeId) return

  await db.transaction(async (tx) => {
    await tx
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(and(eq(orders.storeId, storeId), inArray(orders.id, orderIds)))

    await tx.insert(auditLogs).values({
      storeId,
      userId,
      action: "orders_bulk_status_updated",
      details: `Bulk updated ${orderIds.length} order(s) to ${status}.`,
    })
  })

  revalidatePath(`/${lang}/dashboard/orders`)
}
