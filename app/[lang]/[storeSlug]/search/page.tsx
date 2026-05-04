import Link from "next/link"
import { notFound } from "next/navigation"
import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm"
import { ChevronDown, ImageIcon, Search, SearchX } from "lucide-react"
import { db } from "@/db"
import { categories, productImages, products, stores } from "@/db/schema"
import { AddToCartButton } from "@/components/storefront/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getStorefrontDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import Image from 'next/image';

const PAGE_SIZE = 12

function formatMoney(value: string | number, currency = "DZD") {
  return `${Math.round(Number(value || 0)).toLocaleString()} ${currency}`
}

function getValidPage(value?: string) {
  const parsed = Number.parseInt(value || "1", 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function getSortConfig(sort?: string) {
  switch (sort) {
    case "price-asc":
      return { key: "price-asc", label: "Price: Low to High", orderBy: asc(products.price) }
    case "price-desc":
      return { key: "price-desc", label: "Price: High to Low", orderBy: desc(products.price) }
    case "newest":
      return { key: "newest", label: "Newest arrivals", orderBy: desc(products.createdAt) }
    default:
      return { key: "relevance", label: "Relevance", orderBy: desc(products.createdAt) }
  }
}

function buildSearchHref(
  lang: string,
  storeSlug: string,
  options: { q?: string; sort?: string; page?: number } = {}
) {
  const params = new URLSearchParams()

  if (options.q?.trim()) params.set("q", options.q.trim())
  if (options.sort && options.sort !== "relevance") params.set("sort", options.sort)
  if (options.page && options.page > 1) params.set("page", String(options.page))

  const queryString = params.toString()
  return queryString ? `/${lang}/${storeSlug}/search?${queryString}` : `/${lang}/${storeSlug}/search`
}

function buildPageWindow(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1])
  return Array.from(pages).filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b)
}

export default async function SearchResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; storeSlug: string }>
  searchParams: Promise<{ q?: string; sort?: string; page?: string }>
}) {
  const { lang, storeSlug } = await params
  const resolvedSearchParams = await searchParams
  const dict = await getStorefrontDictionary(lang as Locale)
  const copy = dict.storefront.searchPage
  const q = resolvedSearchParams.q?.trim() || ""
  const page = getValidPage(resolvedSearchParams.page)
  const sortConfig = getSortConfig(resolvedSearchParams.sort)

  const [store] = await db
    .select({
      id: stores.id,
      name: stores.name,
      slug: stores.slug,
      currency: stores.currency,
      isActive: stores.isActive,
    })
    .from(stores)
    .where(eq(stores.slug, storeSlug))
    .limit(1)

  if (!store || !store.isActive) notFound()

  const filters = q
    ? and(
        eq(products.storeId, store.id),
        eq(products.status, "active"),
        or(ilike(products.name, `%${q}%`), ilike(products.sku, `%${q}%`))
      )
    : and(eq(products.storeId, store.id), eq(products.status, "active"))

  const [{ count }, pageItems, suggestedCategories] = await Promise.all([
    db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .where(filters)
      .then((rows) => rows[0] ?? { count: 0 }),
    db.query.products.findMany({
      where: filters,
      columns: {
        id: true,
        slug: true,
        name: true,
        description: true,
        price: true,
      },
      with: {
        category: {
          columns: {
            name: true,
          },
        },
        images: {
          columns: {
            url: true,
          },
          orderBy: [desc(productImages.isPrimary), desc(productImages.createdAt)],
          limit: 1,
        },
      },
      orderBy: sortConfig.orderBy,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    }),
    db
      .select({
        name: categories.name,
        slug: categories.slug,
      })
      .from(categories)
      .where(eq(categories.storeId, store.id))
      .orderBy(desc(categories.createdAt))
      .limit(3),
  ])

  const totalItems = Number(count || 0)
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginationPages = buildPageWindow(safePage, totalPages)
  const sortOptions = [
    { key: "relevance", label: copy.relevance },
    { key: "newest", label: copy.newest },
    { key: "price-asc", label: copy.priceLowHigh },
    { key: "price-desc", label: copy.priceHighLow },
  ]

  return (
    <div className="space-y-8 px-4 py-5 sm:space-y-10 sm:px-6 sm:py-8">
      <header className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]">
              {copy.eyebrow}
            </Badge>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              {copy.resultsFor} <span className="text-primary">&quot;{q || copy.allProducts}&quot;</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              {totalItems} {copy.productsFound} {store.name}.
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-2xl">
                {sortConfig.label}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem key={option.key} asChild>
                  <Link href={buildSearchHref(lang, store.slug, { q, sort: option.key })}>{option.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card className="border-border/60 bg-card/95">
          <CardContent className="p-4 sm:p-5">
            <form action={`/${lang}/${store.slug}/search`} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="q"
                  defaultValue={q}
                  placeholder={`Search ${store.name} products`}
                  className="h-12 rounded-full border-border/60 bg-background pl-11"
                />
              </div>
              <Button type="submit" className="h-12 rounded-full px-6">
                {dict.storefront.search.submit}
              </Button>
            </form>
          </CardContent>
        </Card>
      </header>

      {pageItems.length === 0 ? (
        <Card className="border-border/60 bg-card">
          <CardContent className="flex min-h-72 flex-col items-center justify-center gap-5 p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-primary">
              <SearchX className="h-10 w-10" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black tracking-tight">{copy.noDirectMatches}</h2>
              <p className="mx-auto max-w-md text-sm text-muted-foreground">
                {copy.noDirectMatchesBody}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestedCategories.length > 0 ? (
                suggestedCategories.map((category) => (
                  <Button key={category.slug} variant="outline" className="rounded-full" asChild>
                    <Link href={`/${lang}/${store.slug}/category/${category.slug}`}>{category.name}</Link>
                  </Button>
                ))
              ) : (
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href={`/${lang}/${store.slug}`}>{copy.backToStore}</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pageItems.map((product) => {
              const image = product.images.find((item) => item.url)?.url

              return (
                <Link href={`/${lang}/${store.slug}/products/${product.slug}`} key={product.id} className="group">
                  <Card className="flex h-full flex-col overflow-hidden border-border/60 bg-card transition-colors group-hover:border-primary/30">
                    <div className="aspect-square overflow-hidden bg-muted">
                      {image ? (
                        <Image
                          src={image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>

                    <CardContent className="flex flex-1 flex-col gap-3 p-4">
                      <div className="space-y-2">
                        {product.category ? (
                          <Badge variant="outline" className="rounded-full text-[11px]">
                            {product.category.name}
                          </Badge>
                        ) : null}
                        <h3 className="line-clamp-2 text-lg font-bold tracking-tight group-hover:text-primary">
                          {product.name}
                        </h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {product.description || copy.fallbackDescription}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                        <span className="text-xl font-black">{formatMoney(product.price, store.currency || "DZD")}</span>
                        <AddToCartButton
                          product={{ id: product.id, slug: product.slug, name: product.name, price: Number(product.price), image }}
                          label={dict.storefront.product.addToCart}
                          className="rounded-full"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {totalPages > 1 ? (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  {safePage > 1 ? (
                    <PaginationPrevious
                      href={buildSearchHref(lang, store.slug, {
                        q,
                        sort: sortConfig.key,
                        page: safePage - 1,
                      })}
                    />
                  ) : (
                    <Button variant="ghost" size="default" className="pointer-events-none opacity-40">
                      {copy.previous}
                    </Button>
                  )}
                </PaginationItem>

                {paginationPages.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={buildSearchHref(lang, store.slug, {
                        q,
                        sort: sortConfig.key,
                        page: pageNumber,
                      })}
                      isActive={pageNumber === safePage}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  {safePage < totalPages ? (
                    <PaginationNext
                      href={buildSearchHref(lang, store.slug, {
                        q,
                        sort: sortConfig.key,
                        page: safePage + 1,
                      })}
                    />
                  ) : (
                    <Button variant="ghost" size="default" className="pointer-events-none opacity-40">
                      {copy.next}
                    </Button>
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) : null}
        </div>
      )}
    </div>
  )
}
