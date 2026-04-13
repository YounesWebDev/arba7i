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
import { PublicThemeToggle } from "@/components/public/public-theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavbarDict = {
  navbar?: Record<string, string | undefined>;
};

type PublicNavbarProps = {
  lang: string;
  dict: NavbarDict;
  activeHref?: "/" | "/features" | "/pricing" | "/about" | "/contact" | "/help" | "/privacy" | "/terms";
};

function isActive(activeHref: PublicNavbarProps["activeHref"], href: string) {
  return activeHref === href;
}

export function PublicNavbar({ lang, dict, activeHref }: PublicNavbarProps) {
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
          <a
            href={`/${lang}`}
            aria-current={activeHref === "/" ? "page" : undefined}
            className={cn(
              "flex flex-col items-center justify-center rounded-2xl px-2 py-1 text-xl font-bold tracking-tighter transition-colors sm:text-2xl",
              activeHref === "/" ? "bg-primary/8" : "hover:bg-card"
            )}
          >
            <Wallet className="h-4 w-4 text-primary" />
            <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-sm font-bold text-transparent">
              Arba7i
            </span>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            {navItems.map((item, index) => {
              const active = isActive(activeHref, item.href);

              return (
                <a
                  key={`desktop-nav-${index}`}
                  href={`/${lang}${item.href}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold tracking-tight transition-all duration-300",
                    active
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-all duration-300",
                      active
                        ? "text-primary"
                        : "group-hover:-translate-y-0.5 group-hover:text-primary"
                    )}
                  />
                  <span className={cn("transition-transform duration-300", !active && "group-hover:translate-x-0.5")}>
                    {item.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} />
          <PublicThemeToggle />

          <details className="group static lg:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-border/50 bg-card touch-manipulation transition-colors hover:border-primary/30 hover:text-primary">
              <Menu className="h-5 w-5 group-open:hidden" />
              <X className="hidden h-5 w-5 group-open:block" />
              <span className="sr-only">Toggle menu</span>
            </summary>

            <div className="fixed inset-x-4 top-[calc(theme(spacing.18)+0.75rem)] z-20 mx-auto w-auto max-w-sm overflow-hidden rounded-[2rem] border border-border/40 bg-background/95 opacity-0 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none translate-y-2 group-open:pointer-events-auto group-open:translate-y-0 group-open:opacity-100 sm:inset-x-6 sm:top-[calc(theme(spacing.20)+0.75rem)]">
              <div className="space-y-6 px-4 py-5 sm:px-6">
                <div className="grid gap-2">
                  {navItems.map((item, index) => {
                    const active = isActive(activeHref, item.href);

                    return (
                      <a
                        key={`mobile-nav-${index}`}
                        href={`/${lang}${item.href}`}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-all",
                          active
                            ? "border-primary/25 bg-primary/10 text-primary"
                            : "border-transparent bg-card/60 text-foreground hover:border-primary/20 hover:bg-card"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon
                            className={cn(
                              "h-4 w-4 transition-transform duration-300",
                              active ? "text-primary" : "text-primary group-hover:-translate-y-0.5"
                            )}
                          />
                          {item.title}
                        </span>
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full transition-all",
                            active ? "bg-primary shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" : "bg-transparent"
                          )}
                        />
                      </a>
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
                  <a
                    href={`/${lang}/login`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-12 rounded-2xl border-border text-sm font-semibold"
                    )}
                  >
                    {dict?.navbar?.login || "Login"}
                  </a>
                  <a
                    href={`/${lang}/register`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
                    )}
                  >
                    {dict?.navbar?.getStarted || "Get Started"}
                  </a>
                </div>
              </div>
            </div>
          </details>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`/${lang}/login`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "px-4 text-sm font-semibold text-muted-foreground hover:text-foreground"
              )}
            >
              {dict?.navbar?.login || "Login"}
            </a>
            <a
              href={`/${lang}/register`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "scale-95 rounded-full bg-gradient-to-br from-primary to-primary/80 px-6 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-90"
              )}
            >
              {dict?.navbar?.getStarted || "Get Started"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
