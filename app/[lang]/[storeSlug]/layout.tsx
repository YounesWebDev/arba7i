import { notFound } from "next/navigation"
import Link from "next/link"
import { desc, eq } from "drizzle-orm"
import { db } from "@/db"
import { categories, stores } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StorefrontNav } from "@/components/storefront/storefront-nav"
import { StorefrontCartPanel } from "@/components/storefront/cart-panel"
import { StorefrontCartProvider } from "@/components/storefront/cart-provider"
import { StorefrontCartToggle } from "@/components/storefront/cart-toggle"
import { ForceLightMode } from "@/components/storefront/force-light-mode"
import { LanguageSwitcher } from "@/components/public/language-switcher"
import { Search, Globe, Mail, ShieldCheck, CircleX } from "lucide-react"
import { getStorefrontDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"

export default async function StorefrontLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string; storeSlug: string }>
}) {
  const { lang, storeSlug } = await params
  const [store] = await db.select().from(stores).where(eq(stores.slug, storeSlug)).limit(1)

  if (!store) notFound()

  if (!store.isActive) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 text-center">
        <Card className="w-full max-w-xl border-border/60 bg-card shadow-sm">
          <CardContent className="space-y-5 p-8 sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <CircleX className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-foreground">Store unavailable</h1>
              <p className="text-sm text-muted-foreground">
                This storefront is inactive right now. Products, banners, search, and checkout are hidden until the seller reactivates it.
              </p>
            </div>
            <Button className="rounded-full" asChild>
              <Link href={`/${lang}`}>Back to Arba7i</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const storeCategories = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .where(eq(categories.storeId, store.id))
    .orderBy(desc(categories.createdAt))
    .limit(6)

  const isRtl = lang === "ar"
  const dict = await getStorefrontDictionary(lang as Locale)
  const copy = dict.storefront

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      <StorefrontCartProvider>
        <ForceLightMode />
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 shadow-sm backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3 sm:gap-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-black uppercase text-primary">
                  {store.name.slice(0, 2)}
                </div>
                <Link href={`/${lang}/${store.slug}`} className="truncate text-xl font-black tracking-tighter text-primary sm:text-2xl">
                  {store.name}
                </Link>
                <StorefrontNav
                  lang={lang}
                  storeSlug={store.slug}
                  storeName={store.name}
                  isRtl={isRtl}
                  categories={storeCategories}
                  copy={copy.nav}
                />
              </div>

              <div className="flex items-center gap-2">
                <LanguageSwitcher lang={lang as Locale} mobileVisible className="w-[9.5rem] sm:hidden" />
                <LanguageSwitcher lang={lang as Locale} className="hidden w-[9.5rem] sm:grid" />
                <StorefrontCartToggle label={copy.cart.cart} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <form action={`/${lang}/${store.slug}/search`} className="relative group flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  name="q"
                  type="text"
                  placeholder={copy.search.placeholder}
                  className="h-11 rounded-full border-none bg-muted pl-10 focus-visible:ring-primary/40"
                />
              </form>
            </div>
          </div>
        </header>

        <StorefrontCartPanel currency={store.currency} copy={copy.cart} />

        <main className="mx-auto flex-1 w-full max-w-[1440px]">{children}</main>

        <footer className="mt-16 w-full rounded-t-[2.5rem] border-t border-border/50 bg-muted/50 text-sm sm:mt-20 sm:rounded-t-[3rem]">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-10 sm:px-6 sm:py-16 md:flex-row md:items-start md:justify-between md:gap-12">
            <div className="max-w-xs">
              <span className="mb-4 block text-xl font-black text-foreground">{store.name}</span>
              <p className="mb-6 leading-relaxed text-muted-foreground">{copy.footer.description}</p>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="rounded-full bg-background" asChild>
                  <Link href={`/${lang}/${store.slug}/search`} aria-label={copy.footer.search}>
                    <Globe className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-background" asChild>
                  <Link href={`/${lang}/contact`} aria-label={copy.footer.contact}>
                    <Mail className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 md:justify-end">
              <div>
                <h5 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">{copy.footer.shop}</h5>
                <ul className="space-y-4 text-muted-foreground">
                  <li><Link href={`/${lang}/${store.slug}#featured-products`} className="transition-colors hover:text-primary">{copy.footer.featured}</Link></li>
                  <li><Link href={`/${lang}/${store.slug}#catalog-products`} className="transition-colors hover:text-primary">{copy.footer.catalog}</Link></li>
                  <li><Link href={`/${lang}/${store.slug}/search`} className="transition-colors hover:text-primary">{copy.footer.search}</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">{copy.footer.support}</h5>
                <ul className="space-y-4 text-muted-foreground">
                  <li><Link href={`/${lang}/contact`} className="transition-colors hover:text-primary">{copy.footer.contact}</Link></li>
                  <li><Link href={`/${lang}/help`} className="transition-colors hover:text-primary">{copy.footer.help}</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-border/50 px-4 py-6 text-xs text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between md:py-8">
            <p>&copy; {new Date().getFullYear()} {store.name}. {copy.footer.rights}</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>{copy.footer.certified}</span>
            </div>
          </div>
        </footer>
      </StorefrontCartProvider>
    </div>
  )
}
