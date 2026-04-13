"use client"

import * as React from "react"

type ThemeName = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

type ThemeContextValue = {
  theme: ThemeName
  resolvedTheme: ResolvedTheme
  setTheme: (theme: ThemeName) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "theme"
const COOKIE_NAME = "theme"

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light"
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  } catch {
    return "light"
  }
}

function applyTheme(theme: ThemeName) {
  const root = document.documentElement
  const resolvedTheme = theme === "system" ? getSystemTheme() : theme

  root.classList.toggle("dark", resolvedTheme === "dark")
  root.style.colorScheme = resolvedTheme

  return resolvedTheme
}

function persistTheme(theme: ThemeName) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Ignore storage failures on restricted browsers.
  }

  try {
    document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; samesite=lax`
  } catch {
    // Ignore cookie failures and keep the in-memory theme state working.
  }
}

function getInitialThemeState(): { theme: ThemeName; resolvedTheme: ResolvedTheme } {
  if (typeof window === "undefined") {
    return { theme: "system", resolvedTheme: "light" }
  }

  let storedTheme: ThemeName = "system"
  let domResolvedTheme: ResolvedTheme = "light"

  try {
    storedTheme = (window.localStorage.getItem(STORAGE_KEY) as ThemeName | null) ?? "system"
  } catch {
    storedTheme = "system"
  }

  try {
    domResolvedTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
  } catch {
    domResolvedTheme = "light"
  }

  return {
    theme: storedTheme,
    resolvedTheme: storedTheme === "system" ? domResolvedTheme : storedTheme,
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeName>(() => getInitialThemeState().theme)
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(() => getInitialThemeState().resolvedTheme)

  React.useLayoutEffect(() => {
    const initialState = getInitialThemeState()
    persistTheme(initialState.theme)
    setThemeState(initialState.theme)
    setResolvedTheme(applyTheme(initialState.theme))
  }, [])

  React.useEffect(() => {
    let mediaQuery: MediaQueryList

    try {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    } catch {
      return
    }

    const syncSystemTheme = () => {
      setResolvedTheme((currentResolvedTheme) => {
        if (theme !== "system") return currentResolvedTheme
        return applyTheme("system")
      })
    }

    mediaQuery.addEventListener("change", syncSystemTheme)
    return () => mediaQuery.removeEventListener("change", syncSystemTheme)
  }, [theme])

  const setTheme = React.useCallback((nextTheme: ThemeName) => {
    persistTheme(nextTheme)
    setThemeState(nextTheme)
    setResolvedTheme(applyTheme(nextTheme))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
