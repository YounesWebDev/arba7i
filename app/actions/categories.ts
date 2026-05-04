"use server"

import { and, eq, like } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { Locale } from "@/i18n-config"
import { getCategoriesDictionary } from "@/lib/dictionary"
import { db } from "@/db"
import { categories } from "@/db/schema"
import { buildSimpleSlug } from "@/lib/simple-text"

async function getCategoryActionCopy(lang: string) {
  const dict = await getCategoriesDictionary(lang as Locale)
  const categoriesPage = (dict as Record<string, unknown>).categoriesPage as {
    messages: Record<string, string>
  }

  return categoriesPage.messages
}

function slugifyCategoryName(name: string) {
  // Reuse the same readable slug builder so products and categories behave the same way.
  return buildSimpleSlug(name, "category")
}

async function buildUniqueCategorySlug(
  storeId: string,
  name: string,
  excludeCategoryId?: string
) {
  const baseSlug = slugifyCategoryName(name)

  const existingSlugs = await db
    .select({ id: categories.id, slug: categories.slug })
    .from(categories)
    .where(and(eq(categories.storeId, storeId), like(categories.slug, `${baseSlug}%`)))

  const usedSlugs = new Set(
    existingSlugs
      .filter((row) => row.id !== excludeCategoryId)
      .map((row) => row.slug)
  )

  if (!usedSlugs.has(baseSlug)) {
    return baseSlug
  }

  let counter = 2
  while (usedSlugs.has(`${baseSlug}-${counter}`)) {
    counter += 1
  }

  return `${baseSlug}-${counter}`
}

export async function createCategory(storeId: string, name: string, lang: string) {
  const copy = await getCategoryActionCopy(lang)

  try {
    const formattedName = name.trim()
    if (!formattedName) {
      return { success: false, error: copy.nameRequired }
    }

    const formattedSlug = await buildUniqueCategorySlug(storeId, formattedName)

    await db.insert(categories).values({
      storeId,
      name: formattedName,
      slug: formattedSlug,
    })

    revalidatePath(`/${lang}/dashboard/products/categories`)
    return { success: true }
  } catch (error: unknown) {
    const errorWithMeta = error as { code?: string; message?: string }

    if (errorWithMeta.code === "23505" || errorWithMeta.message?.includes("unique")) {
      return { success: false, error: copy.duplicateName }
    }

    return { success: false, error: copy.createFailed }
  }
}

export async function updateCategory(
  categoryId: string,
  storeId: string,
  name: string,
  lang: string
) {
  const copy = await getCategoryActionCopy(lang)

  try {
    const formattedName = name.trim()
    if (!formattedName) {
      return { success: false, error: copy.nameRequired }
    }

    const formattedSlug = await buildUniqueCategorySlug(storeId, formattedName, categoryId)

    await db
      .update(categories)
      .set({
        name: formattedName,
        slug: formattedSlug,
        updatedAt: new Date(),
      })
      .where(and(eq(categories.id, categoryId), eq(categories.storeId, storeId)))

    revalidatePath(`/${lang}/dashboard/products/categories`)
    return { success: true }
  } catch (error: unknown) {
    const errorWithMeta = error as { code?: string; message?: string }

    if (errorWithMeta.code === "23505" || errorWithMeta.message?.includes("unique")) {
      return { success: false, error: copy.duplicateName }
    }

    return { success: false, error: copy.updateFailed }
  }
}

export async function deleteCategory(categoryId: string, storeId: string, lang: string) {
  const copy = await getCategoryActionCopy(lang)

  try {
    await db
      .delete(categories)
      .where(and(eq(categories.id, categoryId), eq(categories.storeId, storeId)))

    revalidatePath(`/${lang}/dashboard/products/categories`)
    return { success: true }
  } catch {
    return { success: false, error: copy.deleteFailed }
  }
}
