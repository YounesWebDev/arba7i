import Link from "next/link"
import { requirePermission } from "@/lib/auth-guard"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { db } from "@/db"
import { categories, products, sellerStoreLinks } from "@/db/schema"
import { and, count, desc, eq } from "drizzle-orm"
import { AddCategoryDialog } from "@/components/dashboard/add-category-dialog"
import { CategoryActions } from "@/components/dashboard/category-actions"
import { CategoryTableActions } from "@/components/dashboard/category-table-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  Layers3,
  Store,
  TrendingUp,
} from "lucide-react"

function getLocale(lang: string) {
  if (lang === "ar") return "ar-DZ"
  if (lang === "fr") return "fr-FR"
  return "en-US"
}

function buildCategoriesPageHref(lang: string, filter: string, page: number) {
  const query = new URLSearchParams()

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

export default async function CategoriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ filter?: string; page?: string }>
}) {
  const { lang } = await params
  const { filter = "all", page = "1" } = await searchParams
  const auth = await requirePermission(lang, "manage_products")
  const dict = await getDictionary(lang as Locale)
  const copy = (dict as Record<string, unknown>).categoriesPage as Record<string, string>
  const isArabic = lang === "ar"
  const locale = getLocale(lang)
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
    .where(eq(categories.storeId, storeLink.storeId))
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

  const kpis = [
    {
      title: copy.totalCategories,
      value: totalCategories.toLocaleString(locale),
      meta: copy.totalCategoriesMeta,
      icon: FolderKanban,
      iconClassName: "bg-primary/10 text-primary",
    },
    {
      title: copy.activeCategories,
      value: activeCategories.toLocaleString(locale),
      meta: copy.activeCategoriesMeta,
      icon: CheckCircle2,
      iconClassName: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: copy.mostPopular,
      value: mostPopularCategory?.productCount ? mostPopularCategory.name : copy.noPopular,
      meta: copy.mostPopularMeta,
      icon: TrendingUp,
      iconClassName: "bg-orange-500/10 text-orange-600",
    },
    {
      title: copy.totalProductsLinked,
      value: totalProductsLinked.toLocaleString(locale),
      meta: copy.totalProductsLinkedMeta,
      icon: Layers3,
      iconClassName: "bg-accent/20 text-accent-foreground",
    },
  ]

  return (
    <div className="flex min-w-0 flex-col gap-8" dir={isArabic ? "rtl" : "ltr"}>
      <section className="flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-gradient-to-br from-card via-card to-primary/5 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold tracking-tight">
            <FolderKanban className="me-1 h-3.5 w-3.5" />
            {copy.title}
          </Badge>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl">{copy.title}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{copy.desc}</p>
          </div>
        </div>

        <AddCategoryDialog storeId={storeLink.storeId} lang={lang} />
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
            <CardTitle>{copy.allCategories}</CardTitle>
            <CardDescription>
              {copy.categoriesCount} {totalCategories} {copy.categoriesSuffix}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CategoryTableActions lang={lang} filter={filter} copy={copy} />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table dir={isArabic ? "rtl" : "ltr"} className="min-w-[820px]">
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="px-6 text-start">{copy.name}</TableHead>
                  <TableHead className="text-start">{copy.products}</TableHead>
                  <TableHead className="text-start">{copy.status}</TableHead>
                  <TableHead className="text-start">{copy.date}</TableHead>
                  <TableHead className="px-6 text-end">{copy.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      {copy.empty}
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
                            {isActive ? copy.active : copy.emptyStatus}
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
              {copy.showing} {pageStart + 1}-{Math.min(pageStart + paginatedCategories.length, filteredCategories.length)} {copy.of} {filteredCategories.length}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-2xl" asChild disabled={safePage <= 1}>
                <Link
                  href={buildCategoriesPageHref(lang, filter, Math.max(1, safePage - 1))}
                  aria-disabled={safePage <= 1}
                  tabIndex={safePage <= 1 ? -1 : undefined}
                >
                  {copy.prev}
                </Link>
              </Button>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                {copy.page} {safePage}/{totalPages}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="rounded-2xl"
                asChild
                disabled={safePage >= totalPages}
              >
                <Link
                  href={buildCategoriesPageHref(lang, filter, Math.min(totalPages, safePage + 1))}
                  aria-disabled={safePage >= totalPages}
                  tabIndex={safePage >= totalPages ? -1 : undefined}
                >
                  {copy.next}
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="rounded-[2rem] border border-primary/10 bg-gradient-to-r from-primary/10 via-accent/10 to-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl font-black tracking-tight">{copy.categoryTipTitle}</h2>
            <p className="text-sm leading-6 text-muted-foreground sm:text-base">
              {copy.categoryTipBody}
            </p>
          </div>
          <Button variant="secondary" className="rounded-2xl">
            {copy.viewAnalytics}
            <ArrowRight className="ms-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
