import Link from "next/link"
import { notFound } from "next/navigation"
import { and, asc, desc, eq, gt, gte, lte, sql } from "drizzle-orm"
import {
  ChevronDown,
  ChevronRight,
  ImageIcon,
  ListFilter,
} from "lucide-react"
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getStorefrontDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import Image from 'next/image';

const PAGE_SIZE = 9

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
    case "name":
      return { key: "name", label: "Name", orderBy: asc(products.name) }
    default:
      return { key: "newest", label: "Newest arrivals", orderBy: desc(products.createdAt) }
  }
}

function buildCategoryHref(
  lang: string,
  storeSlug: string,
  categorySlug: string,
  options: { sort?: string; page?: number; availability?: string; price?: string } = {}
) {
  const params = new URLSearchParams()

  if (options.sort && options.sort !== "newest") params.set("sort", options.sort)
  if (options.page && options.page > 1) params.set("page", String(options.page))
  if (options.availability && options.availability !== "all") params.set("availability", options.availability)
  if (options.price && options.price !== "all") params.set("price", options.price)

  const queryString = params.toString()
  return queryString
    ? `/${lang}/${storeSlug}/category/${categorySlug}?${queryString}`
    : `/${lang}/${storeSlug}/category/${categorySlug}`
}

function buildPageWindow(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1])
  return Array.from(pages).filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b)
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; storeSlug: string; categorySlug: string }>
  searchParams: Promise<{ sort?: string; page?: string; availability?: string; price?: string }>
}) {
  const { lang, storeSlug, categorySlug } = await params
  const resolvedSearchParams = await searchParams
  const dict = await getStorefrontDictionary(lang as Locale)
  const copy = dict.storefront.category

  const page = getValidPage(resolvedSearchParams.page)
  const availability =
    resolvedSearchParams.availability === "out"
      ? "out"
      : resolvedSearchParams.availability === "in"
        ? "in"
        : "all"
  const price =
    resolvedSearchParams.price === "under-5000"
      ? "under-5000"
      : resolvedSearchParams.price === "over-5000"
        ? "over-5000"
        : "all"
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

  const [category] = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .where(and(eq(categories.slug, categorySlug), eq(categories.storeId, store.id)))
    .limit(1)

  if (!category) notFound()

  const filters = and(
    eq(products.storeId, store.id),
    eq(products.categoryId, category.id),
    eq(products.status, "active"),
    availability === "in" ? gt(products.stock, 0) : undefined,
    availability === "out" ? lte(products.stock, 0) : undefined,
    price === "under-5000" ? lte(products.price, "5000") : undefined,
    price === "over-5000" ? gte(products.price, "5000") : undefined
  )

  const [{ count }, pageItems] = await Promise.all([
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
        price: true,
        stock: true,
        createdAt: true,
      },
      with: {
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
  ])

  const totalItems = Number(count || 0)
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginationPages = buildPageWindow(safePage, totalPages)

  const sortOptions = [
    { key: "newest", label: copy.newest },
    { key: "price-asc", label: copy.priceLowHigh },
    { key: "price-desc", label: copy.priceHighLow },
    { key: "name", label: copy.name },
  ]

  const filterSummary = [
    availability !== "all" ? (availability === "in" ? "In stock only" : "Out of stock only") : null,
    price !== "all" ? (price === "under-5000" ? "Under 5,000" : "Over 5,000") : null,
  ].filter(Boolean)

  const FilterPanel = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-black">
          <ListFilter className="h-5 w-5" />
          {copy.filters}
        </h3>
        <Button variant="link" className="h-auto p-0 text-xs font-bold uppercase tracking-[0.18em]" asChild>
          <Link href={buildCategoryHref(lang, store.slug, category.slug)}>{copy.reset}</Link>
        </Button>
      </div>

      <Card className="border-border/60 bg-card/95">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{copy.availability}</p>
            <p className="text-sm text-muted-foreground">{copy.filterDescription}</p>
          </div>
          <div className="grid gap-2">
            <Button variant={availability === "all" ? "default" : "outline"} className="justify-start rounded-2xl" asChild>
              <Link href={buildCategoryHref(lang, store.slug, category.slug, { sort: sortConfig.key, price })}>
                {copy.allProducts}
              </Link>
            </Button>
            <Button variant={availability === "in" ? "default" : "outline"} className="justify-start rounded-2xl" asChild>
              <Link
                href={buildCategoryHref(lang, store.slug, category.slug, {
                  sort: sortConfig.key,
                  availability: "in",
                  price,
                })}
              >
                {copy.inStock}
              </Link>
            </Button>
            <Button variant={availability === "out" ? "default" : "outline"} className="justify-start rounded-2xl" asChild>
              <Link
                href={buildCategoryHref(lang, store.slug, category.slug, {
                  sort: sortConfig.key,
                  availability: "out",
                  price,
                })}
              >
                {copy.outOfStock}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/95">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{copy.price}</p>
            <p className="text-sm text-muted-foreground">{copy.priceDescription}</p>
          </div>
          <div className="grid gap-2">
            <Button variant={price === "all" ? "default" : "outline"} className="justify-start rounded-2xl" asChild>
              <Link href={buildCategoryHref(lang, store.slug, category.slug, { sort: sortConfig.key, availability })}>
                {copy.allPrices}
              </Link>
            </Button>
            <Button variant={price === "under-5000" ? "default" : "outline"} className="justify-start rounded-2xl" asChild>
              <Link
                href={buildCategoryHref(lang, store.slug, category.slug, {
                  sort: sortConfig.key,
                  availability,
                  price: "under-5000",
                })}
              >
                {copy.under5000}
              </Link>
            </Button>
            <Button variant={price === "over-5000" ? "default" : "outline"} className="justify-start rounded-2xl" asChild>
              <Link
                href={buildCategoryHref(lang, store.slug, category.slug, {
                  sort: sortConfig.key,
                  availability,
                  price: "over-5000",
                })}
              >
                {copy.over5000}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-8 px-4 py-5 sm:space-y-10 sm:px-6 sm:py-8">
      <header className="space-y-5">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
          <Link href={`/${lang}/${store.slug}`} className="transition-colors hover:text-primary">
            {copy.home}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{category.name}</span>
        </nav>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]">
              {copy.eyebrow}
            </Badge>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{category.name}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{totalItems} {copy.itemsFound}</span>
              {filterSummary.map((item) => (
                <Badge key={item} variant="outline" className="rounded-full">
                  {item === "In stock only"
                    ? copy.inStockOnly
                    : item === "Out of stock only"
                      ? copy.outOfStockOnly
                      : item === "Under 5,000"
                        ? copy.under5000
                        : copy.over5000}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="rounded-2xl md:hidden">
              <ListFilter className="mr-2 h-4 w-4" />
              {copy.filters}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{copy.categoryFilters}</SheetTitle>
                  <SheetDescription>{copy.categoryFiltersDescription}</SheetDescription>
                </SheetHeader>
                <div className="px-4 pb-4">{FilterPanel}</div>
              </SheetContent>
            </Sheet>

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
                    <Link
                      href={buildCategoryHref(lang, store.slug, category.slug, {
                        sort: option.key,
                        availability,
                        price,
                      })}
                    >
                      {option.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden md:block">
          <div className="sticky top-28">{FilterPanel}</div>
        </aside>

        <div className="space-y-6">
          {pageItems.length === 0 ? (
            <Card className="border-border/60 bg-card">
              <CardContent className="flex min-h-56 flex-col items-center justify-center gap-3 p-8 text-center">
                <ListFilter className="h-10 w-10 text-muted-foreground" />
                <h2 className="text-xl font-bold">{copy.noProducts}</h2>
                <p className="max-w-md text-sm text-muted-foreground">
                  {copy.noProductsBody}
                </p>
                <Button className="rounded-full" asChild>
                  <Link href={`/${lang}/${store.slug}`}>{copy.backToStore}</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((product) => {
                const image = product.images.find((item) => item.url)?.url
                const isNew = product.createdAt
                  ? new Date().getTime() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 14
                  : false

                return (
                  <Link href={`/${lang}/${store.slug}/products/${product.slug}`} key={product.id} className="group">
                    <Card className="h-full overflow-hidden border-border/60 bg-card transition-colors group-hover:border-primary/30">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        {image ? (
                          <Image
                            src={image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                            decoding="async"
                            width={500} // Adjust width and height as needed
                            height={500}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                          <Badge className="rounded-full bg-background/90 text-foreground hover:bg-background/90">
                            {Number(product.stock || 0) > 0 ? copy.inStock : copy.outOfStock}
                          </Badge>
                          {isNew ? <Badge className="rounded-full">{copy.new}</Badge> : null}
                        </div>
                      </div>

                      <CardContent className="flex flex-col gap-3 p-4">
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                          {category.name}
                        </span>
                        <h3 className="line-clamp-2 text-lg font-bold tracking-tight group-hover:text-primary">
                          {product.name}
                        </h3>
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
          )}

          {totalPages > 1 ? (
            <Pagination className="justify-start">
              <PaginationContent>
                <PaginationItem>
                  {safePage > 1 ? (
                    <PaginationPrevious
                      href={buildCategoryHref(lang, store.slug, category.slug, {
                        sort: sortConfig.key,
                        page: safePage - 1,
                        availability,
                        price,
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
                      href={buildCategoryHref(lang, store.slug, category.slug, {
                        sort: sortConfig.key,
                        page: pageNumber,
                        availability,
                        price,
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
                      href={buildCategoryHref(lang, store.slug, category.slug, {
                        sort: sortConfig.key,
                        page: safePage + 1,
                        availability,
                        price,
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
      </div>
    </div>
  )
}
