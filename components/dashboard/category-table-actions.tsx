"use client"

import Link from "next/link"
import { Download, Package2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CategoryTableActions({
  lang,
  filter,
  copy,
}: {
  lang: string
  filter: string
  copy: {
    label: string
    export: string
    all: string
    withProducts: string
    empty: string
  }
}) {
  const filterHref = (value: string) =>
    value === "all"
      ? `/${lang}/dashboard/products/categories`
      : `/${lang}/dashboard/products/categories?filter=${value}`

  const exportHref =
    filter === "all"
      ? `/${lang}/dashboard/products/categories/export`
      : `/${lang}/dashboard/products/categories/export?filter=${filter}`

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="rounded-2xl">
            <Package2 className="me-2 h-4 w-4" />
            {copy.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44 rounded-2xl">
          <DropdownMenuItem asChild>
            <Link href={filterHref("all")}>{copy.all}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={filterHref("active")}>{copy.withProducts}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={filterHref("empty")}>{copy.empty}</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm" className="rounded-2xl" asChild>
        <Link href={exportHref}>
          <Download className="me-2 h-4 w-4" />
          {copy.export}
        </Link>
      </Button>
    </div>
  )
}
