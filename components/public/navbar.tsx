// --- components/public/navbar.tsx ---
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BadgeDollarSign,
  CircleHelp,
  Menu,
  Sparkles,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/public/language-switcher";

type NavbarDict = {
  navbar?: Record<string, string | undefined>;
};

export function PublicNavbar({ lang, dict }: { lang: string; dict: NavbarDict }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { title: dict?.navbar?.features || "Features", href: "/features", icon: Sparkles },
    { title: dict?.navbar?.pricing || "Pricing", href: "/pricing", icon: BadgeDollarSign },
    { title: dict?.navbar?.about || "About", href: "/about", icon: CircleHelp },
    { title: dict?.navbar?.contact || "Contact", href: "/contact", icon: UserRound },
  ] as const;

  return (
    <nav className="fixed top-0 z-[100] w-full border-b border-border/40 bg-background/80 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-4 sm:h-20 sm:px-6 md:px-12">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            href={`/${lang}`}
            className="flex flex-col items-center justify-center text-xl font-bold tracking-tighter sm:text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            <Wallet className="h-4 w-4 text-primary" />
            <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-sm font-bold text-transparent">
              Arba7i
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item, index) => {
              const href = `/${lang}${item.href}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={`desktop-nav-${index}`}
                  href={href}
                  className={`group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold tracking-tight transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 transition-all duration-300 ${
                      isActive
                        ? "text-primary"
                        : "group-hover:-translate-y-0.5 group-hover:text-primary"
                    }`}
                  />
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} />

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card text-foreground transition-all hover:border-primary/30 hover:text-primary md:hidden"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href={`/${lang}/login`}
              className="px-4 py-2 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground"
            >
              {dict?.navbar?.login || "Login"}
            </Link>
            <Link
              href={`/${lang}/register`}
              className="scale-95 rounded-full bg-gradient-to-br from-primary to-primary/80 px-6 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-90"
            >
              {dict?.navbar?.getStarted || "Get Started"}
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-border/30 bg-background/95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-6 px-4 py-5 sm:px-6">
          <div className="grid gap-2">
            {navItems.map((item, index) => {
              const href = `/${lang}${item.href}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={`mobile-nav-${index}`}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "border border-primary/20 bg-primary/10 text-primary"
                      : "border border-transparent bg-card/60 text-foreground hover:border-primary/20 hover:bg-card"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isActive
                          ? "text-primary"
                          : "text-primary group-hover:-translate-y-0.5"
                      }`}
                    />
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="rounded-2xl border border-border/40 bg-card/70 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Language
            </p>
            <LanguageSwitcher lang={lang} mobileVisible className="w-full" />
          </div>

          <div className="grid gap-3">
            <Link
              href={`/${lang}/login`}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl border border-border px-4 py-3 text-center text-sm font-semibold text-foreground transition-all hover:bg-muted"
            >
              {dict?.navbar?.login || "Login"}
            </Link>
            <Link
              href={`/${lang}/register`}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-4 py-3 text-center text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              {dict?.navbar?.getStarted || "Get Started"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
