// --- components/public/language-switcher.tsx ---
"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n-config";

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

  // Find the active tab based on the URL, not useState
  const activeIndex = locales.findIndex(({ code }) => code === lang);
  const safeIndex = activeIndex === -1 ? 0 : activeIndex; // Fallback to AR

  // The function that changes the website language
  const handleLanguageSwitch = (newLang: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  };

  // The thumb should follow visual option order, which is already AR, EN, FR.
  const slideValue = safeIndex * 100;

  return (
    <div
      className={`relative isolate rounded-full border border-border/40 bg-muted/85 p-1 shadow-inner backdrop-blur-sm ${
        mobileVisible ? "grid grid-cols-3" : "hidden sm:grid sm:grid-cols-3"
      } ${className}`.trim()}
      role="radiogroup"
      aria-label="Language"
      dir="ltr"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-background shadow-md ring-1 ring-border/30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform"
        style={{ transform: `translateX(${slideValue}%)` }}
      />

      {locales.map(({ code, label }) => {
        const isActive = lang === code;

        return (
          <label
            key={code}
            className={`relative z-10 cursor-pointer rounded-full px-3 py-1.5 text-center text-xs transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95 ${
              isActive
                ? "scale-[1.02] font-bold text-primary"
                : "font-semibold text-muted-foreground hover:text-foreground"
            }`}
          >
            <input
              type="radio"
              name="language"
              value={code}
              checked={isActive}
              onChange={() => handleLanguageSwitch(code)}
              className="sr-only"
            />
            <span
              className={`inline-block transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-px opacity-80"
              }`}
            >
              {label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
