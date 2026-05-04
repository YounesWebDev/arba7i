import Link from "next/link"
import { and, asc, count, desc, eq, ilike, or, sql, sum } from "drizzle-orm"
import { AlertTriangle, Download, Eye, PackageCheck, ShoppingCart, Store, WalletCards } from "lucide-react"
import { bulkUpdateOrders } from "@/app/actions/orders"
import { db } from "@/db"
import { customers, orders, riskEvents, sellerStoreLinks } from "@/db/schema"
import type { Locale } from "@/i18n-config"
import { requirePermission } from "@/lib/auth-guard"
import { getOrdersDictionary } from "@/lib/dictionary"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import { OrderBulkActions } from "@/components/orders/order-bulk-actions"
import { OrderFilters } from "@/components/orders/order-filters"

const PAGE_SIZE = 12
const ORDER_STATUS_KEYS = ["new", "pending", "confirmed", "canceled", "shipped", "delivered", "returned"] as const

function getLocale(lang: string) {
  if (lang === "ar") return "ar-DZ"
  if (lang === "fr") return "fr-FR"
  return "en-US"
}

function formatMoney(value: string | number) {
  return `${Math.round(Number(value || 0)).toLocaleString()} DZD`
}

function shortOrderId(value: string) {
  return `#${value.slice(0, 8).toUpperCase()}`
}

function buildVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1)
  if (currentPage <= 3) return [1, 2, 3, 4, totalPages]
  if (currentPage >= totalPages - 2) return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  return [1, currentPage - 1, currentPage, currentPage + 1, totalPages]
}

function statusVariant(status: string) {
  if (status === "delivered" || status === "confirmed") return "default"
  if (status === "canceled" || status === "returned") return "destructive"
  return "secondary"
}

export default async function OrdersPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ q?: string; status?: string; risk?: string; sort?: string; page?: string }>
}) {
  const { lang } = await params
  const { q = "", status = "all", risk = "all", sort = "newest", page = "1" } = await searchParams
  const auth = await requirePermission(lang, "confirm_orders")
  const dict = await getOrdersDictionary(lang as Locale)
  const copy = dict.list
  const statuses = ORDER_STATUS_KEYS.map((key) => ({ value: key, label: dict.statuses[key] }))
  const locale = getLocale(lang)
  const currentPage = Math.max(1, Number.parseInt(page, 10) || 1)

  const [storeLink] = await db
    .select({ storeId: sellerStoreLinks.storeId })
    .from(sellerStoreLinks)
    .where(and(eq(sellerStoreLinks.userId, auth.user.id), eq(sellerStoreLinks.isActive, true)))
    .limit(1)

  if (!storeLink) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border/80 bg-card/70 p-8 text-center shadow-sm">
        <Store className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">{dict.noStore}</h2>
      </div>
    )
  }

  const filters = [eq(orders.storeId, storeLink.storeId)]
  if (q) {
    filters.push(or(ilike(customers.fullName, `%${q}%`), ilike(customers.phone, `%${q}%`), ilike(orders.id, `%${q}%`))!)
  }
  if (status !== "all") filters.push(eq(orders.status, status))
  if (risk === "risk") {
    filters.push(sql`exists (select 1 from ${riskEvents} where ${riskEvents.orderId} = ${orders.id})`)
  }
  if (risk === "clean") {
    filters.push(sql`not exists (select 1 from ${riskEvents} where ${riskEvents.orderId} = ${orders.id})`)
  }

  const whereClause = and(...filters)
  const orderBy =
    sort === "oldest"
      ? asc(orders.createdAt)
      : sort === "amount-desc"
        ? desc(orders.totalAmount)
        : sort === "amount-asc"
          ? asc(orders.totalAmount)
          : desc(orders.createdAt)

  const [totalResult, statsResult] = await Promise.all([
    db.select({ count: count() }).from(orders).leftJoin(customers, eq(orders.customerId, customers.id)).where(whereClause),
    db
      .select({
        total: count(),
        newOrders: sql<number>`count(*) filter (where ${orders.status} = 'new')`,
        orderValue: sum(orders.totalAmount),
        riskOrders: sql<number>`count(distinct ${riskEvents.orderId})`,
      })
      .from(orders)
      .leftJoin(riskEvents, eq(riskEvents.orderId, orders.id))
      .where(eq(orders.storeId, storeLink.storeId)),
  ])

  const totalOrders = Number(totalResult[0]?.count || 0)
  const totalPages = Math.max(1, Math.ceil(totalOrders / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const pageStart = (safePage - 1) * PAGE_SIZE
  const visiblePages = buildVisiblePages(safePage, totalPages)

  const rows = await db
    .select({
      id: orders.id,
      status: orders.status,
      totalAmount: orders.totalAmount,
      createdAt: orders.createdAt,
      customerName: customers.fullName,
      customerPhone: customers.phone,
      wilaya: customers.wilaya,
      commune: customers.commune,
      riskCount: sql<number>`count(${riskEvents.id})`,
    })
    .from(orders)
    .leftJoin(customers, eq(orders.customerId, customers.id))
    .leftJoin(riskEvents, eq(riskEvents.orderId, orders.id))
    .where(whereClause)
    .groupBy(orders.id, customers.fullName, customers.phone, customers.wilaya, customers.commune)
    .orderBy(orderBy)
    .limit(PAGE_SIZE)
    .offset(pageStart)

  function buildPageHref(newPage: number) {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (status !== "all") params.set("status", status)
    if (risk !== "all") params.set("risk", risk)
    if (sort !== "newest") params.set("sort", sort)
    if (newPage > 1) params.set("page", String(newPage))
    const query = params.toString()
    return query ? `/${lang}/dashboard/orders?${query}` : `/${lang}/dashboard/orders`
  }

  const exportHref = `/${lang}/dashboard/orders/export?${new URLSearchParams({ q, status, risk, sort }).toString()}`
  const statCards = [
    { title: copy.stats.total, value: Number(statsResult[0]?.total || 0).toLocaleString(locale), icon: ShoppingCart },
    { title: copy.stats.newOrders, value: Number(statsResult[0]?.newOrders || 0).toLocaleString(locale), icon: PackageCheck },
    { title: copy.stats.riskOrders, value: Number(statsResult[0]?.riskOrders || 0).toLocaleString(locale), icon: AlertTriangle },
    { title: copy.stats.revenue, value: formatMoney(statsResult[0]?.orderValue || 0), icon: WalletCards },
  ]

  return (
    <div className="flex min-w-0 flex-col gap-8" dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-gradient-to-br from-card via-card to-accent/50 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold tracking-tight">
            {copy.eyebrow}
          </Badge>
          <h1 className="text-3xl font-black tracking-tighter sm:text-4xl">{copy.title}</h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{copy.description}</p>
        </div>
        <Button variant="outline" className="rounded-2xl" asChild>
          <Link href={exportHref}>
            <Download className="mr-2 h-4 w-4" />
            {copy.export}
          </Link>
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="border-border/60 bg-card/95 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold">{card.title}</CardTitle>
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">{card.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <Card className="overflow-hidden border-border/60 bg-card/95 shadow-sm">
        <CardHeader className="gap-4 border-b border-border/60 bg-muted/20 px-6 py-5">
          <div className="space-y-1">
            <CardTitle>{copy.title}</CardTitle>
            <CardDescription>
              {copy.showing} {rows.length.toLocaleString(locale)} / {totalOrders.toLocaleString(locale)} {copy.results}
            </CardDescription>
          </div>
          <OrderFilters lang={lang} copy={copy.filters} statuses={statuses} />
        </CardHeader>

        <CardContent className="p-0">
          <form action={bulkUpdateOrders.bind(null, lang)}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-6 py-4">
              <OrderBulkActions lang={lang} copy={copy.bulk} statuses={statuses} />
            </div>

            <Table className="min-w-[1050px]">
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="w-12 px-6">{copy.selected}</TableHead>
                  <TableHead>{copy.order}</TableHead>
                  <TableHead>{copy.customer}</TableHead>
                  <TableHead>{copy.phone}</TableHead>
                  <TableHead>{copy.location}</TableHead>
                  <TableHead>{copy.amount}</TableHead>
                  <TableHead>{copy.status}</TableHead>
                  <TableHead>{copy.risk}</TableHead>
                  <TableHead>{copy.date}</TableHead>
                  <TableHead className="px-6 text-end">{copy.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-40 text-center">
                      <div className="space-y-1">
                        <p className="font-semibold">{copy.emptyTitle}</p>
                        <p className="text-sm text-muted-foreground">{copy.emptyDescription}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((order) => {
                    const rowStatus = order.status || "new"

                    return (
                    <TableRow key={order.id}>
                      <TableCell className="px-6">
                        <Checkbox name="orderIds" value={order.id} aria-label={`${copy.selected} ${shortOrderId(order.id)}`} />
                      </TableCell>
                      <TableCell className="font-black">{shortOrderId(order.id)}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell className="text-muted-foreground">{order.customerPhone}</TableCell>
                      <TableCell className="max-w-[220px] truncate text-muted-foreground">
                        {order.wilaya}, {order.commune}
                      </TableCell>
                      <TableCell className="font-semibold">{formatMoney(order.totalAmount)}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(rowStatus)} className="rounded-full">
                          {dict.statuses[rowStatus as keyof typeof dict.statuses] || rowStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={Number(order.riskCount || 0) > 0 ? "destructive" : "secondary"} className="rounded-full">
                          {Number(order.riskCount || 0) > 0 ? copy.riskBadge : copy.cleanBadge}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.createdAt?.toLocaleDateString(locale)}</TableCell>
                      <TableCell className="px-6 text-end">
                        <Button variant="ghost" size="sm" className="rounded-full" asChild>
                          <Link href={`/${lang}/dashboard/orders/${order.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            {copy.view}
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </form>

          <div className="flex flex-col gap-4 border-t border-border/60 px-6 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              {copy.showing} {totalOrders === 0 ? 0 : pageStart + 1}-{Math.min(pageStart + rows.length, totalOrders)} {copy.of} {totalOrders}
            </p>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                {copy.page} {safePage}/{totalPages}
              </Badge>
              <Pagination className="mx-0 w-auto justify-start sm:justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href={buildPageHref(Math.max(1, safePage - 1))} text={copy.previous} className={safePage <= 1 ? "pointer-events-none opacity-50" : undefined} />
                  </PaginationItem>
                  {visiblePages.map((pageNumber, index) => {
                    const previousPage = visiblePages[index - 1]
                    return [
                      previousPage != null && pageNumber - previousPage > 1 ? (
                        <PaginationItem key={`ellipsis-${pageNumber}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : null,
                      <PaginationItem key={pageNumber}>
                        <PaginationLink href={buildPageHref(pageNumber)} isActive={pageNumber === safePage}>
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>,
                    ]
                  })}
                  <PaginationItem>
                    <PaginationNext href={buildPageHref(Math.min(totalPages, safePage + 1))} text={copy.next} className={safePage >= totalPages ? "pointer-events-none opacity-50" : undefined} />
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
