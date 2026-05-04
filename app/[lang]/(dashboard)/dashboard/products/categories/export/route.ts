import { NextResponse } from "next/server"
import { and, count, desc, eq } from "drizzle-orm"
import { requirePermission } from "@/lib/auth-guard"
import { db } from "@/db"
import { categories, products, sellerStoreLinks } from "@/db/schema"
import { escapeCsvValue } from "@/lib/simple-text"

type Params = {
  params: Promise<{ lang: string }>
}

function escapeCsv(value: string | number) {
  return escapeCsvValue(value)
}

export async function GET(request: Request, { params }: Params) {
  const { lang } = await params
  const auth = await requirePermission(lang, "manage_products")
  const url = new URL(request.url)
  const filter = url.searchParams.get("filter") ?? "all"

  const [storeLink] = await db
    .select()
    .from(sellerStoreLinks)
    .where(and(eq(sellerStoreLinks.userId, auth.user.id), eq(sellerStoreLinks.isActive, true)))
    .limit(1)

  if (!storeLink) {
    return new NextResponse("No store found", { status: 404 })
  }

  const rows = await db
    .select({
      name: categories.name,
      createdAt: categories.createdAt,
      productCount: count(products.id),
    })
    .from(categories)
    .leftJoin(
      products,
      and(eq(products.categoryId, categories.id), eq(products.storeId, storeLink.storeId))
    )
    .where(eq(categories.storeId, storeLink.storeId))
    .groupBy(categories.id, categories.name, categories.createdAt)
    .orderBy(desc(categories.createdAt))

  const filteredRows = rows.filter((row) => {
    const productCount = Number(row.productCount ?? 0)
    if (filter === "active") return productCount > 0
    if (filter === "empty") return productCount === 0
    return true
  })

  const csv = [
    ["Category", "Products", "Status", "Created At"].join(","),
    ...filteredRows.map((row) => {
      const productCount = Number(row.productCount ?? 0)
      const status = productCount > 0 ? "Active" : "Empty"

      return [
        escapeCsv(row.name),
        escapeCsv(productCount),
        escapeCsv(status),
        escapeCsv(row.createdAt?.toISOString() ?? ""),
      ].join(",")
    }),
  ].join("\n")

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="categories-${filter}.csv"`,
    },
  })
}
