"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStorefrontCart } from "@/components/storefront/cart-provider"

export function StorefrontCartToggle({ label }: { label: string }) {
  const { toggleCart, count } = useStorefrontCart()

  return (
    <Button variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:bg-muted hover:text-foreground" onClick={toggleCart}>
      <ShoppingCart className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
          {count}
        </span>
      ) : null}
      <span className="sr-only">{label}</span>
    </Button>
  )
}
