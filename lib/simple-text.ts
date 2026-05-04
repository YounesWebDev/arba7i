const SUPPORTED_LOCALES = ["ar", "en", "fr"] as const

function isAsciiLetter(char: string) {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z")
}

function isDigit(char: string) {
  return char >= "0" && char <= "9"
}

function isCombiningMark(char: string) {
  const code = char.charCodeAt(0)
  return code >= 0x0300 && code <= 0x036f
}

export function getLocaleFromPath(pathname: string) {
  const segments = pathname.split("/")
  const locale = segments[1]

  if (locale && SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number])) {
    return locale
  }

  return null
}

export function isLocalizedPath(pathname: string) {
  return getLocaleFromPath(pathname) !== null
}

export function removeLeadingLocale(pathname: string, locale: string) {
  const localePrefix = `/${locale}`

  if (!pathname.startsWith(localePrefix)) {
    return pathname || "/"
  }

  const remainingPath = pathname.slice(localePrefix.length)
  return remainingPath || "/"
}

export function trimTrailingSlashes(value: string) {
  let end = value.length

  // Walk backward so we only remove the slashes at the very end.
  while (end > 0 && value[end - 1] === "/") {
    end -= 1
  }

  return value.slice(0, end)
}

export function isUsernameAllowed(value: string) {
  if (value.length === 0) {
    return false
  }

  // Allow only letters, numbers, and underscores to match the old rule exactly.
  for (const char of value) {
    if (isAsciiLetter(char) || isDigit(char) || char === "_") {
      continue
    }

    return false
  }

  return true
}

export function isPhoneLike(value: string) {
  if (value.length === 0) {
    return false
  }

  // Match the previous behavior: an optional leading +, then only digits or spaces.
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index]

    if (char === "+" && index === 0) {
      continue
    }

    if (isDigit(char) || char === " ") {
      continue
    }

    return false
  }

  return true
}

export function buildSimpleSlug(value: string, fallback: string) {
  const normalizedValue = value.normalize("NFKD").toLowerCase().trim()
  let slug = ""
  let previousWasDash = false

  // Build the slug one character at a time so each rule is easy to follow.
  for (const char of normalizedValue) {
    if (isCombiningMark(char)) {
      continue
    }

    if (isAsciiLetter(char) || isDigit(char)) {
      slug += char
      previousWasDash = false
      continue
    }

    if ((char === " " || char === "_" || char === "-") && slug.length > 0 && !previousWasDash) {
      slug += "-"
      previousWasDash = true
    }
  }

  if (slug.endsWith("-")) {
    slug = slug.slice(0, -1)
  }

  return slug || fallback
}

export function escapeCsvValue(value: string | number) {
  const stringValue = String(value)

  if (
    !stringValue.includes(",") &&
    !stringValue.includes('"') &&
    !stringValue.includes("\n")
  ) {
    return stringValue
  }

  // CSV escapes quotes by doubling them before wrapping the field in quotes.
  return `"${stringValue.replaceAll('"', '""')}"`
}
