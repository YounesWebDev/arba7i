import * as React from "react"

import { cn } from "@/lib/utils"

function Carousel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="carousel" className={cn("relative", className)} {...props} />
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="carousel-content"
      className={cn(
        "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      {...props}
    />
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="carousel-item" className={cn("min-w-0 shrink-0 snap-start", className)} {...props} />
}

export { Carousel, CarouselContent, CarouselItem }
