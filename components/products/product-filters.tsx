"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ProductFiltersCopy = {
  searchPlaceholder: string
  statusPlaceholder: string
  categoryPlaceholder: string
  allStatuses: string
  allCategories: string
  active: string
  draft: string
  outOfStock: string
}

export function ProductFilters({
  lang,
  categories,
  copy,
}: {
  lang: string
  categories: { id: string; name: string }[]
  copy: ProductFiltersCopy
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const isAr = lang === "ar"
  const [searchValue, setSearchValue] = useState(searchParams.get("q")?.toString() || "")
  const initialRenderRef = useRef(true)
  const currentQuery = searchParams.get("q")?.toString() || ""

  const updateRoute = useCallback((nextParams: URLSearchParams) => {
    startTransition(() => {
      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false })
    })
  }, [pathname, router])

  function handleFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    updateRoute(params)
  }

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false
      return
    }

    if (searchValue === currentQuery) {
      return
    }

    const trimmedSearchValue = searchValue.trim()
    if (trimmedSearchValue.length > 0 && trimmedSearchValue.length < 3) {
      return
    }

    const params = new URLSearchParams(searchParams)
    params.set("page", "1")
    if (trimmedSearchValue) {
      params.set("q", trimmedSearchValue)
    } else {
      params.delete("q")
    }

    const timeoutId = window.setTimeout(() => {
      updateRoute(params)
    }, 250)

    return () => window.clearTimeout(timeoutId)
  }, [currentQuery, searchParams, searchValue, updateRoute])

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center" dir={isAr ? "rtl" : "ltr"}>
      <div className="relative flex-1">
        <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${isAr ? "right-4" : "left-4"}`} />
        <Input
          placeholder={copy.searchPlaceholder}
          className={isAr ? "h-11 rounded-2xl border-border/70 bg-background pr-11 shadow-sm" : "h-11 rounded-2xl border-border/70 bg-background pl-11 shadow-sm"}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Select defaultValue={searchParams.get("status")?.toString() || "all"} onValueChange={(val) => handleFilter("status", val)}>
          <SelectTrigger className="h-11 w-full rounded-2xl border-border/70 bg-background shadow-sm sm:w-[160px]">
            <SelectValue placeholder={copy.statusPlaceholder} />
          </SelectTrigger>
          <SelectContent align={isAr ? "start" : "end"}>
            <SelectItem value="all">{copy.allStatuses}</SelectItem>
            <SelectItem value="active">{copy.active}</SelectItem>
            <SelectItem value="draft">{copy.draft}</SelectItem>
            <SelectItem value="out_of_stock">{copy.outOfStock}</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue={searchParams.get("category")?.toString() || "all"} onValueChange={(val) => handleFilter("category", val)}>
          <SelectTrigger className="h-11 w-full rounded-2xl border-border/70 bg-background shadow-sm sm:w-[190px]">
            <SelectValue placeholder={copy.categoryPlaceholder} />
          </SelectTrigger>
          <SelectContent align={isAr ? "start" : "end"}>
            <SelectItem value="all">{copy.allCategories}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
