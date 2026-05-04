"use client"

import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type OrderFiltersProps = {
  lang: string
  copy: {
    searchPlaceholder: string
    allStatuses: string
    allRisk: string
    riskOnly: string
    noRisk: string
    newest: string
    oldest: string
    amountHigh: string
    amountLow: string
    apply: string
  }
  statuses: Array<{ value: string; label: string }>
}

export function OrderFilters({ lang, copy, statuses }: OrderFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function applyFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams)
    params.delete("page")
    if (!value || value === "all") params.delete(key)
    else params.set(key, value)
    const query = params.toString()
    router.push(query ? `/${lang}/dashboard/orders?${query}` : `/${lang}/dashboard/orders`)
  }

  return (
    <form action={`/${lang}/dashboard/orders`} className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_180px_160px_180px_auto]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="q"
          defaultValue={searchParams.get("q") || ""}
          placeholder={copy.searchPlaceholder}
          className="h-10 rounded-2xl pl-10"
        />
      </div>

      <Select name="status" value={searchParams.get("status") || "all"} onValueChange={(value) => applyFilter("status", value)}>
        <SelectTrigger className="h-10 w-full rounded-2xl">
          <SelectValue placeholder={copy.allStatuses} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{copy.allStatuses}</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select name="risk" value={searchParams.get("risk") || "all"} onValueChange={(value) => applyFilter("risk", value)}>
        <SelectTrigger className="h-10 w-full rounded-2xl">
          <SelectValue placeholder={copy.allRisk} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{copy.allRisk}</SelectItem>
          <SelectItem value="risk">{copy.riskOnly}</SelectItem>
          <SelectItem value="clean">{copy.noRisk}</SelectItem>
        </SelectContent>
      </Select>

      <Select name="sort" value={searchParams.get("sort") || "newest"} onValueChange={(value) => applyFilter("sort", value)}>
        <SelectTrigger className="h-10 w-full rounded-2xl">
          <SelectValue placeholder={copy.newest} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">{copy.newest}</SelectItem>
          <SelectItem value="oldest">{copy.oldest}</SelectItem>
          <SelectItem value="amount-desc">{copy.amountHigh}</SelectItem>
          <SelectItem value="amount-asc">{copy.amountLow}</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" className="rounded-2xl">
        {copy.apply}
      </Button>
    </form>
  )
}
