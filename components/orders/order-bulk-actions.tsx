"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type OrderBulkActionsProps = {
  lang: string
  copy: {
    bulkStatusPlaceholder: string
    applyBulk: string
    updating: string
  }
  statuses: Array<{ value: string; label: string }>
}

function SubmitButton({ copy }: { copy: OrderBulkActionsProps["copy"] }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="rounded-2xl">
      {pending ? copy.updating : copy.applyBulk}
    </Button>
  )
}

export function OrderBulkActions({ lang, copy, statuses }: OrderBulkActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select name="bulkStatus" defaultValue="confirmed">
        <SelectTrigger className="h-10 w-[190px] rounded-2xl">
          <SelectValue placeholder={copy.bulkStatusPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <SubmitButton copy={copy} />
      <input type="hidden" name="lang" value={lang} />
    </div>
  )
}
