"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ShoppingBag, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useStorefrontCart } from "@/components/storefront/cart-provider"
import { wilayas } from "@/lib/algeria-administrative-divisions"

type ProductOption = {
  id: string
  name: string
  type: string
  values: string[]
  isRequired?: boolean | null
}

type ProductPurchasePanelProps = {
  product: {
    id: string
    slug: string
    name: string
    price: number
    stock: number
    image?: string | null
  }
  options: ProductOption[]
  currency?: string | null
  shipmentFee?: number
  copy: {
    quantity: string
    addToCart: string
    orderNow: string
    unavailable: string
    yourDetails: string
    fullName: string
    fullNamePlaceholder: string
    wilaya: string
    wilayaPlaceholder: string
    commune: string
    communePlaceholder: string
    shipment: string
    subtotal: string
    total: string
    orderSummary: string
  }
  checkoutHref?: string
}

function formatMoney(value: number, currency = "DZD") {
  return `${Math.round(value || 0).toLocaleString()} ${currency}`
}

export function ProductPurchasePanel({
  product,
  options,
  currency,
  shipmentFee = 600,
  copy,
  checkoutHref,
}: ProductPurchasePanelProps) {
  const router = useRouter()
  const { addItem } = useStorefrontCart()
  const [quantity, setQuantity] = React.useState(1)
  const [selectedWilayaId, setSelectedWilayaId] = React.useState<string>(() => String(wilayas[0]?.id ?? ""))
  const [selectedOptions, setSelectedOptions] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(
      options.map((option) => [option.id, option.values[0] || ""])
    )
  )

  const selectedWilaya = React.useMemo(
    () => wilayas.find((wilaya) => String(wilaya.id) === selectedWilayaId) ?? wilayas[0],
    [selectedWilayaId]
  )
  const communeOptions = React.useMemo(() => selectedWilaya?.communes ?? [], [selectedWilaya])
  const [selectedCommuneId, setSelectedCommuneId] = React.useState<string>(() => String(communeOptions[0]?.id ?? ""))

  React.useEffect(() => {
    setSelectedCommuneId(String(communeOptions[0]?.id ?? ""))
  }, [selectedWilayaId, communeOptions])

  const hasStock = product.stock > 0
  const subtotal = product.price * quantity
  const total = subtotal + shipmentFee
  const optionList = options
    .map((option) => ({
      name: option.name,
      value: selectedOptions[option.id] || "",
    }))
    .filter((option) => option.value)
  const checkoutUrl = React.useMemo(() => {
    if (!checkoutHref) return ""

    const params = new URLSearchParams()
    params.set("quantity", String(quantity))
    if (optionList.length > 0) params.set("options", JSON.stringify(optionList))

    return `${checkoutHref}?${params.toString()}`
  }, [checkoutHref, optionList, quantity])

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        {options.map((option) => (
          <div key={option.id} className="space-y-3">
            <Label className="text-sm font-semibold">
              {option.name}
              {option.isRequired ? <span className="ml-1 text-destructive">*</span> : null}
            </Label>

            {option.type === "radio" && option.values.length > 0 ? (
              <RadioGroup
                value={selectedOptions[option.id]}
                onValueChange={(value) => setSelectedOptions((current) => ({ ...current, [option.id]: value }))}
                className="gap-3"
              >
                {option.values.map((value) => (
                  <label key={value} className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3 text-sm font-medium">
                    <RadioGroupItem value={value} id={`${option.id}-${value}`} />
                    <span>{value}</span>
                  </label>
                ))}
              </RadioGroup>
            ) : null}

            {["dropdown", "list"].includes(option.type) && option.values.length > 0 ? (
              <Select
                value={selectedOptions[option.id]}
                onValueChange={(value) => setSelectedOptions((current) => ({ ...current, [option.id]: value }))}
              >
                <SelectTrigger className="h-12 w-full rounded-2xl bg-background">
                  <SelectValue placeholder={`Select ${option.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {option.values.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}

            {option.type === "text" ? (
              <Input
                value={selectedOptions[option.id] || ""}
                onChange={(event) => setSelectedOptions((current) => ({ ...current, [option.id]: event.target.value }))}
                placeholder={`Enter ${option.name.toLowerCase()}`}
                className="h-12 rounded-2xl"
              />
            ) : null}

            {option.type === "textarea" ? (
              <Textarea
                value={selectedOptions[option.id] || ""}
                onChange={(event) => setSelectedOptions((current) => ({ ...current, [option.id]: event.target.value }))}
                placeholder={`Enter ${option.name.toLowerCase()}`}
                className="min-h-28 rounded-2xl"
              />
            ) : null}
          </div>
        ))}

        <div className="grid gap-4 sm:grid-cols-[120px_minmax(0,1fr)]">
          <div className="space-y-2">
            <Label htmlFor="quantity">{copy.quantity}</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={Math.max(1, product.stock || 1)}
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value || 1)))}
              className="h-12 rounded-2xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="sr-only">{copy.addToCart}</Label>
            <Button
              className="h-12 w-full rounded-2xl text-base font-semibold"
              disabled={!hasStock}
              onClick={() => addItem({ ...product, quantity, options: optionList })}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {hasStock ? copy.addToCart : copy.unavailable}
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-black tracking-tight">{copy.yourDetails}</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">{copy.fullName}</Label>
            <Input id="full-name" placeholder={copy.fullNamePlaceholder} className="h-12 rounded-2xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wilaya">{copy.wilaya}</Label>
            <Select value={selectedWilayaId} onValueChange={setSelectedWilayaId}>
              <SelectTrigger id="wilaya" className="h-12 w-full rounded-2xl bg-background">
                <SelectValue placeholder={copy.wilayaPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {wilayas.map((wilaya) => (
                  <SelectItem key={wilaya.id} value={String(wilaya.id)}>
                    {wilaya.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="commune">{copy.commune}</Label>
            <Select value={selectedCommuneId} onValueChange={setSelectedCommuneId}>
              <SelectTrigger id="commune" className="h-12 w-full rounded-2xl bg-background">
                <SelectValue placeholder={copy.communePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {communeOptions.map((commune) => (
                  <SelectItem key={commune.id} value={String(commune.id)}>
                    {commune.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-black tracking-tight">{copy.orderSummary}</h3>
        <div className="space-y-3 rounded-[1.5rem] border border-border/60 bg-muted/20 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{copy.subtotal}</span>
            <span className="font-semibold">{formatMoney(subtotal, currency || "DZD")}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{copy.shipment}</span>
            <span className="font-semibold">{formatMoney(shipmentFee, currency || "DZD")}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="font-semibold">{copy.total}</span>
            <span className="text-xl font-black">{formatMoney(total, currency || "DZD")}</span>
          </div>
        </div>
        <Button
          className="h-12 w-full rounded-2xl text-base font-semibold"
          disabled={!hasStock}
          onClick={() => {
            if (checkoutUrl) router.push(checkoutUrl)
          }}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          {hasStock ? copy.orderNow : copy.unavailable}
        </Button>
      </div>
    </div>
  )
}
