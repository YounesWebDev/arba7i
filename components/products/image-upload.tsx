"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { CloudUpload, Plus, X, Star } from "lucide-react"
import type { ImageUploadCopy, ProductImageItem } from "@/components/products/types"

type UploadImageItem =
  | {
      key: string
      kind: "existing"
      previewUrl: string
      existingId: string
      storagePath?: string | null
    }
  | {
      key: string
      kind: "new"
      previewUrl: string
      fileKey: string
    }

function buildFileKey(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`
}

function syncInputFiles(input: HTMLInputElement | null, files: File[]) {
  if (!input) return

  const transfer = new DataTransfer()
  for (const file of files) {
    transfer.items.add(file)
  }
  input.files = transfer.files
}

export function ImageUpload({
  copy,
  initialImages = [],
}: {
  copy: ImageUploadCopy
  initialImages?: ProductImageItem[]
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [removedExistingIds, setRemovedExistingIds] = useState<string[]>([])
  const [primaryKey, setPrimaryKey] = useState<string | null>(
    initialImages.find((image) => image.isPrimary)?.id
      ? `existing:${initialImages.find((image) => image.isPrimary)?.id}`
      : initialImages[0]?.id
        ? `existing:${initialImages[0].id}`
        : null
  )

  const previewImages = useMemo<UploadImageItem[]>(() => {
    const existingItems = initialImages
      .filter((image) => image.id && !removedExistingIds.includes(image.id))
      .map((image) => ({
        key: `existing:${image.id}`,
        kind: "existing" as const,
        previewUrl: image.url,
        existingId: image.id!,
        storagePath: image.storagePath,
      }))

    const newItems = selectedFiles.map((file) => ({
      key: `new:${buildFileKey(file)}`,
      kind: "new" as const,
      previewUrl: URL.createObjectURL(file),
      fileKey: buildFileKey(file),
    }))

    return [...existingItems, ...newItems]
  }, [initialImages, removedExistingIds, selectedFiles])

  useEffect(() => {
    return () => {
      for (const image of previewImages) {
        if (image.kind === "new") {
          URL.revokeObjectURL(image.previewUrl)
        }
      }
    }
  }, [previewImages])

  const effectivePrimaryKey =
    primaryKey && previewImages.some((image) => image.key === primaryKey)
      ? primaryKey
      : previewImages[0]?.key ?? null

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    setSelectedFiles((currentFiles) => {
      const nextFiles = [...currentFiles, ...files]
      syncInputFiles(fileInputRef.current, nextFiles)
      if (!primaryKey) {
        const firstNewFile = nextFiles[0]
        if (firstNewFile) {
          setPrimaryKey(`new:${buildFileKey(firstNewFile)}`)
        }
      }
      return nextFiles
    })
  }

  const removeImage = (image: UploadImageItem) => {
    if (image.kind === "existing") {
      setRemovedExistingIds((currentIds) =>
        currentIds.includes(image.existingId) ? currentIds : [...currentIds, image.existingId]
      )
      return
    }

    setSelectedFiles((currentFiles) => {
      const nextFiles = currentFiles.filter((file) => buildFileKey(file) !== image.fileKey)
      syncInputFiles(fileInputRef.current, nextFiles)
      return nextFiles
    })
  }

  return (
    <div className="space-y-6">
      <input type="hidden" name="removedImageIds" value={JSON.stringify(removedExistingIds)} />
      <input type="hidden" name="retainedImageIds" value={JSON.stringify(
        previewImages
          .filter((image) => image.kind === "existing")
          .map((image) => image.existingId)
      )} />
      <input type="hidden" name="primaryImageKey" value={effectivePrimaryKey || ""} />

      <div className="group flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-border/60 bg-muted/30 p-10 text-center transition-colors hover:bg-primary/5 relative">
        <input
          ref={fileInputRef}
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10"
          onChange={handleFileChange}
        />
        <div className="flex w-full flex-col items-center justify-center pointer-events-none">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm transition-transform group-hover:scale-110">
            <CloudUpload className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm font-bold text-foreground">{copy.dragDrop}</p>
          <p className="mt-1 text-xs text-muted-foreground">{copy.hint}</p>
          <div className="mt-6 rounded-2xl border border-border/60 bg-background px-4 py-2 text-xs font-bold shadow-sm transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            {copy.select}
          </div>
        </div>
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {previewImages.map((image) => (
            <div 
              key={image.key} 
              onClick={() => setPrimaryKey(image.key)}
              className={`group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border-2 transition-all ${effectivePrimaryKey === image.key ? "border-primary shadow-md" : "border-border/60 bg-muted hover:border-primary/50"}`}
            >
              <Image src={image.previewUrl} alt="Preview" fill unoptimized className="object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
              
              <button
                type="button"
                className="absolute right-2 top-2 z-20 flex h-7 w-7 scale-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 rtl:right-auto rtl:left-2"
                onClick={(e) => { e.stopPropagation(); removeImage(image); }}
              >
                <X className="h-4 w-4" />
              </button>

              {effectivePrimaryKey === image.key && (
                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-background/90 px-2 py-1 text-[10px] font-semibold text-primary backdrop-blur-md rtl:left-auto rtl:right-2">
                  <Star className="h-3 w-3 fill-primary" /> {copy.primary}
                </div>
              )}
            </div>
          ))}
          <label className="flex aspect-square cursor-pointer items-center justify-center rounded-2xl border border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Plus className="h-6 w-6" />
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}
    </div>
  )
}
