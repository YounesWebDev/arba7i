"use client"

import { useFormStatus } from "react-dom"
import { updateOrderStatus } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type OrderStatusFormProps = {
  lang: string
  orderId: string
  currentStatus: string
  submit: string
  saving: string
  statuses: Array<{ value: string; label: string }>
}

function Submit({ submit, saving }: { submit: string; saving: string }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="rounded-2xl">
      {pending ? saving : submit}
    </Button>
  )
}

export function OrderStatusForm({ lang, orderId, currentStatus, submit, saving, statuses }: OrderStatusFormProps) {
  return (
    <form action={updateOrderStatus.bind(null, lang, orderId)} className="flex flex-wrap gap-3">
      <Select name="status" defaultValue={currentStatus}>
        <SelectTrigger className="h-10 w-[190px] rounded-2xl">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Submit submit={submit} saving={saving} />
    </form>
  )
}
