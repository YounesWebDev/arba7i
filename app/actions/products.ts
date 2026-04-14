"use server"

import { and, eq, like } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { products } from "@/db/schema"

function slugifySkuPart(value: string) {
  const normalized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^A-Z0-9-]+/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")

  return normalized || "PRODUCT"
}

async function buildUniqueSku(storeId: string, name: string, explicitSku?: string) {
  const baseSku = slugifySkuPart(explicitSku?.trim() || name)

  const existingSkus = await db
    .select({ sku: products.sku })
    .from(products)
    .where(and(eq(products.storeId, storeId), like(products.sku, `${baseSku}%`)))

  const usedSkus = new Set(existingSkus.map((row) => row.sku).filter(Boolean))

  if (!usedSkus.has(baseSku)) {
    return baseSku
  }

  let counter = 2
  while (usedSkus.has(`${baseSku}-${counter}`)) {
    counter += 1
  }

  return `${baseSku}-${counter}`
}

export async function createProduct(storeId: string, lang: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim()
  const description = String(formData.get("description") || "").trim()
  const categoryIdValue = String(formData.get("categoryId") || "").trim()
  const categoryId = categoryIdValue === "none" ? "" : categoryIdValue
  const rawPrice = String(formData.get("price") || "").trim()
  const rawStock = String(formData.get("stock") || "").trim()
  const rawThreshold = String(formData.get("lowStockThreshold") || "").trim()
  const status = String(formData.get("status") || "active").trim() || "active"
  const explicitSku = String(formData.get("sku") || "").trim()

  if (!name) {
    redirect(`/${lang}/dashboard/products/new?error=${encodeURIComponent("Product name is required.")}`)
  }

  const price = Number(rawPrice)
  const stock = Number.parseInt(rawStock || "0", 10)
  const lowStockThreshold = Number.parseInt(rawThreshold || "5", 10)

  if (Number.isNaN(price) || price < 0) {
    redirect(`/${lang}/dashboard/products/new?error=${encodeURIComponent("Price must be a valid number.")}`)
  }

  if (Number.isNaN(stock) || stock < 0) {
    redirect(`/${lang}/dashboard/products/new?error=${encodeURIComponent("Stock must be zero or more.")}`)
  }

  if (Number.isNaN(lowStockThreshold) || lowStockThreshold < 0) {
    redirect(`/${lang}/dashboard/products/new?error=${encodeURIComponent("Low stock threshold must be zero or more.")}`)
  }

  try {
    const sku = await buildUniqueSku(storeId, name, explicitSku || undefined)

    await db.insert(products).values({
      storeId,
      categoryId: categoryId || null,
      name,
      description: description || null,
      price: price.toFixed(2),
      stock,
      lowStockThreshold,
      sku,
      status,
    })

    revalidatePath(`/${lang}/dashboard/products`)
    revalidatePath(`/${lang}/dashboard`)
    redirect(`/${lang}/dashboard/products`)
  } catch {
    redirect(`/${lang}/dashboard/products/new?error=${encodeURIComponent("Failed to create product.")}`)
  }
}

export async function deleteProduct(productId: string, storeId: string, lang: string) {
  try {
    await db
      .delete(products)
      .where(and(eq(products.id, productId), eq(products.storeId, storeId)))

    revalidatePath(`/${lang}/dashboard/products`)
    return { success: true }
  } catch {
    return { success: false, error: "Failed to delete product." }
  }
}

export async function toggleProductStatus(productId: string, storeId: string, currentStatus: string, lang: string) {
  try {
    const newStatus = currentStatus === "active" ? "draft" : "active"

    await db
      .update(products)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(and(eq(products.id, productId), eq(products.storeId, storeId)))

    revalidatePath(`/${lang}/dashboard/products`)
    return { success: true }
  } catch {
    return { success: false, error: "Failed to update product status." }
  }
}
