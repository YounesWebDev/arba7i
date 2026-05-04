"use server"

import { and, eq, gte, sql } from "drizzle-orm"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { auditLogs, customers, orderItems, orders, products, riskEvents, stores } from "@/db/schema"
import { getWilayaById } from "@/lib/algeria-administrative-divisions"

export type CreateCodOrderState = {
  error?: string
  fieldErrors?: Record<string, string>
}

type CreateCodOrderContext = {
  lang: string
  storeSlug: string
  productSlug: string
}

type SelectedOption = {
  name: string
  value: string
}

function normalizePhone(value: string) {
  const compact = value.replace(/[\s.-]/g, "")
  if (compact.startsWith("+213")) return `0${compact.slice(4)}`
  if (compact.startsWith("00213")) return `0${compact.slice(5)}`
  if (compact.startsWith("213")) return `0${compact.slice(3)}`
  return compact
}

function isValidAlgerianPhone(value: string) {
  return /^0[567]\d{8}$/.test(value)
}

function parsePositiveInteger(value: FormDataEntryValue | null, fallback = 1) {
  const parsed = Number.parseInt(String(value || ""), 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function parseSelectedOptions(value: FormDataEntryValue | null): SelectedOption[] {
  try {
    const parsed = JSON.parse(String(value || "[]"))
    if (!Array.isArray(parsed)) return []

    return parsed
      .map((item) => ({
        name: String(item?.name || "").trim(),
        value: String(item?.value || "").trim(),
      }))
      .filter((item) => item.name && item.value)
  } catch {
    return []
  }
}

export async function createCodOrder(
  context: CreateCodOrderContext,
  _previousState: CreateCodOrderState,
  formData: FormData
): Promise<CreateCodOrderState> {
  const fullName = String(formData.get("fullName") || "").trim()
  const phone = normalizePhone(String(formData.get("phone") || ""))
  const wilayaId = parsePositiveInteger(formData.get("wilayaId"), 0)
  const communeId = parsePositiveInteger(formData.get("communeId"), 0)
  const address = String(formData.get("address") || "").trim()
  const note = String(formData.get("note") || "").trim()
  const quantity = parsePositiveInteger(formData.get("quantity"), 1)
  const selectedOptions = parseSelectedOptions(formData.get("selectedOptions"))
  const renderedAt = Number.parseInt(String(formData.get("renderedAt") || "0"), 10)
  const honeypot = String(formData.get("companyWebsite") || "").trim()
  const now = new Date()

  const fieldErrors: Record<string, string> = {}
  if (fullName.length < 3) fieldErrors.fullName = "fullName"
  if (!isValidAlgerianPhone(phone)) fieldErrors.phone = "phone"
  if (!address || address.length < 8) fieldErrors.address = "address"

  const wilaya = getWilayaById(wilayaId)
  const commune = wilaya?.communes.find((item) => item.id === communeId)
  if (!wilaya) fieldErrors.wilayaId = "wilaya"
  if (!commune) fieldErrors.communeId = "commune"

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "fixFields", fieldErrors }
  }

  const validWilaya = wilaya
  const validCommune = commune

  if (!validWilaya || !validCommune) {
    return { error: "location" }
  }

  if (honeypot) {
    return { error: "submitFailed" }
  }

  if (renderedAt && Date.now() - renderedAt < 1500) {
    return { error: "tooFast" }
  }

  const [store] = await db
    .select({
      id: stores.id,
      slug: stores.slug,
      isActive: stores.isActive,
    })
    .from(stores)
    .where(eq(stores.slug, context.storeSlug))
    .limit(1)

  if (!store || !store.isActive) {
    return { error: "storeUnavailable" }
  }

  const [product] = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      stock: products.stock,
      status: products.status,
    })
    .from(products)
    .where(and(eq(products.storeId, store.id), eq(products.slug, context.productSlug), eq(products.status, "active")))
    .limit(1)

  if (!product || Number(product.stock || 0) <= 0) {
    return { error: "productUnavailable" }
  }

  const safeQuantity = Math.min(quantity, Number(product.stock || 1))
  const totalAmount = Number(product.price || 0) * safeQuantity
  const duplicateSince = new Date(now.getTime() - 10 * 60 * 1000)

  const [duplicateOrder] = await db
    .select({ id: orders.id })
    .from(orders)
    .innerJoin(customers, eq(orders.customerId, customers.id))
    .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
    .where(
      and(
        eq(orders.storeId, store.id),
        eq(customers.phone, phone),
        eq(orderItems.productId, product.id),
        gte(orders.createdAt, duplicateSince)
      )
    )
    .limit(1)

  if (duplicateOrder) {
    return { error: "duplicate" }
  }

  const repeatedSince = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const [{ count: recentOrderCount }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(orders)
    .innerJoin(customers, eq(orders.customerId, customers.id))
    .where(and(eq(orders.storeId, store.id), eq(customers.phone, phone), gte(orders.createdAt, repeatedSince)))

  let newOrderId = ""

  await db.transaction(async (tx) => {
    const [customer] = await tx
      .insert(customers)
      .values({
        storeId: store.id,
        fullName,
        phone,
        wilaya: `${validWilaya.id} - ${validWilaya.name}`,
        commune: validCommune.name,
        address,
        riskScore: Number(recentOrderCount || 0) >= 3 ? "medium" : "low",
      })
      .returning({ id: customers.id })

    const [newOrder] = await tx
      .insert(orders)
      .values({
        storeId: store.id,
        customerId: customer.id,
        totalAmount: totalAmount.toFixed(2),
        status: "new",
        internalNotes: note
          ? `COD checkout note: ${note}`
          : `COD checkout created from storefront product ${product.name}.`,
      })
      .returning({ id: orders.id })

    newOrderId = newOrder.id

    await tx.insert(orderItems).values({
      orderId: newOrder.id,
      productId: product.id,
      quantity: safeQuantity,
      price: product.price,
      selectedOptions,
    })

    if (Number(recentOrderCount || 0) >= 3) {
      await tx.insert(riskEvents).values({
        storeId: store.id,
        customerId: customer.id,
        orderId: newOrder.id,
        reason: `Repeated COD orders from ${phone} within 24 hours.`,
        severity: "medium",
      })
    }

    await tx.insert(auditLogs).values({
      storeId: store.id,
      action: "cod_order_created",
      details: `Created COD order ${newOrder.id} for ${product.name}. Phone: ${phone}. Quantity: ${safeQuantity}.`,
    })
  })

  redirect(`/${context.lang}/${store.slug}/orders/${newOrderId}/success`)
}
