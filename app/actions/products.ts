"use server"

import { and, eq, inArray, not, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { products, productOptions, productVariants, productImages } from "@/db/schema"
import { writeAuditLog } from "@/lib/audit"
import { deleteProductImages, uploadProductImages } from "@/lib/product-media"
import { buildSimpleSlug } from "@/lib/simple-text"

type ProductOptionInput = {
  name: string
  type: string
  values: string[]
  isRequired: boolean
}

type ExistingImageRecord = typeof productImages.$inferSelect

function buildUploadedFileKey(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`
}

function normalizeProductOptions(raw: string) {
  const parsed = JSON.parse(raw) as ProductOptionInput[]
  return parsed
    .map((option) => ({
      name: String(option.name || "").trim(),
      type: String(option.type || "radio").trim(),
      values: Array.isArray(option.values)
        ? option.values.map((value) => String(value).trim()).filter(Boolean)
        : [],
      isRequired: Boolean(option.isRequired),
    }))
    .filter((option) => option.name)
}

function generateVariantCombinations(options: ProductOptionInput[]): string[] {
  const validOptions = options.filter((option) => option.values.length > 0)
  if (validOptions.length === 0) return []
  if (validOptions.length === 1) return validOptions[0].values

  const [firstOption, ...restOptions] = validOptions
  const restCombinations = generateVariantCombinations(restOptions)
  return firstOption.values.flatMap((value) => restCombinations.map((rest) => `${value} / ${rest}`))
}

function parseJsonArray(raw: FormDataEntryValue | null) {
  const value = String(raw || "[]")
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function getPrimaryImageIndex(primaryImageKey: string, retainedImageIds: string[], newFiles: File[]) {
  if (!primaryImageKey) return 0
  if (primaryImageKey.startsWith("existing:")) {
    const existingId = primaryImageKey.replace("existing:", "")
    const retainedIndex = retainedImageIds.findIndex((id) => id === existingId)
    return retainedIndex >= 0 ? retainedIndex : 0
  }

  if (primaryImageKey.startsWith("new:")) {
    const targetKey = primaryImageKey.replace("new:", "")
    const retainedCount = retainedImageIds.length
    const newFileIndex = newFiles.findIndex((file) => buildUploadedFileKey(file) === targetKey)
    if (newFileIndex >= 0) {
      return retainedCount + newFileIndex
    }
  }

  return 0
}

function slugify(value: string) {
  // Keep the same slug rules as before, but do it with explicit character checks.
  return buildSimpleSlug(value, "product")
}

export async function createProduct(storeId: string, lang: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim()
  const description = String(formData.get("description") || "").trim()
  const categoryId = String(formData.get("categoryId") || "") === "none" ? null : String(formData.get("categoryId"))
  const price = Number(formData.get("price"))
  const comparePrice = formData.get("comparePrice") ? Number(formData.get("comparePrice")) : null
  const stock = Number.parseInt(String(formData.get("stock") || "0"), 10)
  const status = String(formData.get("status") || "active").trim()
  const explicitSku = String(formData.get("sku") || "").trim()
  
  // Options
  const optionsRaw = String(formData.get("options") || "[]")
  const options = normalizeProductOptions(optionsRaw)

  if (!name || Number.isNaN(price) || price < 0 || Number.isNaN(stock)) {
    redirect(`/${lang}/dashboard/products/new?error=${encodeURIComponent("Invalid product details.")}`)
  }

  let isSuccess = false
  const sku = explicitSku || `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  let uploadedImagePaths: string[] = []

  try {
    const baseSlug = slugify(name)
    let slug = baseSlug
    let counter = 2
    while ((await db.select({ id: products.id }).from(products).where(and(eq(products.storeId, storeId), eq(products.slug, slug)))).length > 0) {
      slug = `${baseSlug}-${counter++}`
    }

    await db.transaction(async (tx) => {
      // 1. Insert Product
      const [newProduct] = await tx.insert(products).values({
        storeId, categoryId, name, slug, description, price: price.toFixed(2),
        comparePrice: comparePrice ? comparePrice.toFixed(2) : null,
        stock, lowStockThreshold: 5, sku, status,
      }).returning({ id: products.id })

      // 2. Upload Images
      const primaryImageKey = String(formData.get("primaryImageKey") || "")
      const imageFiles = (formData.getAll("images") as File[]).filter((file) => file.size > 0)
      const uploadedImages = await uploadProductImages({
        storeId,
        productId: newProduct.id,
        files: imageFiles,
      })
      uploadedImagePaths = uploadedImages.map((image) => image.storagePath)
      const primaryIndex = getPrimaryImageIndex(primaryImageKey, [], imageFiles)
      
      if (uploadedImages.length > 0) {
        await tx.insert(productImages).values(uploadedImages.map((image, i) => ({ 
          productId: newProduct.id, 
          url: image.url,
          storagePath: image.storagePath,
          isPrimary: i === primaryIndex 
        })))
      }

      // 3. Insert Options & Generate Variants
      if (options.length > 0) {
        await tx.insert(productOptions).values(
          options.map(opt => ({
            productId: newProduct.id,
            name: opt.name,
            type: opt.type,
            values: opt.values,
            isRequired: opt.isRequired,
          }))
        )

        const combinations = generateVariantCombinations(options)
        if (combinations.length > 0) {
          await tx.insert(productVariants).values(
            combinations.map((comboName, idx) => ({
              productId: newProduct.id, name: comboName, sku: `${sku}-${idx + 1}`, price: price.toFixed(2), stock: 0
            }))
          )
        }
      }
    })

    await writeAuditLog({
      storeId,
      action: "product_created",
      details: `Created new product: ${name} (SKU: ${sku}, Price: ${price})`
    })

    isSuccess = true
  } catch (error) {
    console.error("[DATABASE ERROR]:", error)
    await deleteProductImages(uploadedImagePaths).catch((cleanupError) => {
      console.error("[IMAGE CLEANUP ERROR]:", cleanupError)
    })
  }

  // Redirect OUTSIDE the try/catch block
  if (!isSuccess) {
    redirect(`/${lang}/dashboard/products/new?error=${encodeURIComponent("Failed to save product completely.")}`)
  }

  revalidatePath(`/${lang}/dashboard/products`)
  redirect(`/${lang}/dashboard/products?success=${encodeURIComponent("Product created successfully!")}`)
}

export async function updateProduct(productId: string, storeId: string, lang: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim()
  const description = String(formData.get("description") || "").trim()
  const categoryId = String(formData.get("categoryId") || "") === "none" ? null : String(formData.get("categoryId"))
  const price = Number(formData.get("price"))
  const comparePrice = formData.get("comparePrice") ? Number(formData.get("comparePrice")) : null
  const stock = Number.parseInt(String(formData.get("stock") || "0"), 10)
  const status = String(formData.get("status") || "active").trim()
  const explicitSku = String(formData.get("sku") || "").trim()
  const options = normalizeProductOptions(String(formData.get("options") || "[]"))
  const removedImageIds = parseJsonArray(formData.get("removedImageIds")).map((value) => String(value))
  const retainedImageIds = parseJsonArray(formData.get("retainedImageIds")).map((value) => String(value))
  const primaryImageKey = String(formData.get("primaryImageKey") || "")

  if (!name || Number.isNaN(price) || price < 0 || Number.isNaN(stock)) {
    redirect(`/${lang}/dashboard/products/${productId}/edit?error=${encodeURIComponent("Invalid product details.")}`)
  }

  let isSuccess = false
  let uploadedImagePaths: string[] = []
  let deletedStoragePaths: string[] = []

  try {
    const [existingProduct] = await db.select().from(products)
      .where(and(eq(products.id, productId), eq(products.storeId, storeId))).limit(1)
    
    if (!existingProduct) throw new Error("Product not found")

    const existingImages = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productId))

    const baseSlug = slugify(name)
    let slug = baseSlug
    let counter = 2
    
    while (
      (await db.select({ id: products.id })
        .from(products)
        .where(
          and(
            eq(products.storeId, storeId), 
            eq(products.slug, slug), 
            not(eq(products.id, productId))
          )
        )).length > 0
    ) {
      slug = `${baseSlug}-${counter++}`
    }

    const newImageFiles = (formData.getAll("images") as File[]).filter((file) => file.size > 0)
    const uploadedImages = await uploadProductImages({
      storeId,
      productId,
      files: newImageFiles,
    })
    uploadedImagePaths = uploadedImages.map((image) => image.storagePath)

    const retainedExistingImages = existingImages.filter((image) => retainedImageIds.includes(image.id))
    const imagesToDelete = existingImages.filter((image) => removedImageIds.includes(image.id))
    deletedStoragePaths = imagesToDelete.map((image) => image.storagePath).filter(Boolean) as string[]
    const primaryIndex = getPrimaryImageIndex(primaryImageKey, retainedExistingImages.map((image) => image.id), newImageFiles)
    const finalImages = [
      ...retainedExistingImages.map((image) => ({
        id: image.id,
        url: image.url,
        storagePath: image.storagePath,
      })),
      ...uploadedImages,
    ]

    await db.transaction(async (tx) => {
      await tx.update(products).set({
        categoryId,
        name,
        slug,
        description,
        price: price.toFixed(2),
        comparePrice: comparePrice ? comparePrice.toFixed(2) : null,
        stock,
        sku: explicitSku || existingProduct.sku,
        status,
        updatedAt: new Date(),
      }).where(eq(products.id, productId))

      await tx.delete(productOptions).where(eq(productOptions.productId, productId))
      await tx.delete(productVariants).where(eq(productVariants.productId, productId))

      if (removedImageIds.length > 0) {
        await tx.delete(productImages).where(
          and(eq(productImages.productId, productId), inArray(productImages.id, removedImageIds))
        )
      }

      if (uploadedImages.length > 0) {
        await tx.insert(productImages).values(
          uploadedImages.map((image) => ({
            productId,
            url: image.url,
            storagePath: image.storagePath,
            isPrimary: false,
          }))
        )
      }

      if (finalImages.length > 0) {
        await tx
          .update(productImages)
          .set({
            isPrimary: sql`false`,
          })
          .where(eq(productImages.productId, productId))

        const primaryImage = finalImages[Math.min(primaryIndex, finalImages.length - 1)]
        if (primaryImage && "id" in primaryImage) {
          await tx
            .update(productImages)
            .set({ isPrimary: true })
            .where(eq(productImages.id, primaryImage.id))
        } else if (primaryImage?.storagePath) {
          await tx
            .update(productImages)
            .set({ isPrimary: true })
            .where(and(eq(productImages.productId, productId), eq(productImages.storagePath, primaryImage.storagePath)))
        }
      }

      if (options.length > 0) {
        await tx.insert(productOptions).values(
          options.map((option) => ({
            productId,
            name: option.name,
            type: option.type,
            values: option.values,
            isRequired: option.isRequired,
          }))
        )

        const combinations = generateVariantCombinations(options)
        if (combinations.length > 0) {
          await tx.insert(productVariants).values(
            combinations.map((comboName, index) => ({
              productId,
              name: comboName,
              sku: `${explicitSku || existingProduct.sku || existingProduct.id}-${index + 1}`,
              price: price.toFixed(2),
              stock: 0,
            }))
          )
        }
      }
    })

    if (deletedStoragePaths.length > 0) {
      await deleteProductImages(deletedStoragePaths).catch((cleanupError) => {
        console.error("[IMAGE CLEANUP WARNING]:", cleanupError)
      })
    }

    await writeAuditLog({
      storeId, 
      action: "product_updated", 
      details: `Updated product ID: ${productId} (New Price: ${price}, Stock: ${stock})`
    })

    isSuccess = true
  } catch (error) {
    console.error("[DATABASE ERROR]:", error)
    await deleteProductImages(uploadedImagePaths).catch((cleanupError) => {
      console.error("[IMAGE CLEANUP ERROR]:", cleanupError)
    })
  }

  if (!isSuccess) {
    redirect(`/${lang}/dashboard/products/${productId}/edit?error=${encodeURIComponent("Failed to update product.")}`)
  }

  revalidatePath(`/${lang}/dashboard/products`)
  redirect(`/${lang}/dashboard/products?success=${encodeURIComponent("Product updated successfully!")}`)
}

export async function setProductStatus(productId: string, storeId: string, lang: string, status: "active" | "draft") {
  try {
    await db
      .update(products)
      .set({ status, updatedAt: new Date() })
      .where(and(eq(products.id, productId), eq(products.storeId, storeId)))

    await writeAuditLog({
      storeId,
      action: "product_status_updated",
      details: `Updated product ID: ${productId} status to ${status}`,
    })

    revalidatePath(`/${lang}/dashboard/products`)
    return { success: true }
  } catch (error) {
    console.error("[PRODUCT STATUS ERROR]:", error)
    return { success: false, error: "Failed to update product status." }
  }
}

export async function deleteProduct(productId: string, storeId: string, lang: string) {
  try {
    const existingImages: ExistingImageRecord[] = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productId))

    // 1. Delete the product (Drizzle's onDelete: "cascade" in your schema 
    // will automatically clean up the associated images, options, and variants!)
    await db
      .delete(products)
      .where(and(eq(products.id, productId), eq(products.storeId, storeId)))

    // 2. Log the deletion for security/history
    await writeAuditLog({
      storeId,
      action: "product_deleted",
      details: `Deleted product ID: ${productId}`,
    })

    await deleteProductImages(
      existingImages.map((image) => image.storagePath).filter(Boolean) as string[]
    ).catch((cleanupError) => {
      console.error("[IMAGE CLEANUP WARNING]:", cleanupError)
    })

    revalidatePath(`/${lang}/dashboard/products`)
    return { success: true }
  } catch (error) {
    console.error("[DELETE PRODUCT ERROR]:", error)
    return { success: false, error: "Failed to delete product. It may be linked to existing orders." }
  }
}
