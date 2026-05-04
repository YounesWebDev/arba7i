"use client"

import * as React from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { ArrowRight, Lock, ShieldCheck } from "lucide-react"
import { createCodOrder, type CreateCodOrderState } from "@/app/actions/storefront-orders"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { wilayas } from "@/lib/algeria-administrative-divisions"

type QuickCodCheckoutFormProps = {
  actionContext: {
    lang: string
    storeSlug: string
    productSlug: string
  }
  quantity: number
  selectedOptions: Array<{ name: string; value: string }>
  copy: {
    submit: string
    submitting: string
    blockedTitle: string
    protected: string
    fullName: string
    fullNamePlaceholder: string
    phone: string
    phonePlaceholder: string
    wilaya: string
    wilayaPlaceholder: string
    commune: string
    communePlaceholder: string
    address: string
    addressPlaceholder: string
    note: string
    notePlaceholder: string
    errors: Record<string, string>
    fieldErrors: Record<string, string>
  }
}

function SubmitButton({ copy }: { copy: QuickCodCheckoutFormProps["copy"] }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-14 w-full rounded-2xl text-base font-bold shadow-lg shadow-primary/10"
    >
      {pending ? copy.submitting : copy.submit}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  )
}

function getCopyValue(values: Record<string, string>, key: string | undefined) {
  return key ? values[key] || key : ""
}

export function QuickCodCheckoutForm({
  actionContext,
  quantity,
  selectedOptions,
  copy,
}: QuickCodCheckoutFormProps) {
  const [selectedWilayaId, setSelectedWilayaId] = React.useState(() => String(wilayas[0]?.id ?? ""))
  const selectedWilaya = React.useMemo(
    () => wilayas.find((wilaya) => String(wilaya.id) === selectedWilayaId) ?? wilayas[0],
    [selectedWilayaId]
  )
  const communes = React.useMemo(() => selectedWilaya?.communes ?? [], [selectedWilaya])
  const [selectedCommuneId, setSelectedCommuneId] = React.useState(() => String(communes[0]?.id ?? ""))
  const [state, formAction] = useActionState<CreateCodOrderState, FormData>(
    createCodOrder.bind(null, actionContext),
    {}
  )
  const [renderedAt, setRenderedAt] = React.useState(0)

  React.useEffect(() => {
    setSelectedCommuneId(String(communes[0]?.id ?? ""))
  }, [communes])

  React.useEffect(() => {
    setRenderedAt(Date.now())
  }, [])

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="quantity" value={quantity} />
      <input type="hidden" name="selectedOptions" value={JSON.stringify(selectedOptions)} />
      <input type="hidden" name="renderedAt" value={renderedAt} />
      <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" />

      {state.error ? (
        <Alert variant="destructive" className="rounded-2xl px-4 py-3">
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>{copy.blockedTitle}</AlertTitle>
          <AlertDescription>{getCopyValue(copy.errors, state.error)}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="ml-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {copy.fullName}
          </Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder={copy.fullNamePlaceholder}
            autoComplete="name"
            aria-invalid={Boolean(state.fieldErrors?.fullName)}
            className="h-12 rounded-2xl bg-muted/40"
            required
          />
          {state.fieldErrors?.fullName ? <p className="text-xs text-destructive">{getCopyValue(copy.fieldErrors, state.fieldErrors.fullName)}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="ml-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {copy.phone}
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder={copy.phonePlaceholder}
            autoComplete="tel"
            inputMode="tel"
            pattern="^(\\+213|00213|213|0)?[567][0-9]{8}$"
            aria-invalid={Boolean(state.fieldErrors?.phone)}
            className="h-12 rounded-2xl bg-muted/40"
            required
          />
          {state.fieldErrors?.phone ? <p className="text-xs text-destructive">{getCopyValue(copy.fieldErrors, state.fieldErrors.phone)}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="ml-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{copy.wilaya}</Label>
          <Select name="wilayaId" value={selectedWilayaId} onValueChange={setSelectedWilayaId}>
            <SelectTrigger className="h-12 w-full rounded-2xl bg-muted/40">
              <SelectValue placeholder={copy.wilayaPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {wilayas.map((wilaya) => (
                <SelectItem key={wilaya.id} value={String(wilaya.id)}>
                  {wilaya.id} - {wilaya.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.fieldErrors?.wilayaId ? <p className="text-xs text-destructive">{getCopyValue(copy.fieldErrors, state.fieldErrors.wilayaId)}</p> : null}
        </div>

        <div className="space-y-2">
          <Label className="ml-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{copy.commune}</Label>
          <Select name="communeId" value={selectedCommuneId} onValueChange={setSelectedCommuneId}>
            <SelectTrigger className="h-12 w-full rounded-2xl bg-muted/40">
              <SelectValue placeholder={copy.communePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {communes.map((commune) => (
                <SelectItem key={commune.id} value={String(commune.id)}>
                  {commune.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.fieldErrors?.communeId ? <p className="text-xs text-destructive">{getCopyValue(copy.fieldErrors, state.fieldErrors.communeId)}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="ml-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {copy.address}
        </Label>
        <Textarea
          id="address"
          name="address"
          placeholder={copy.addressPlaceholder}
          rows={3}
          aria-invalid={Boolean(state.fieldErrors?.address)}
          className="min-h-24 rounded-2xl bg-muted/40"
          required
        />
        {state.fieldErrors?.address ? <p className="text-xs text-destructive">{getCopyValue(copy.fieldErrors, state.fieldErrors.address)}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="note" className="ml-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {copy.note}
        </Label>
        <Textarea
          id="note"
          name="note"
          placeholder={copy.notePlaceholder}
          rows={2}
          className="min-h-20 rounded-2xl bg-muted/40"
        />
      </div>

      <SubmitButton copy={copy} />

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock className="h-4 w-4" />
        <span>{copy.protected}</span>
      </div>
    </form>
  )
}
