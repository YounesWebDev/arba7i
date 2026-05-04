"use client"

import * as React from "react"

export type CartOption = {
  name: string
  value: string
}

export type CartItem = {
  id: string
  slug: string
  name: string
  price: number
  image?: string | null
  quantity: number
  options?: CartOption[]
}

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  total: number
  count: number
}

const STORAGE_KEY = "storefront-cart"
const CartContext = React.createContext<CartContextValue | null>(null)

function getItemKey(item: Pick<CartItem, "id" | "options">) {
  const optionKey = (item.options || []).map((option) => `${option.name}:${option.value}`).join("|")
  return `${item.id}::${optionKey}`
}

export function StorefrontCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([])
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) return
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setItems(parsed)
      }
    } catch {}
  }, [])

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = React.useCallback((incoming: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((current) => {
      const nextQuantity = Math.max(1, incoming.quantity ?? 1)
      const incomingKey = getItemKey({ id: incoming.id, options: incoming.options })
      const existingIndex = current.findIndex((item) => getItemKey(item) === incomingKey)

      if (existingIndex >= 0) {
        return current.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + nextQuantity } : item
        )
      }

      return [...current, { ...incoming, quantity: nextQuantity }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = React.useCallback((key: string) => {
    setItems((current) => current.filter((item) => getItemKey(item) !== key))
  }, [])

  const updateQuantity = React.useCallback((key: string, quantity: number) => {
    setItems((current) =>
      current.map((item) => (getItemKey(item) === key ? { ...item, quantity: Math.max(1, quantity) } : item))
    )
  }, [])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = React.useMemo(
    () => ({
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((open) => !open),
      addItem,
      removeItem,
      updateQuantity,
      total,
      count,
    }),
    [addItem, count, isOpen, items, removeItem, total, updateQuantity]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useStorefrontCart() {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error("useStorefrontCart must be used within StorefrontCartProvider")
  }
  return context
}

export { getItemKey }
