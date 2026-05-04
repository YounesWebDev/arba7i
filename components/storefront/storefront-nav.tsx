"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type StorefrontNavProps = {
  lang: string
  storeSlug: string
  storeName: string
  isRtl: boolean
  categories: Array<{ id: string; name: string; slug: string }>
  copy: {
    shop: string
    search: string
    categories: string
    browse: string
    shopHome: string
    searchCatalog: string
  }
}

function navLinkClass(active: boolean) {
  return active
    ? "rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
    : "rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
}

export function StorefrontNav({
  lang,
  storeSlug,
  storeName,
  isRtl,
  categories,
  copy,
}: StorefrontNavProps) {
  const pathname = usePathname()
  const homeHref = `/${lang}/${storeSlug}`
  const searchHref = `/${lang}/${storeSlug}/search`
  const categoriesHref =
    categories.length > 0 ? `/${lang}/${storeSlug}/category/${categories[0].slug}` : `${homeHref}#store-categories`

  const isHome = pathname === homeHref
  const isSearch = pathname === searchHref
  const isCategory = pathname.startsWith(`${homeHref}/category/`)

  return (
    <>
      <nav className="hidden items-center gap-2 lg:flex">
        <Link href={homeHref} className={navLinkClass(isHome)}>
          {copy.shop}
        </Link>
        <Link href={searchHref} className={navLinkClass(isSearch)}>
          {copy.search}
        </Link>
        <Link href={categoriesHref} className={navLinkClass(isCategory)}>
          {copy.categories}
        </Link>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="rounded-full lg:hidden">
            <Menu className="mr-2 h-4 w-4" />
            {copy.browse}
          </Button>
        </SheetTrigger>
        <SheetContent side={isRtl ? "left" : "right"}>
          <SheetHeader>
            <SheetTitle>{storeName}</SheetTitle>
            <SheetDescription>Navigate the storefront on smaller screens.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-3 px-4 pb-4">
            <Link
              href={homeHref}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                isHome ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:border-primary/30"
              }`}
            >
              {copy.shopHome}
            </Link>
            <Link
              href={searchHref}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                isSearch ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:border-primary/30"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Search className="h-4 w-4" />
                {copy.searchCatalog}
              </span>
            </Link>
            {categories.map((category) => {
              const href = `/${lang}/${storeSlug}/category/${category.slug}`
              const isActive = pathname === href

              return (
                <Link
                  key={category.id}
                  href={href}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:border-primary/30"
                  }`}
                >
                  {category.name}
                </Link>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
