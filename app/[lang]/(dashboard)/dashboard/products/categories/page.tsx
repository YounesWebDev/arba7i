import { requirePermission } from "@/lib/auth-guard"
import { getCategoriesDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import Link from "next/link"
import { db } from "@/db"
import { categories, products, sellerStoreLinks } from "@/db/schema"
import { and, count, desc, eq, ilike } from "drizzle-orm"
import { AddCategoryDialog } from "@/components/dashboard/add-category-dialog"
import { CategoryActions } from "@/components/products/category-actions"
import { CategoryFilters } from "@/components/products/category-filters"
import { Badge } from "@/components/ui/badge"
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
import { CheckCircle2, FolderKanban, Layers3, Store, TrendingUp } from "lucide-react"

type CategoriesPageCopy = {
  title: string
  desc: string
  noStore: string
  overview: {
    title: string
    countPrefix: string
    countSuffix: string
  }
  stats: {
    totalCategories: { title: string; meta: string }
    activeCategories: { title: string; meta: string }
    mostPopular: { title: string; meta: string; empty: string }
    totalProductsLinked: { title: string; meta: string }
  }
  filters: {
    label: string
    export: string
    searchPlaceholder: string // Added for the new filter
    statusPlaceholder: string // Added for the new filter
    all: string
    withProducts: string
    empty: string
  }
  table: {
    name: string
    products: string
    status: string
    date: string
    actions: string
    active: string
    emptyStatus: string
    empty: string
  }
  pagination: {
    showing: string
    of: string
    page: string
    prev: string
    next: string
  }
  tip: {
    title: string
    body: string
    cta: string
  }
  dialog: {
    trigger: string
    title: string
    description: string
    nameLabel: string
    namePlaceholder: string
    slugHint: string
    submit: string
  }
  actions: {
    srOnly: string
    menuLabel: string
    edit: string
    delete: string
    editTitle: string
    editDescription: string
    nameLabel: string
    save: string
    cancel: string
    deleteTitle: string
    deleteDescription: string
    deleteConfirm: string
  }
  messages: {
    nameRequired: string
    duplicateName: string
    createFailed: string
    updateFailed: string
    deleteFailed: string
  }
}

function getLocale(lang: string) {
  if (lang === "ar") return "ar-DZ"
  if (lang === "fr") return "fr-FR"
  return "en-US"
}

function getProductTabs(lang: string) {
  if (lang === "ar") {
    return { products: "المنتجات", categories: "الأقسام" }
  }

  if (lang === "fr") {
    return { products: "Produits", categories: "Catégories" }
  }

  return { products: "Products", categories: "Categories" }
}

// Updated to preserve the search query "q" in the URL
function buildCategoriesPageHref(lang: string, filter: string, page: number, q: string) {
  const query = new URLSearchParams()

  if (q) {
    query.set("q", q)
  }

  if (filter !== "all") {
    query.set("filter", filter)
  }

  if (page > 1) {
    query.set("page", String(page))
  }

  const queryString = query.toString()
  return queryString
    ? `/${lang}/dashboard/products/categories?${queryString}`
    : `/${lang}/dashboard/products/categories`
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

export default async function CategoriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ q?: string; filter?: string; page?: string }>
}) {
  const { lang } = await params
  // Extract "q" from searchParams for the search filter
  const { q = "", filter = "all", page = "1" } = await searchParams
  const auth = await requirePermission(lang, "manage_products")
  const dict = await getCategoriesDictionary(lang as Locale)
  const copy = (dict as Record<string, unknown>).categoriesPage as CategoriesPageCopy
  const isArabic = lang === "ar"
  const locale = getLocale(lang)
  const tabs = getProductTabs(lang)
  const pageSize = 10
  const currentPage = Math.max(1, Number.parseInt(page, 10) || 1)

  const [storeLink] = await db
    .select()
    .from(sellerStoreLinks)
    .where(and(eq(sellerStoreLinks.userId, auth.user.id), eq(sellerStoreLinks.isActive, true)))
    .limit(1)

  if (!storeLink) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border/80 bg-card/70 p-8 text-center shadow-sm">
        <Store className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">{copy.noStore}</h2>
      </div>
    )
  }

  // Base query with optional search filter
  const dbFilters = [eq(categories.storeId, storeLink.storeId)]
  if (q) {
    dbFilters.push(ilike(categories.name, `%${q}%`))
  }

  const storeCategories = await db
    .select({
      id: categories.id,
      name: categories.name,
      createdAt: categories.createdAt,
      productCount: count(products.id),
    })
    .from(categories)
    .leftJoin(
      products,
      and(eq(products.categoryId, categories.id), eq(products.storeId, storeLink.storeId))
    )
    .where(and(...dbFilters)) // Apply search filter to the database query
    .groupBy(categories.id, categories.name, categories.createdAt)
    .orderBy(desc(categories.createdAt))

  const totalCategories = storeCategories.length
  const activeCategories = storeCategories.filter((category) => Number(category.productCount ?? 0) > 0).length
  const totalProductsLinked = storeCategories.reduce(
    (sum, category) => sum + Number(category.productCount ?? 0),
    0
  )
  const mostPopularCategory = [...storeCategories].sort(
    (left, right) => Number(right.productCount ?? 0) - Number(left.productCount ?? 0)
  )[0]

  // Apply the dropdown filter (active/empty)
  const filteredCategories = storeCategories.filter((category) => {
    const productCount = Number(category.productCount ?? 0)
    if (filter === "active") return productCount > 0
    if (filter === "empty") return productCount === 0
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const pageStart = (safePage - 1) * pageSize
  const paginatedCategories = filteredCategories.slice(pageStart, pageStart + pageSize)
  const visiblePages = buildVisiblePages(safePage, totalPages)

  const kpis = [
    {
      title: copy.stats.totalCategories.title,
      value: totalCategories.toLocaleString(locale),
      meta: copy.stats.totalCategories.meta,
      icon: FolderKanban,
      iconClassName: "bg-primary/10 text-primary",
    },
    {
      title: copy.stats.activeCategories.title,
      value: activeCategories.toLocaleString(locale),
      meta: copy.stats.activeCategories.meta,
      icon: CheckCircle2,
      iconClassName: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: copy.stats.mostPopular.title,
      value: mostPopularCategory?.productCount ? mostPopularCategory.name : copy.stats.mostPopular.empty,
      meta: copy.stats.mostPopular.meta,
      icon: TrendingUp,
      iconClassName: "bg-orange-500/10 text-orange-600",
    },
    {
      title: copy.stats.totalProductsLinked.title,
      value: totalProductsLinked.toLocaleString(locale),
      meta: copy.stats.totalProductsLinked.meta,
      icon: Layers3,
      iconClassName: "bg-accent/20 text-accent-foreground",
    },
  ]

  return (
    <div className="flex min-w-0 flex-col gap-8" dir={isArabic ? "rtl" : "ltr"}>
      <section className="flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-gradient-to-br from-card via-card to-accent/50 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold tracking-tight">
            <FolderKanban className="me-1 h-3.5 w-3.5" />
            {copy.title}
          </Badge>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/${lang}/dashboard/products`}
              className="inline-flex items-center rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {tabs.products}
            </Link>
            <Link
              href={`/${lang}/dashboard/products/categories`}
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm"
            >
              {tabs.categories}
            </Link>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl">{copy.title}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{copy.desc}</p>
          </div>
        </div>

        <AddCategoryDialog storeId={storeLink.storeId} lang={lang} copy={copy.dialog} />
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
            <CardTitle>{copy.overview.title}</CardTitle>
            <CardDescription>
              {copy.overview.countPrefix} {totalCategories} {copy.overview.countSuffix}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Added a placeholder fallback if the dictionary isn't updated yet */}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="border-b border-border/60 px-6 py-5">
            <CategoryFilters
              lang={lang}
              copy={{
                searchPlaceholder: copy.filters.searchPlaceholder || (isArabic ? "ابحث عن قسم..." : "Search categories..."),
                statusPlaceholder: copy.filters.statusPlaceholder || (isArabic ? "الحالة" : "Status"),
                all: copy.filters.all || (isArabic ? "الكل" : "All"),
                active: copy.filters.withProducts || (isArabic ? "نشط" : "Active"),
                empty: copy.filters.empty || (isArabic ? "فارغ" : "Empty"),
              }}
            />
          </div>
          <div className="overflow-x-auto">
            <Table dir={isArabic ? "rtl" : "ltr"} className="min-w-[820px]">
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="px-6 text-start">{copy.table.name}</TableHead>
                  <TableHead className="text-start">{copy.table.products}</TableHead>
                  <TableHead className="text-start">{copy.table.status}</TableHead>
                  <TableHead className="text-start">{copy.table.date}</TableHead>
                  <TableHead className="px-6 text-end">{copy.table.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      {copy.table.empty}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCategories.map((category) => {
                    const productCount = Number(category.productCount ?? 0)
                    const isActive = productCount > 0

                    return (
                      <TableRow key={category.id} className="group">
                        <TableCell className="px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                              <FolderKanban className="h-4 w-4" />
                            </div>
                            <span className="font-semibold">{category.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {productCount.toLocaleString(locale)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={isActive ? "default" : "secondary"} className="rounded-full">
                            {isActive ? copy.table.active : copy.table.emptyStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {category.createdAt?.toLocaleDateString(locale)}
                        </TableCell>
                        <TableCell className="px-6 text-end">
                          <div className="inline-flex justify-end opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                            <CategoryActions
                              categoryId={category.id}
                              categoryName={category.name}
                              storeId={storeLink.storeId}
                              lang={lang}
                              copy={copy.actions}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-4 border-t border-border/60 px-6 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              {copy.pagination.showing} {pageStart + 1}-{Math.min(pageStart + paginatedCategories.length, filteredCategories.length)} {copy.pagination.of} {filteredCategories.length}
            </p>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                {copy.pagination.page} {safePage}/{totalPages}
              </Badge>
              <Pagination className="mx-0 w-auto justify-start sm:justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={buildCategoriesPageHref(lang, filter, Math.max(1, safePage - 1), q)}
                      aria-disabled={safePage <= 1}
                      tabIndex={safePage <= 1 ? -1 : undefined}
                      className={safePage <= 1 ? "pointer-events-none opacity-50" : undefined}
                      text={copy.pagination.prev}
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
                          href={buildCategoriesPageHref(lang, filter, pageNumber, q)}
                          isActive={pageNumber === safePage}
                          aria-label={`${copy.pagination.page} ${pageNumber}`}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>,
                    ]
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href={buildCategoriesPageHref(lang, filter, Math.min(totalPages, safePage + 1), q)}
                      aria-disabled={safePage >= totalPages}
                      tabIndex={safePage >= totalPages ? -1 : undefined}
                      className={safePage >= totalPages ? "pointer-events-none opacity-50" : undefined}
                      text={copy.pagination.next}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}