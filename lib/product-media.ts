import { createClient } from "@/utils/supabase/server"

const DEFAULT_PRODUCT_IMAGES_BUCKET = "product-images"

export type StoredProductImage = {
  url: string
  storagePath: string
}

export function getProductImagesBucket() {
  return process.env.SUPABASE_PRODUCT_IMAGES_BUCKET || DEFAULT_PRODUCT_IMAGES_BUCKET
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-").toLowerCase()
}

export async function uploadProductImages(params: {
  storeId: string
  productId: string
  files: File[]
}) {
  const { storeId, productId, files } = params
  if (files.length === 0) return []

  const supabase = await createClient()
  const bucket = getProductImagesBucket()
  const uploaded: StoredProductImage[] = []

  for (const [index, file] of files.entries()) {
    const extension = file.name.includes(".") ? file.name.split(".").pop() : "bin"
    const safeBaseName = sanitizeFilename(file.name.replace(/\.[^.]+$/, "")) || `image-${index + 1}`
    const filePath = `${storeId}/${productId}/${Date.now()}-${index}-${safeBaseName}.${extension}`

    const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    })

    if (error) {
      throw new Error(`Image upload failed: ${error.message}`)
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
    uploaded.push({ url: data.publicUrl, storagePath: filePath })
  }

  return uploaded
}

export async function deleteProductImages(paths: string[]) {
  const normalizedPaths = paths.filter(Boolean)
  if (normalizedPaths.length === 0) return

  const supabase = await createClient()
  const bucket = getProductImagesBucket()
  const { error } = await supabase.storage.from(bucket).remove(normalizedPaths)

  if (error) {
    throw new Error(`Image cleanup failed: ${error.message}`)
  }
}
