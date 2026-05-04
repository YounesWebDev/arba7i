"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStorefrontCart, getItemKey } from "@/components/storefront/cart-provider"
import Image from 'next/image';

function formatMoney(value: number, currency = "DZD") {
  return `${Math.round(value || 0).toLocaleString()} ${currency}`
}

type CartPanelCopy = {
  title: string
  empty: string
  emptyBody: string
  total: string
  quantity: string
  remove: string
  close: string
  continueShopping: string
}

export function StorefrontCartPanel({
  currency,
  copy,
}: {
  currency?: string | null
  copy: CartPanelCopy
}) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useStorefrontCart()

  return (
    <div
      className={`fixed right-4 top-24 z-50 w-[min(100%-2rem,420px)] rounded-[1.75rem] border border-border/60 bg-background shadow-2xl transition-all duration-200 ${
        isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
        <h3 className="text-lg font-black tracking-tight">{copy.title}</h3>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={closeCart}>
          <X className="h-4 w-4" />
          <span className="sr-only">{copy.close}</span>
        </Button>
      </div>

      <div className="max-h-[60vh] space-y-4 overflow-y-auto p-5">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 p-6 text-center">
            <p className="font-semibold">{copy.empty}</p>
            <p className="mt-2 text-sm text-muted-foreground">{copy.emptyBody}</p>
          </div>
        ) : (
          items.map((item) => {
            const key = getItemKey(item)

            const imageSrc = item.image || '/fallback-image.png'; // Provide a fallback image

            return (
              <div key={key} className="rounded-2xl border border-border/60 bg-card p-4">
                <div className="flex gap-3">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-muted">
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width={500} // Adjust width and height as needed
                      height={500}
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="line-clamp-2 font-semibold">{item.name}</p>
                    {item.options?.length ? (
                      <p className="text-xs text-muted-foreground">
                        {item.options.map((option) => `${option.name}: ${option.value}`).join(" • ")}
                      </p>
                    ) : null}
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-20">
                        <Input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(event) => updateQuantity(key, Number(event.target.value || 1))}
                          className="h-9 rounded-xl"
                          aria-label={copy.quantity}
                        />
                      </div>
                      <span className="text-sm font-bold">{formatMoney(item.price * item.quantity, currency || "DZD")}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button variant="link" className="h-auto p-0 text-xs font-bold uppercase tracking-[0.18em]" onClick={() => removeItem(key)}>
                    {copy.remove}
                  </Button>
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="border-t border-border/50 px-5 py-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground">{copy.total}</span>
          <span className="text-xl font-black">{formatMoney(total, currency || "DZD")}</span>
        </div>
        <Button className="w-full rounded-full" onClick={closeCart}>
          {copy.continueShopping}
        </Button>
      </div>
    </div>
  )
}
