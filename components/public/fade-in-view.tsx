import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react"
import { cn } from "@/lib/utils"

type FadeInViewProps<T extends ElementType = "div"> = {
  as?: T
  children: ReactNode
  className?: string
  delay?: number
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">

export function FadeInView<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 800,
  ...rest
}: FadeInViewProps<T>) {
  const Tag = (as ?? "div") as ElementType

  return (
    <Tag
      className={cn("fade-in-view-ready", className)}
      style={{ "--fade-delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}
