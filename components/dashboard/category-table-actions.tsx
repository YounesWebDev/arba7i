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
  copy: Record<string, string>
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
            {copy.filters}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44 rounded-2xl">
          <DropdownMenuItem asChild>
            <Link href={filterHref("all")}>{copy.filterAll}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={filterHref("active")}>{copy.filterWithProducts}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={filterHref("empty")}>{copy.filterEmpty}</Link>
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
