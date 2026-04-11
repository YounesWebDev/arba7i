import { Suspense, cache } from "react"
import Link from "next/link"
import { and, count, desc, eq, gte, sql, sum } from "drizzle-orm"
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Circle,
  DollarSign,
  Package,
  Plus,
  ShieldAlert,
  ShoppingBag,
  Store,
} from "lucide-react"
import { db } from "@/db"
import { customers, orders, products, riskEvents, sellerStoreLinks } from "@/db/schema"
import { requireAuth } from "@/lib/auth-guard"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function formatCurrency(value: string | number | null | undefined) {
  if (value == null) return "0"
  const numericValue = typeof value === "number" ? value : Number.parseFloat(value)

  if (Number.isNaN(numericValue)) return "0"
  return numericValue.toLocaleString()
}

const getStoreLinkForUser = cache(async (userId: string) => {
  const [storeLink] = await db
    .select()
    .from(sellerStoreLinks)
    .where(eq(sellerStoreLinks.userId, userId))
    .limit(1)

  return storeLink ?? null
})

const getDashboardData = cache(async (storeId: string) => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 6)
  startDate.setHours(0, 0, 0, 0)

  const [
    revenueResult,
    newOrdersResult,
    productsResult,
    riskResult,
    recentOrdersData,
    chartRows,
  ] = await Promise.all([
    db
      .select({ total: sum(orders.totalAmount) })
      .from(orders)
      .where(and(eq(orders.storeId, storeId), eq(orders.status, "delivered"))),
    db
      .select({ count: count() })
      .from(orders)
      .where(and(eq(orders.storeId, storeId), eq(orders.status, "new"))),
    db
      .select({ count: count() })
      .from(products)
      .where(and(eq(products.storeId, storeId), eq(products.status, "active"))),
    db
      .select({ count: count() })
      .from(riskEvents)
      .where(eq(riskEvents.storeId, storeId)),
    db
      .select({
        id: orders.id,
        amount: orders.totalAmount,
        status: orders.status,
        date: orders.createdAt,
        customerName: customers.fullName,
      })
      .from(orders)
      .leftJoin(customers, eq(orders.customerId, customers.id))
      .where(eq(orders.storeId, storeId))
      .orderBy(desc(orders.createdAt))
      .limit(5),
    db
      .select({
        day: sql<string>`to_char(date_trunc('day', ${orders.createdAt}), 'YYYY-MM-DD')`,
        revenue: sql<string>`coalesce(sum(${orders.totalAmount}), 0)`,
      })
      .from(orders)
      .where(
        and(
          eq(orders.storeId, storeId),
          eq(orders.status, "delivered"),
          gte(orders.createdAt, startDate)
        )
      )
      .groupBy(sql`date_trunc('day', ${orders.createdAt})`)
      .orderBy(sql`date_trunc('day', ${orders.createdAt})`),
  ])

  return {
    totalRevenue: formatCurrency(revenueResult[0]?.total),
    newOrdersCount: newOrdersResult[0]?.count || 0,
    activeProductsCount: productsResult[0]?.count || 0,
    riskyCount: riskResult[0]?.count || 0,
    recentOrdersData,
    chartRows,
  }
})

function buildChartData(
  chartRows: { day: string; revenue: string }[],
  locale: string
) {
  const revenueByDay = new Map(chartRows.map((row) => [row.day, Number.parseFloat(row.revenue) || 0]))

  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - index))
    date.setHours(0, 0, 0, 0)

    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")
    const day = `${date.getDate()}`.padStart(2, "0")
    const key = `${year}-${month}-${day}`

    return {
      name: date.toLocaleDateString(locale, { weekday: "short" }),
      revenue: revenueByDay.get(key) ?? 0,
    }
  })
}

async function DashboardContent({
  activeStoreId,
  copy,
  lang,
  locale,
}: {
  activeStoreId: string
  copy: Record<string, string>
  lang: string
  locale: string
}) {
  const {
    totalRevenue,
    newOrdersCount,
    activeProductsCount,
    riskyCount,
    recentOrdersData,
    chartRows,
  } = await getDashboardData(activeStoreId)

  const setupProgress = 33
  const chartData = buildChartData(chartRows, locale)

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{copy.healthActive}</p>
              <p className="text-lg font-semibold">{copy.online}</p>
            </div>
            <Badge variant="default">{copy.storeStatusBadge}</Badge>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{copy.healthStock}</p>
              <p className="text-lg font-semibold">0 {copy.alerts}</p>
            </div>
            <Badge variant="secondary">{copy.stockBadge}</Badge>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{copy.riskyTitle}</p>
              <p className="text-lg font-semibold">{riskyCount}</p>
            </div>
            <Badge variant={riskyCount > 0 ? "destructive" : "secondary"}>
              {riskyCount > 0 ? copy.riskBadgeActive : copy.riskBadgeClear}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.revenue}</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue} DZD</div>
            <p className="text-xs text-muted-foreground">{copy.fromDeliveredOrders}</p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.orders}</CardTitle>
            <div className="rounded-full bg-secondary p-2 text-secondary-foreground">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newOrdersCount}</div>
            <p className="text-xs text-muted-foreground">{copy.waitingToProcess}</p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.products}</CardTitle>
            <div className="rounded-full bg-accent/15 p-2 text-accent-foreground">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProductsCount}</div>
            <p className="text-xs text-muted-foreground">{copy.inCatalog}</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{copy.riskyTitle}</CardTitle>
            <div className="rounded-full bg-destructive/10 p-2 text-destructive">
              <ShieldAlert className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskyCount}</div>
            <p className="text-xs text-muted-foreground">{copy.flagsTriggered}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:gap-8">
        <div className="space-y-8 md:col-span-4 lg:col-span-5">
          <Card className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle>{copy.salesTrend}</CardTitle>
              <CardDescription>{copy.chartDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart
                data={chartData}
                emptyText={copy.chartEmpty}
                revenueLabel={copy.chartRevenueLabel}
              />
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>{copy.recentOrders}</CardTitle>
                <CardDescription>{copy.latestTransactions}</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/${lang}/dashboard/orders`}>
                  {copy.viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{copy.customer}</TableHead>
                    <TableHead>{copy.status}</TableHead>
                    <TableHead>{copy.date}</TableHead>
                    <TableHead className="text-right">{copy.amount}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrdersData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        {copy.noOrdersYet}
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentOrdersData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.customerName ?? copy.guest}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === "new" ? "default" : "secondary"} className="capitalize">
                            {order.status === "new"
                              ? copy.orderStatusNew
                              : order.status === "delivered"
                                ? copy.orderStatusDelivered
                                : order.status === "processing"
                                  ? copy.orderStatusProcessing
                                  : order.status === "cancelled"
                                    ? copy.orderStatusCancelled
                                    : order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.date?.toLocaleDateString(locale)}</TableCell>
                        <TableCell className="text-right font-bold">
                          {formatCurrency(order.amount as string)} DZD
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 md:col-span-3 lg:col-span-2">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/6 to-accent/8 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>{copy.setupTitle}</CardTitle>
              <CardDescription>{copy.setupDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-primary">
                    {setupProgress}% {copy.complete}
                  </span>
                </div>
                <Progress value={setupProgress} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium line-through text-muted-foreground">
                    {copy.createAccount}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Circle className="h-5 w-5 text-muted-foreground" />
                  <Link
                    href={`/${lang}/dashboard/settings`}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {copy.stepStore}
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Circle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">{copy.stepShipping}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Circle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">{copy.stepPayment}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-card/95 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">{copy.riskyTitle}</CardTitle>
              </div>
              <CardDescription>{copy.riskyDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-4 text-center text-sm text-muted-foreground">
                {riskyCount > 0 ? `${riskyCount} ${copy.ordersRequireAttention}` : copy.allClear}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/${lang}/dashboard/radar`}>{copy.reviewCases}</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Store className="h-4 w-4" />
                {copy.storeHealth}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{copy.healthActive}</span>
                <Badge variant="default">{copy.online}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{copy.healthStock}</span>
                <Badge variant="secondary">0 {copy.alerts}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

function DashboardContentFallback() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={`status-${index}`} className="border-border/60 bg-card/95 shadow-sm">
            <CardContent className="space-y-3 p-5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-7 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={`kpi-${index}`} className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="space-y-3 pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:gap-8">
        <div className="space-y-8 md:col-span-4 lg:col-span-5">
          <Card className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[260px] w-full rounded-2xl" />
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="space-y-3">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-52" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={`row-${index}`} className="h-12 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 md:col-span-3 lg:col-span-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={`side-${index}`} className="border-border/60 bg-card/95 shadow-sm">
              <CardHeader className="space-y-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-40" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default async function DashboardHomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const auth = await requireAuth(lang)
  const dict = await getDictionary(lang as Locale)
  const copy = dict.dashboardPage
  const locale = lang === "ar" ? "ar-DZ" : "en-US"
  const storeLink = await getStoreLinkForUser(auth.user.id)

  if (!storeLink) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border/80 bg-card/70 p-8 text-center shadow-sm">
        <Store className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">{copy.noStoreTitle}</h2>
        <p className="max-w-md text-muted-foreground">{copy.noStoreDesc}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden border-border/60 bg-gradient-to-br from-card via-card to-primary/5 shadow-sm">
        <CardContent className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Badge variant="secondary" className="w-fit gap-1 rounded-full px-3 py-1 text-xs font-medium">
              <Activity className="h-3.5 w-3.5" />
              {copy.overviewBadge}
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {copy.greeting} {auth.userData?.first_name || copy.user}
              </h1>
              <p className="mt-1 max-w-2xl text-muted-foreground">{copy.welcomeDesc}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/${lang}/dashboard/products/new`}>
                <Plus className="mr-2 h-4 w-4" />
                {copy.quickAddProduct}
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/${lang}/dashboard/orders/new`}>
                <Plus className="mr-2 h-4 w-4" />
                {copy.quickAddOrder}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Suspense fallback={<DashboardContentFallback />}>
        <DashboardContent
          activeStoreId={storeLink.storeId}
          copy={copy}
          lang={lang}
          locale={locale}
        />
      </Suspense>
    </div>
  )
}
