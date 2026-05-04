import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm"
import { db } from "@/db"
import { customers, orders, riskEvents, sellerStoreLinks } from "@/db/schema"
import { requirePermission } from "@/lib/auth-guard"

function csvEscape(value: unknown) {
  const text = String(value ?? "")
  return `"${text.replace(/"/g, '""')}"`
}

export async function GET(request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const auth = await requirePermission(lang, "confirm_orders")
  const url = new URL(request.url)
  const q = url.searchParams.get("q") || ""
  const status = url.searchParams.get("status") || "all"
  const risk = url.searchParams.get("risk") || "all"
  const sort = url.searchParams.get("sort") || "newest"

  const [storeLink] = await db
    .select({ storeId: sellerStoreLinks.storeId })
    .from(sellerStoreLinks)
    .where(and(eq(sellerStoreLinks.userId, auth.user.id), eq(sellerStoreLinks.isActive, true)))
    .limit(1)

  if (!storeLink) {
    return new Response("No active store found.", { status: 404 })
  }

  const filters = [eq(orders.storeId, storeLink.storeId)]
  if (q) filters.push(or(ilike(customers.fullName, `%${q}%`), ilike(customers.phone, `%${q}%`), ilike(orders.id, `%${q}%`))!)
  if (status !== "all") filters.push(eq(orders.status, status))
  if (risk === "risk") filters.push(sql`exists (select 1 from ${riskEvents} where ${riskEvents.orderId} = ${orders.id})`)
  if (risk === "clean") filters.push(sql`not exists (select 1 from ${riskEvents} where ${riskEvents.orderId} = ${orders.id})`)

  const orderBy =
    sort === "oldest"
      ? asc(orders.createdAt)
      : sort === "amount-desc"
        ? desc(orders.totalAmount)
        : sort === "amount-asc"
          ? asc(orders.totalAmount)
          : desc(orders.createdAt)

  const rows = await db
    .select({
      id: orders.id,
      status: orders.status,
      totalAmount: orders.totalAmount,
      createdAt: orders.createdAt,
      customerName: customers.fullName,
      customerPhone: customers.phone,
      wilaya: customers.wilaya,
      commune: customers.commune,
      address: customers.address,
      riskCount: sql<number>`count(${riskEvents.id})`,
    })
    .from(orders)
    .leftJoin(customers, eq(orders.customerId, customers.id))
    .leftJoin(riskEvents, eq(riskEvents.orderId, orders.id))
    .where(and(...filters))
    .groupBy(orders.id, customers.fullName, customers.phone, customers.wilaya, customers.commune, customers.address)
    .orderBy(orderBy)
    .limit(5000)

  const headers = ["order_id", "status", "customer", "phone", "wilaya", "commune", "address", "total_amount", "risk_count", "created_at"]
  const body = rows
    .map((row) =>
      [
        row.id,
        row.status,
        row.customerName,
        row.customerPhone,
        row.wilaya,
        row.commune,
        row.address,
        row.totalAmount,
        row.riskCount,
        row.createdAt?.toISOString(),
      ].map(csvEscape).join(",")
    )
    .join("\n")

  return new Response(`${headers.join(",")}\n${body}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="orders-export-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
