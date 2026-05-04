"use client"

import * as React from "react"

function resolvePreferredTheme(): "light" | "dark" {
  try {
    const stored = window.localStorage.getItem("theme")
    if (stored === "light" || stored === "dark") return stored
    if (stored === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
  } catch {}

  try {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="))
      ?.split("=")[1]

    if (cookieValue === "light" || cookieValue === "dark") return cookieValue
    if (cookieValue === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
  } catch {}

  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  } catch {
    return "light"
  }
}

export function ForceLightMode() {
  React.useEffect(() => {
    const root = document.documentElement
    const previousClass = root.classList.contains("dark")
    const previousColorScheme = root.style.colorScheme

    root.classList.remove("dark")
    root.style.colorScheme = "light"

    return () => {
      const preferredTheme = resolvePreferredTheme()
      root.classList.toggle("dark", preferredTheme === "dark")
      root.style.colorScheme = previousColorScheme || preferredTheme
      if (!previousColorScheme && preferredTheme === "light") {
        root.style.colorScheme = "light"
      }
      if (!previousColorScheme && preferredTheme === "dark") {
        root.style.colorScheme = "dark"
      }
      if (!previousClass && preferredTheme === "light") {
        root.classList.remove("dark")
      }
    }
  }, [])

  return null
}
