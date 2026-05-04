"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Edit, EyeOff, MoreHorizontal, Trash2 } from "lucide-react"
import { deleteProduct, setProductStatus } from "@/app/actions/products"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ProductActionCopy = {
  srOnly: string
  label: string
  edit: string
  hide: string
  delete: string
}

export function ProductActions({
  productId,
  storeId,
  lang,
  status,
  copy,
}: {
  productId: string
  storeId: string
  lang: string
  status: string | null
  copy: ProductActionCopy
}) {
  const router = useRouter()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const isAr = lang === "ar"

  function handleHide() {
    startTransition(async () => {
      const result = await setProductStatus(productId, storeId, lang, status === "draft" ? "active" : "draft")
      if (result.success) {
        router.refresh()
      }
    })
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteProduct(productId, storeId, lang)
      if (result.success) {
        setDeleteOpen(false)
        router.refresh()
      }
    })
  }

  return (
    <>
      <DropdownMenu dir={isAr ? "rtl" : "ltr"}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            disabled={isPending}
            className="h-9 w-9 rounded-2xl border border-transparent p-0 text-muted-foreground transition-colors hover:border-border/70 hover:bg-muted/60 hover:text-foreground"
          >
            <span className="sr-only">{copy.srOnly}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isAr ? "start" : "end"} className="rounded-2xl border-border/70 shadow-lg">
          <DropdownMenuLabel>{copy.label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/${lang}/dashboard/products/${productId}/edit`}>
              <Edit className={isAr ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
              {copy.edit}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleHide}>
            <EyeOff className={isAr ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
            {copy.hide}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={(event) => {
              event.preventDefault()
              setDeleteOpen(true)
            }}
          >
            <Trash2 className={isAr ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
            {copy.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent dir={isAr ? "rtl" : "ltr"}>
          <AlertDialogHeader className="text-start">
            <AlertDialogTitle>{copy.delete}</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the product and its media, options, and variants.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={isPending} onClick={handleDelete}>
              {copy.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
