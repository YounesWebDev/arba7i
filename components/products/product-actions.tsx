"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, EyeOff } from "lucide-react"
import Link from "next/link"

type ProductActionCopy = {
  srOnly: string
  label: string
  edit: string
  hide: string
  delete: string
}

export function ProductActions({
  productId,
  lang,
  copy,
}: {
  productId: string
  lang: string
  copy: ProductActionCopy
}) {
  const isAr = lang === "ar"

  return (
    <DropdownMenu dir={isAr ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
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
        <DropdownMenuItem>
          <EyeOff className={isAr ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
          {copy.hide}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Trash2 className={isAr ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
          {copy.delete}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
