import { requirePermission } from "@/lib/auth-guard"
import { getProductsDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { db } from "@/db"
import { products, categories, sellerStoreLinks } from "@/db/schema"
import { eq, and, desc, ilike, or, count } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductActions } from "@/components/products/product-actions"
import {
  AlertTriangle,
  Boxes,
  CircleDollarSign,
  Package2,
  PackageOpen,
  Plus,
  Store,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

function formatCurrency(value: string | number) {
  return `${Math.round(Number(value || 0)).toLocaleString()} DZD`
}

function getLocale(lang: string) {
  if (lang === "ar") return "ar-DZ"
  if (lang === "fr") return "fr-FR"
  return "en-US"
}

function buildVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, totalPages]
}

type ProductsPageCopy = {
  title: string
  desc: string
  addProduct: string
  product: string
  sku: string
  category: string
  price: string
  stock: string
  status: string
  actions: string
  emptyTitle: string
  emptyDesc: string
  active: string
  draft: string
  outOfStock: string
  page: string
  of: string
  prev: string
  next: string
  noStore: string
  lowStock: string
  inventoryValue: string
  totalProducts: string
  lowStockItems: string
  draftProducts: string
  catalogHealth: string
  showing: string
  results: string
  threshold: string
  filtersApplied: string
  inventoryValueMeta: string
  totalProductsMeta: string
  lowStockMeta: string
  draftMeta: string
  tabs: {
    products: string
    categories: string
  }
  filters: {
    searchPlaceholder: string
    statusPlaceholder: string
    categoryPlaceholder: string
    allStatuses: string
    allCategories: string
  }
  actionMenu: {
    srOnly: string
    label: string
    edit: string
    hide: string
    delete: string
  }
}

export default async function ProductsListPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ q?: string; status?: string; category?: string; page?: string }>
}) {
  const { lang } = await params
  const { q, status, category, page } = await searchParams
  const auth = await requirePermission(lang, "manage_products")
  const dict = await getProductsDictionary(lang as Locale)
  const copy = (dict as Record<string, unknown>).productsPage as ProductsPageCopy
  const isAr = lang === "ar"
  const locale = getLocale(lang)
  const pageSize = 10
  const currentPage = Math.max(1, Number.parseInt(page || "1", 10) || 1)

  const [storeLink] = await db
    .select()
    .from(sellerStoreLinks)
    .where(eq(sellerStoreLinks.userId, auth.user.id))
    .limit(1)

  if (!storeLink) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border/80 bg-card/70 p-8 text-center shadow-sm">
        <Store className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">{copy.noStore}</h2>
      </div>
    )
  }

  const storeId = storeLink.storeId
  const filters = [eq(products.storeId, storeId)]

  if (q) filters.push(or(ilike(products.name, `%${q}%`), ilike(products.sku, `%${q}%`))!)
  if (status && status !== "all") filters.push(eq(products.status, status))
  if (category && category !== "all") filters.push(eq(products.categoryId, category))

  const whereClause = and(...filters)

  const [totalCountResult, storeCategories, allStoreProducts] = await Promise.all([
    db.select({ count: count() }).from(products).where(whereClause),
    db.select({ id: categories.id, name: categories.name }).from(categories).where(eq(categories.storeId, storeId)),
    db
      .select({
        price: products.price,
        stock: products.stock,
        status: products.status,
        lowStockThreshold: products.lowStockThreshold,
      })
      .from(products)
      .where(eq(products.storeId, storeId)),
  ])

  const totalProducts = totalCountResult[0]?.count || 0
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const pageStart = (safePage - 1) * pageSize
  const visiblePages = buildVisiblePages(safePage, totalPages)

  const productsList = await db
    .select({
      id: products.id,
      name: products.name,
      sku: products.sku,
      price: products.price,
      stock: products.stock,
      status: products.status,
      lowStockThreshold: products.lowStockThreshold,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(whereClause)
    .limit(pageSize)
    .offset(pageStart)
    .orderBy(desc(products.createdAt))

  const lowStockCount = allStoreProducts.filter((product) => {
    const stock = Number(product.stock || 0)
    const threshold = Number(product.lowStockThreshold || 0)
    return stock > 0 && stock <= threshold
  }).length
  const draftCount = allStoreProducts.filter((product) => product.status === "draft").length
  const inventoryValue = allStoreProducts.reduce((sum, product) => {
    return sum + Number(product.price || 0) * Number(product.stock || 0)
  }, 0)
  const filtersApplied = Boolean(q || (status && status !== "all") || (category && category !== "all"))

  const kpis = [
    {
      title: copy.totalProducts,
      value: totalProducts.toLocaleString(locale),
      meta: copy.totalProductsMeta,
      icon: Boxes,
      iconClassName: "bg-primary/10 text-primary",
    },
    {
      title: copy.lowStockItems,
      value: lowStockCount.toLocaleString(locale),
      meta: copy.lowStockMeta,
      icon: AlertTriangle,
      iconClassName: "bg-orange-500/10 text-orange-600",
    },
    {
      title: copy.draftProducts,
      value: draftCount.toLocaleString(locale),
      meta: copy.draftMeta,
      icon: Package2,
      iconClassName: "bg-muted text-muted-foreground",
    },
    {
      title: copy.inventoryValue,
      value: formatCurrency(inventoryValue),
      meta: copy.inventoryValueMeta,
      icon: CircleDollarSign,
      iconClassName: "bg-accent/20 text-accent-foreground",
    },
  ]

  const buildPageUrl = (newPage: number) => {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (status) params.set("status", status)
    if (category) params.set("category", category)
    if (newPage > 1) params.set("page", newPage.toString())

    const queryString = params.toString()
    return queryString ? `/${lang}/dashboard/products?${queryString}` : `/${lang}/dashboard/products`
  }

  return (
    <div className="flex min-w-0 flex-col gap-8" dir={isAr ? "rtl" : "ltr"}>
      <section className="flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-gradient-to-br from-card via-card to-accent/50 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold tracking-tight">
            <Boxes className="me-1 h-3.5 w-3.5" />
            {copy.title}
          </Badge>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/${lang}/dashboard/products`}
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm"
            >
              {copy.tabs.products}
            </Link>
            <Link
              href={`/${lang}/dashboard/products/categories`}
              className="inline-flex items-center rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {copy.tabs.categories}
            </Link>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl">{copy.title}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{copy.desc}</p>
          </div>
        </div>

        <Button className="rounded-lg bg-linear-to-br from-primary to-accent py-6" asChild>
          <Link href={`/${lang}/dashboard/products/new`}>
            <Plus className={isAr ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
            {copy.addProduct}
          </Link>
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon

          return (
            <Card key={item.title} className="border-border/60 bg-card/95 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold tracking-tight">{item.title}</CardTitle>
                <div className={`rounded-lg p-2 ${item.iconClassName}`}>
                  <Icon className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black tracking-tight">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.meta}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <Card className="overflow-hidden border-border/60 bg-card/95 shadow-sm">
        <CardHeader className="gap-4 border-b border-border/60 bg-muted/20 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle>{copy.catalogHealth}</CardTitle>
            <CardDescription>
              {copy.showing} {productsList.length.toLocaleString(locale)} / {totalProducts.toLocaleString(locale)} {copy.results}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filtersApplied ? (
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                <TrendingUp className="me-1 h-3.5 w-3.5" />
                {copy.filtersApplied}
              </Badge>
            ) : null}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="border-b border-border/60 px-6 py-5">
            <ProductFilters
              lang={lang}
              categories={storeCategories}
              copy={{
                ...copy.filters,
                active: copy.active,
                draft: copy.draft,
                outOfStock: copy.outOfStock,
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <Table dir={isAr ? "rtl" : "ltr"} className="min-w-[960px]">
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="px-6 text-start">{copy.product}</TableHead>
                  <TableHead className="text-start">{copy.category}</TableHead>
                  <TableHead className="text-start">{copy.sku}</TableHead>
                  <TableHead className="text-start">{copy.stock}</TableHead>
                  <TableHead className="text-start">{copy.price}</TableHead>
                  <TableHead className="text-start">{copy.status}</TableHead>
                  <TableHead className="px-6 text-end">{copy.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                        <PackageOpen className="h-10 w-10 opacity-30" />
                        <div>
                          <p className="font-medium text-foreground">{copy.emptyTitle}</p>
                          <p className="text-sm">{copy.emptyDesc}</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  productsList.map((prod) => {
                    const stock = Number(prod.stock || 0)
                    const threshold = Number(prod.lowStockThreshold || 0)
                    const isLowStock = stock > 0 && stock <= threshold
                    const statusLabel =
                      prod.status === "active"
                        ? copy.active
                        : prod.status === "draft"
                          ? copy.draft
                          : copy.outOfStock

                    return (
                      <TableRow key={prod.id} className="group">
                        <TableCell className="px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                              <Package2 className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="truncate font-semibold">{prod.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {copy.threshold}: {threshold}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-full font-normal">
                            {prod.categoryName || "—"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{prod.sku || "—"}</TableCell>
                        <TableCell>
                          <Badge variant={isLowStock ? "destructive" : "secondary"} className="rounded-full">
                            {stock}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{formatCurrency(prod.price as string)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              prod.status === "active"
                                ? "default"
                                : prod.status === "draft"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="rounded-full"
                          >
                            {statusLabel}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 text-end">
                          <div className="inline-flex justify-end opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                            <ProductActions productId={prod.id} lang={lang} copy={copy.actionMenu} />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col gap-4 border-t border-border/60 px-6 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                {copy.showing} {pageStart + 1}-{Math.min(pageStart + productsList.length, totalProducts)} {copy.of} {totalProducts}
              </p>
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {copy.page} {safePage}/{totalPages}
                </Badge>
                <Pagination className="mx-0 w-auto justify-start sm:justify-end">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={buildPageUrl(Math.max(1, safePage - 1))}
                        aria-disabled={safePage <= 1}
                        tabIndex={safePage <= 1 ? -1 : undefined}
                        className={safePage <= 1 ? "pointer-events-none opacity-50" : undefined}
                        text={copy.prev}
                      />
                    </PaginationItem>

                    {visiblePages.map((pageNumber, index) => {
                      const previousPage = visiblePages[index - 1]
                      const shouldShowEllipsis = previousPage != null && pageNumber - previousPage > 1

                      return [
                        shouldShowEllipsis ? (
                          <PaginationItem key={`ellipsis-${pageNumber}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : null,
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href={buildPageUrl(pageNumber)}
                            isActive={pageNumber === safePage}
                            aria-label={`${copy.page} ${pageNumber}`}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>,
                      ]
                    })}

                    <PaginationItem>
                      <PaginationNext
                        href={buildPageUrl(Math.min(totalPages, safePage + 1))}
                        aria-disabled={safePage >= totalPages}
                        tabIndex={safePage >= totalPages ? -1 : undefined}
                        className={safePage >= totalPages ? "pointer-events-none opacity-50" : undefined}
                        text={copy.next}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
