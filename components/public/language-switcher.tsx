// --- components/public/language-switcher.tsx ---
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useMemo } from "react";
import type { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";

const locales: Array<{ code: Locale; label: string }> = [
  { code: "ar", label: "AR" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

type LanguageSwitcherProps = {
  lang?: string; // Now catches the lang from the URL
  defaultLocale?: Locale;
  className?: string;
  mobileVisible?: boolean;
};

export function LanguageSwitcher({
  lang = "ar", // Default to ar if not provided
  className = "",
  mobileVisible = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const getLocalizedPath = useMemo(
    () => (targetLang: string) => {
      const segments = (pathname ?? "/").split("/").filter(Boolean);
      const hasLocalePrefix = locales.some(({ code }) => code === segments[0]);
      const nextSegments = hasLocalePrefix
        ? [targetLang, ...segments.slice(1)]
        : [targetLang, ...segments];

      return `/${nextSegments.join("/")}${search ? `?${search}` : ""}`;
    },
    [pathname, search]
  );

  // Find the active tab based on the URL, not useState
  const activeIndex = locales.findIndex(({ code }) => code === lang);
  const safeIndex = activeIndex === -1 ? 0 : activeIndex; // Fallback to AR

  useEffect(() => {
    locales
      .filter(({ code }) => code !== lang)
      .forEach(({ code }) => {
        router.prefetch(getLocalizedPath(code));
      });
  }, [getLocalizedPath, lang, router]);

  // The function that changes the website language
  const handleLanguageSwitch = (newLang: string) => {
    if (!pathname || newLang === lang) return;

    const nextPath = getLocalizedPath(newLang);

    startTransition(() => {
      router.replace(nextPath);
    });
  };

  // The thumb should follow visual option order, which is already AR, EN, FR.
  const slideValue = safeIndex * 100;

  return (
    <div
      className={`relative isolate rounded-full border border-border/60 bg-background/80 p-1 shadow-sm backdrop-blur-sm ${
        mobileVisible ? "grid grid-cols-3" : "hidden sm:grid sm:grid-cols-3"
      } ${className}`.trim()}
      role="group"
      aria-label="Language"
      dir="ltr"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-primary shadow-sm ring-1 ring-primary/20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform"
        style={{ transform: `translateX(${slideValue}%)` }}
      />

      {locales.map(({ code, label }) => {
        const isActive = lang === code;

        return (
          <button
            type="button"
            key={code}
            onClick={() => handleLanguageSwitch(code)}
            className={cn(
              "relative z-10 rounded-full px-3 py-1.5 text-center text-xs transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95",
              isActive
                ? "scale-[1.02] font-bold text-primary-foreground"
                : "font-semibold text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={isActive}
            aria-label={`Switch language to ${label}`}
          >
            <span
              className={`inline-block transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-px opacity-80"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
