"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    ready: Promise<void>
    finished: Promise<void>
  }
}

type ThemeName = "light" | "dark" | "system"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const changeTheme = React.useCallback(
    (theme: ThemeName) => {
      const root = document.documentElement
      const button = triggerRef.current
      const transitionDocument = document as ViewTransitionDocument
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (!button || !transitionDocument.startViewTransition || prefersReducedMotion) {
        setTheme(theme)
        return
      }

      const { left, top, width, height } = button.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      root.style.setProperty("--theme-toggle-x", `${x}px`)
      root.style.setProperty("--theme-toggle-y", `${y}px`)
      root.style.setProperty("--theme-toggle-radius", `${radius}px`)

      const transition = transitionDocument.startViewTransition(() => {
        flushSync(() => {
          setTheme(theme)
        })
      })

      transition.ready.then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0 at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        )
      })
    },
    [setTheme]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={triggerRef}
          variant="ghost"
          size="icon"
          className="touch-manipulation rounded-full border border-border/60 bg-background/80 shadow-sm backdrop-blur-sm"
        >
          <Sun className="h-[1.05rem] w-[1.05rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.05rem] w-[1.05rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="z-[140] w-36">
        <DropdownMenuItem
          disabled={!mounted}
          className="touch-manipulation"
          onClick={() => changeTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!mounted}
          className="touch-manipulation"
          onClick={() => changeTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!mounted}
          className="touch-manipulation"
          onClick={() => changeTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
