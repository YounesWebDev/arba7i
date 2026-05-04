"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStorefrontCart } from "@/components/storefront/cart-provider"

type AddToCartButtonProps = {
  product: {
    id: string
    slug: string
    name: string
    price: number
    image?: string | null
  }
  label: string
  className?: string
  size?: "sm" | "default"
}

export function AddToCartButton({ product, label, className, size = "sm" }: AddToCartButtonProps) {
  const { addItem } = useStorefrontCart()

  return (
    <Button
      size={size}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        addItem(product)
      }}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}
