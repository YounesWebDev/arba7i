"use client"

import { useFormStatus } from "react-dom"
import { updateOrderNotes } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

function SubmitButton({ submit, saving }: { submit: string; saving: string }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="rounded-2xl">
      {pending ? saving : submit}
    </Button>
  )
}

export function OrderNotesForm({
  lang,
  orderId,
  defaultValue,
  placeholder,
  submit,
  saving,
}: {
  lang: string
  orderId: string
  defaultValue: string
  placeholder: string
  submit: string
  saving: string
}) {
  return (
    <form action={updateOrderNotes.bind(null, lang, orderId)} className="space-y-3">
      <Textarea name="internalNotes" defaultValue={defaultValue} placeholder={placeholder} className="min-h-36 rounded-2xl" />
      <SubmitButton submit={submit} saving={saving} />
    </form>
  )
}
