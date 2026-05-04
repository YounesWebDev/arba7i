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

function applyTheme(theme: ThemeName): ResolvedTheme {
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
    // Ignore storage failures.
  }

  try {
    document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; samesite=lax`
  } catch {
    // Ignore cookie failures.
  }
}

function getStoredTheme(): ThemeName {
  if (typeof window === "undefined") return "system"

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored
    }
  } catch {}

  try {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`))
      ?.split("=")[1]

    if (cookieValue === "light" || cookieValue === "dark" || cookieValue === "system") {
      return cookieValue
    }
  } catch {}

  return "system"
}

function getInitialThemeState(): { theme: ThemeName; resolvedTheme: ResolvedTheme } {
  if (typeof window === "undefined") {
    return { theme: "system", resolvedTheme: "light" }
  }

  const theme = getStoredTheme()

  let resolvedTheme: ResolvedTheme = "light"
  try {
    resolvedTheme =
      theme === "system"
        ? getSystemTheme()
        : theme
  } catch {
    resolvedTheme = "light"
  }

  return { theme, resolvedTheme }
}

export const themeInitScript = `
(function () {
  try {
    var STORAGE_KEY = "theme";
    var COOKIE_NAME = "theme";

    var theme = "system";

    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark" || stored === "system") {
        theme = stored;
      }
    } catch {}

    if (theme === "system") {
      try {
        var cookieValue = document.cookie
          .split("; ")
          .find(function (row) { return row.startsWith(COOKIE_NAME + "="); })
          ?.split("=")[1];

        if (cookieValue === "light" || cookieValue === "dark" || cookieValue === "system") {
          theme = cookieValue;
        }
      } catch {}
    }

    var resolvedTheme =
      theme === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : theme;

    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch {}
})();
`

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const initialState = React.useMemo(() => getInitialThemeState(), [])
  const [theme, setThemeState] = React.useState<ThemeName>(initialState.theme)
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(initialState.resolvedTheme)

  React.useEffect(() => {
    const currentTheme = getStoredTheme()
    setThemeState(currentTheme)
    setResolvedTheme(applyTheme(currentTheme))
  }, [])

  React.useEffect(() => {
    let mediaQuery: MediaQueryList

    try {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    } catch {
      return
    }

    const syncSystemTheme = () => {
      if (theme === "system") {
        setResolvedTheme(applyTheme("system"))
      }
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
