import { Suspense, cache } from "react"
import Link from "next/link"
import { and, asc, count, desc, eq, gte, sql, sum } from "drizzle-orm"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Circle,
  DollarSign,
  Package,
  Plus,
  ShieldAlert,
  ShoppingBag,
  Store,
  TrendingUp,
} from "lucide-react"
import { db } from "@/db"
import { customers, expenses, orders, products, riskEvents, sellerStoreLinks } from "@/db/schema"
import { requireAuth } from "@/lib/auth-guard"
import { getDashboardDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function formatCurrency(value: string | number | null | undefined) {
  if (value == null) return "0"
  const numericValue = typeof value === "number" ? value : Number.parseFloat(value)

  if (Number.isNaN(numericValue)) return "0"
  return numericValue.toLocaleString()
}

function getStartDate() {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 6)
  startDate.setHours(0, 0, 0, 0)
  return startDate
}

function getDashboardUiText(lang: string) {
  if (lang === "ar") {
    return {
      previewWindowLabel: "آخر 7 أيام",
      revenuePeriodDesc: "من الطلبات المسلّمة خلال آخر 7 أيام",
      newOrdersPeriodDesc: "طلبات جديدة خلال آخر 7 أيام",
      recentOrdersDesc: "آخر الطلبات خلال آخر 7 أيام.",
      riskRecentDesc: "حالات الخطورة المسجلة خلال آخر 7 أيام",
      lowStockTitle: "تنبيه المخزون المنخفض",
      lowStockDesc: "المنتجات القريبة من النفاد الآن.",
      noLowStock: "ما كاين حتى منتج قريب ينفد حاليا.",
      unitsLeft: "متبقي",
      widgetErrorTitle: "تعذر تحميل هذا الجزء",
      widgetErrorDesc: "حاول تحديث الصفحة أو راجع البيانات لاحقًا.",
      noRiskEvents: "ما كاين حتى تنبيه خطورة خلال آخر 7 أيام.",
      flaggedAt: "تم التنبيه",
      severityHigh: "مرتفع",
      severityMedium: "متوسط",
      severityLow: "منخفض",
      severityCritical: "حرج",
    }
  }

  if (lang === "fr") {
    return {
      previewWindowLabel: "7 derniers jours",
      revenuePeriodDesc: "Depuis les commandes livrees sur les 7 derniers jours",
      newOrdersPeriodDesc: "Nouvelles commandes sur les 7 derniers jours",
      recentOrdersDesc: "Dernieres commandes sur les 7 derniers jours.",
      riskRecentDesc: "Evenements de risque enregistres sur les 7 derniers jours",
      lowStockTitle: "Alerte stock faible",
      lowStockDesc: "Produits proches de la rupture actuellement.",
      noLowStock: "Aucun produit proche de la rupture pour le moment.",
      unitsLeft: "restants",
      widgetErrorTitle: "Impossible de charger ce widget",
      widgetErrorDesc: "Rechargez la page ou reessayez plus tard.",
      noRiskEvents: "Aucun evenement de risque sur les 7 derniers jours.",
      flaggedAt: "Signale le",
      severityHigh: "Eleve",
      severityMedium: "Moyen",
      severityLow: "Faible",
      severityCritical: "Critique",
    }
  }

  return {
    previewWindowLabel: "Last 7 days",
    revenuePeriodDesc: "From delivered orders in the last 7 days",
    newOrdersPeriodDesc: "New orders in the last 7 days",
    recentOrdersDesc: "Latest orders from the last 7 days.",
    riskRecentDesc: "Risk events recorded in the last 7 days",
    lowStockTitle: "Low Stock Alerts",
    lowStockDesc: "Products that are close to running out right now.",
    noLowStock: "No products are close to running out right now.",
    unitsLeft: "left",
    widgetErrorTitle: "Unable to load this widget",
    widgetErrorDesc: "Refresh the page or try again later.",
    noRiskEvents: "No risk events were recorded in the last 7 days.",
    flaggedAt: "Flagged",
    severityHigh: "High",
    severityMedium: "Medium",
    severityLow: "Low",
    severityCritical: "Critical",
  }
}

function getSeverityLabel(severity: string, uiText: ReturnType<typeof getDashboardUiText>) {
  switch (severity) {
    case "critical":
      return uiText.severityCritical
    case "high":
      return uiText.severityHigh
    case "medium":
      return uiText.severityMedium
    default:
      return uiText.severityLow
  }
}

const getStoreLinkForUser = cache(async (userId: string) => {
  const [storeLink] = await db
    .select()
    .from(sellerStoreLinks)
    .where(eq(sellerStoreLinks.userId, userId))
    .limit(1)

  return storeLink ?? null
})

const getDashboardOverviewData = cache(async (storeId: string) => {
  const startDate = getStartDate()

  const [ordersResult, deliveredResult, returnedResult, revenueResult, expensesResult] = await Promise.all([
    db
      .select({ count: count() })
      .from(orders)
      .where(and(eq(orders.storeId, storeId), gte(orders.createdAt, startDate))),
    db
      .select({ count: count() })
      .from(orders)
      .where(
        and(
          eq(orders.storeId, storeId),
          eq(orders.status, "delivered"),
          gte(orders.createdAt, startDate)
        )
      ),
    db
      .select({ count: count() })
      .from(orders)
      .where(
        and(
          eq(orders.storeId, storeId),
          eq(orders.status, "returned"),
          gte(orders.createdAt, startDate)
        )
      ),
    db
      .select({ total: sum(orders.totalAmount) })
      .from(orders)
      .where(
        and(
          eq(orders.storeId, storeId),
          eq(orders.status, "delivered"),
          gte(orders.createdAt, startDate)
        )
      ),
    db
      .select({ total: sum(expenses.amount) })
      .from(expenses)
      .where(and(eq(expenses.storeId, storeId), gte(expenses.date, startDate))),
  ])

  const totalOrdersCount = ordersResult[0]?.count || 0
  const deliveredCount = deliveredResult[0]?.count || 0
  const returnedCount = returnedResult[0]?.count || 0
  const totalRevenue = Number.parseFloat(String(revenueResult[0]?.total ?? 0)) || 0
  const totalExpenses = Number.parseFloat(String(expensesResult[0]?.total ?? 0)) || 0

  return {
    totalOrdersCount,
    deliveredCount,
    returnedCount,
    deliveredRate: totalOrdersCount > 0 ? Math.round((deliveredCount / totalOrdersCount) * 100) : 0,
    returnedRate: totalOrdersCount > 0 ? Math.round((returnedCount / totalOrdersCount) * 100) : 0,
    totalRevenue,
    totalExpenses,
    netProfit: totalRevenue - totalExpenses,
  }
})

const getChartRows = cache(async (storeId: string) => {
  const startDate = getStartDate()

  return db
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
    .orderBy(sql`date_trunc('day', ${orders.createdAt})`)
})

const getRecentOrdersPreview = cache(async (storeId: string) => {
  const startDate = getStartDate()

  return db
    .select({
      id: orders.id,
      amount: orders.totalAmount,
      status: orders.status,
      date: orders.createdAt,
      customerName: customers.fullName,
    })
    .from(orders)
    .leftJoin(customers, eq(orders.customerId, customers.id))
    .where(and(eq(orders.storeId, storeId), gte(orders.createdAt, startDate)))
    .orderBy(desc(orders.createdAt))
    .limit(5)
})

const getRiskPreview = cache(async (storeId: string) => {
  const startDate = getStartDate()

  const [riskCountResult, riskRows] = await Promise.all([
    db
      .select({ count: count() })
      .from(riskEvents)
      .where(and(eq(riskEvents.storeId, storeId), gte(riskEvents.createdAt, startDate))),
    db
      .select({
        id: riskEvents.id,
        reason: riskEvents.reason,
        severity: riskEvents.severity,
        createdAt: riskEvents.createdAt,
        customerName: customers.fullName,
      })
      .from(riskEvents)
      .leftJoin(customers, eq(riskEvents.customerId, customers.id))
      .where(and(eq(riskEvents.storeId, storeId), gte(riskEvents.createdAt, startDate)))
      .orderBy(desc(riskEvents.createdAt))
      .limit(4),
  ])

  return {
    riskyCount: riskCountResult[0]?.count || 0,
    riskRows,
  }
})

const getLowStockPreview = cache(async (storeId: string) => {
  return db
    .select({
      id: products.id,
      name: products.name,
      stock: products.stock,
      lowStockThreshold: products.lowStockThreshold,
    })
    .from(products)
    .where(
      and(
        eq(products.storeId, storeId),
        eq(products.status, "active"),
        sql`${products.stock} <= ${products.lowStockThreshold}`
      )
    )
    .orderBy(asc(products.stock), asc(products.name))
    .limit(5)
})

function buildChartData(chartRows: { day: string; revenue: string }[], locale: string) {
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

function WidgetErrorCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Card className="border-destructive/20 bg-card/95 shadow-sm">
      <CardContent className="flex min-h-[220px] flex-col items-center justify-center gap-3 p-6 text-center">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <div className="space-y-1">
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function OverviewSectionFallback() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
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
  )
}

function ChartSectionFallback() {
  return (
    <Card className="border-border/60 bg-card/95 shadow-sm">
      <CardHeader className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[220px] w-full rounded-2xl sm:h-[260px]" />
      </CardContent>
    </Card>
  )
}

function TableSectionFallback() {
  return (
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
  )
}

function SideWidgetFallback() {
  return (
    <Card className="border-border/60 bg-card/95 shadow-sm">
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
  )
}

async function OverviewSection({
  activeStoreId,
  copy,
  uiText,
  locale,
}: {
  activeStoreId: string
  copy: Record<string, string>
  uiText: ReturnType<typeof getDashboardUiText>
  locale: string
}) {
  let overviewData: Awaited<ReturnType<typeof getDashboardOverviewData>>

  try {
    overviewData = await getDashboardOverviewData(activeStoreId)
  } catch {
    return <WidgetErrorCard title={uiText.widgetErrorTitle} description={uiText.widgetErrorDesc} />
  }

  const {
    totalOrdersCount,
    deliveredCount,
    returnedCount,
    deliveredRate,
    returnedRate,
    totalRevenue,
    totalExpenses,
    netProfit,
  } = overviewData

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-tight">{copy.totalOrdersTitle}</CardTitle>
            <div className="rounded-lg bg-secondary p-2 text-secondary-foreground">
              <ShoppingBag className="h-8 w-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight">{totalOrdersCount.toLocaleString(locale)}</div>
            <p className="text-xs text-muted-foreground">
              {copy.allOrdersDesc} · {uiText.previewWindowLabel}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-tight">{copy.deliveredTitle}</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight">{deliveredCount.toLocaleString(locale)}</div>
            <p className="text-xs text-muted-foreground">
              {deliveredRate}% {copy.deliveredRateSuffix} · {uiText.previewWindowLabel}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-tight">{copy.returnedTitle}</CardTitle>
            <div className="rounded-lg bg-destructive/10 p-2 text-destructive">
              <ArrowRight className="h-8 w-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight">{returnedCount.toLocaleString(locale)}</div>
            <p className="text-xs text-muted-foreground">
              {returnedRate}% {copy.returnedRateSuffix} · {uiText.previewWindowLabel}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-tight">{copy.revenue}</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <DollarSign className="h-8 w-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight">{formatCurrency(totalRevenue)} DZD</div>
            <p className="text-xs text-muted-foreground">
              {copy.deliveredRevenueDesc} · {uiText.previewWindowLabel}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-tight">{copy.expensesTitle}</CardTitle>
            <div className="rounded-lg bg-muted p-2 text-muted-foreground">
              <Package className="h-8 w-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight">{formatCurrency(totalExpenses)} DZD</div>
            <p className="text-xs text-muted-foreground">
              {copy.trackedExpensesDesc} · {uiText.previewWindowLabel}
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-linear-to-br from-primary via-accent to-accent/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-tight">{copy.netProfitTitle}</CardTitle>
            <div className="rounded-lg bg-accent/15 p-2 text-accent-foreground">
              <TrendingUp className="h-8 w-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight">{formatCurrency(netProfit)} DZD</div>
            <p className="text-xs text-muted-foreground">
              {copy.netProfitDesc} · {uiText.previewWindowLabel}
            </p>
          </CardContent>
        </Card>
      </div>
  )
}

async function SalesTrendSection({
  activeStoreId,
  copy,
  locale,
  uiText,
}: {
  activeStoreId: string
  copy: Record<string, string>
  locale: string
  uiText: ReturnType<typeof getDashboardUiText>
}) {
  let chartRows: Awaited<ReturnType<typeof getChartRows>>

  try {
    chartRows = await getChartRows(activeStoreId)
  } catch {
    return <WidgetErrorCard title={uiText.widgetErrorTitle} description={uiText.widgetErrorDesc} />
  }

  const chartData = buildChartData(chartRows, locale)

  return (
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
  )
}

async function RecentOrdersSection({
  activeStoreId,
  copy,
  lang,
  locale,
  uiText,
}: {
  activeStoreId: string
  copy: Record<string, string>
  lang: string
  locale: string
  uiText: ReturnType<typeof getDashboardUiText>
}) {
  let recentOrdersData: Awaited<ReturnType<typeof getRecentOrdersPreview>>

  try {
    recentOrdersData = await getRecentOrdersPreview(activeStoreId)
  } catch {
    return <WidgetErrorCard title={uiText.widgetErrorTitle} description={uiText.widgetErrorDesc} />
  }

  const tableDir = lang === "ar" ? "rtl" : "ltr"

  return (
    <Card className="border-border/60 bg-card/95 shadow-sm">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>{copy.recentOrders}</CardTitle>
          <CardDescription>{uiText.recentOrdersDesc}</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/${lang}/dashboard/orders`}>
            {copy.viewAll}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="min-w-0 px-0 sm:px-6">
          <Table dir={tableDir} className="min-w-[640px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">{copy.customer}</TableHead>
              <TableHead className="text-start">{copy.status}</TableHead>
              <TableHead className="text-start">{copy.date}</TableHead>
              <TableHead className="text-end">{copy.amount}</TableHead>
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
                  <TableCell className="text-start font-semibold">{order.customerName ?? copy.guest}</TableCell>
                  <TableCell className="text-start">
                    <Badge variant={order.status === "new" ? "default" : "secondary"} className="capitalize">
                      {order.status === "new"
                        ? copy.orderStatusNew
                        : order.status === "delivered"
                          ? copy.orderStatusDelivered
                          : order.status === "processing"
                            ? copy.orderStatusProcessing
                            : order.status === "cancelled" || order.status === "canceled"
                              ? copy.orderStatusCancelled
                              : order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-start">{order.date?.toLocaleDateString(locale)}</TableCell>
                  <TableCell className="text-end font-black tracking-tight">
                    {formatCurrency(order.amount as string)} DZD
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          </Table>
      </CardContent>
    </Card>
  )
}

function SetupCard({
  copy,
  lang,
}: {
  copy: Record<string, string>
  lang: string
}) {
  const setupProgress = 33

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/6 to-accent/8 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle>{copy.setupTitle}</CardTitle>
        <CardDescription>{copy.setupDesc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold tracking-tight text-primary">
              {setupProgress}% {copy.complete}
            </span>
          </div>
          <Progress value={setupProgress} className="h-2" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold line-through text-muted-foreground">
              {copy.createAccount}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Circle className="h-5 w-5 text-muted-foreground" />
            <Link
              href={`/${lang}/dashboard/settings`}
              className="text-sm font-semibold tracking-tight transition-colors hover:text-primary"
            >
              {copy.stepStore}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Circle className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">{copy.stepShipping}</span>
          </div>
          <div className="flex items-center gap-3">
            <Circle className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">{copy.stepPayment}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

async function RiskPreviewSection({
  activeStoreId,
  copy,
  lang,
  locale,
  uiText,
}: {
  activeStoreId: string
  copy: Record<string, string>
  lang: string
  locale: string
  uiText: ReturnType<typeof getDashboardUiText>
}) {
  let riskPreview: Awaited<ReturnType<typeof getRiskPreview>>

  try {
    riskPreview = await getRiskPreview(activeStoreId)
  } catch {
    return <WidgetErrorCard title={uiText.widgetErrorTitle} description={uiText.widgetErrorDesc} />
  }

  const { riskyCount, riskRows } = riskPreview

  return (
    <Card className="border-destructive/20 bg-card/95 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">{copy.riskyTitle}</CardTitle>
        </div>
        <CardDescription>{uiText.riskRecentDesc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {riskyCount > 0 ? `${riskyCount} ${copy.ordersRequireAttention}` : uiText.noRiskEvents}
        </div>
        {riskRows.length > 0 ? (
          <div className="space-y-3">
            {riskRows.map((risk) => (
              <div key={risk.id} className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{risk.customerName ?? copy.guest}</p>
                  <Badge variant={risk.severity === "critical" || risk.severity === "high" ? "destructive" : "secondary"}>
                    {getSeverityLabel(risk.severity, uiText)}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{risk.reason}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {uiText.flaggedAt}: {risk.createdAt?.toLocaleDateString(locale)}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/${lang}/dashboard/radar`}>{copy.reviewCases}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

async function LowStockPreviewSection({
  activeStoreId,
  uiText,
}: {
  activeStoreId: string
  uiText: ReturnType<typeof getDashboardUiText>
}) {
  let rows: Awaited<ReturnType<typeof getLowStockPreview>>

  try {
    rows = await getLowStockPreview(activeStoreId)
  } catch {
    return <WidgetErrorCard title={uiText.widgetErrorTitle} description={uiText.widgetErrorDesc} />
  }

  return (
    <Card className="border-border/60 bg-card/95 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="h-4 w-4" />
          {uiText.lowStockTitle}
        </CardTitle>
        <CardDescription>{uiText.lowStockDesc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/70 bg-muted/15 p-4 text-sm text-muted-foreground">
            {uiText.noLowStock}
          </div>
        ) : (
          rows.map((product) => (
            <div key={product.id} className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/20 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {product.lowStockThreshold} / threshold
                </p>
              </div>
              <Badge variant={Number(product.stock ?? 0) === 0 ? "destructive" : "secondary"}>
                {product.stock} {uiText.unitsLeft}
              </Badge>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default async function DashboardHomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const auth = await requireAuth(lang)
  const dict = await getDashboardDictionary(lang as Locale)
  const copy = dict as Record<string, string>
  const locale = lang === "ar" ? "ar-DZ" : lang === "fr" ? "fr-FR" : "en-US"
  const uiText = getDashboardUiText(lang)
  const storeLink = await getStoreLinkForUser(auth.user.id)
  const viewCategoriesLabel =
    lang === "ar" ? "عرض الأقسام" : lang === "fr" ? "Voir les categories" : "View Categories"

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
    <div className="flex min-w-0 max-w-full flex-col gap-8 overflow-x-hidden">
      <Card className="overflow-hidden border-border/60 bg-gradient-to-br from-card via-card to-accent/50 shadow-sm">
        <CardContent className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Badge variant="secondary" className="w-fit gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-tight">
              <Activity className="h-3.5 w-3.5" />
              {copy.overviewBadge}
            </Badge>
            <div>
              <h1 className="text-2xl font-black tracking-tighter sm:text-3xl">
                {copy.greeting} {auth.userData?.first_name || copy.user}
              </h1>
              <p className="mt-1 max-w-2xl text-muted-foreground">{copy.welcomeDesc}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="lg" variant="outline" asChild className="py-6">
              <Link href={`/${lang}/dashboard/products/new`}>
                <Plus className="mr-2 h-4 w-4" />
                {copy.quickAddProduct}
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-linear-to-br py-6 from-primary to-accent dark:text-foreground">
              <Link href={`/${lang}/dashboard/products/categories`}>
                <ArrowRight className="mr-2 h-4 w-4" />
                {viewCategoriesLabel}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Suspense fallback={<OverviewSectionFallback />}>
        <OverviewSection
          activeStoreId={storeLink.storeId}
          copy={copy}
          uiText={uiText}
          locale={locale}
        />
      </Suspense>

      <div className="grid min-w-0 max-w-full gap-4 md:grid-cols-7 lg:gap-8">
        <div className="min-w-0 space-y-8 md:col-span-4 lg:col-span-5">
          <Suspense fallback={<ChartSectionFallback />}>
            <SalesTrendSection
              activeStoreId={storeLink.storeId}
              copy={copy}
              locale={locale}
              uiText={uiText}
            />
          </Suspense>

          <Suspense fallback={<TableSectionFallback />}>
            <RecentOrdersSection
              activeStoreId={storeLink.storeId}
              copy={copy}
              lang={lang}
              locale={locale}
              uiText={uiText}
            />
          </Suspense>
        </div>

        <div className="min-w-0 space-y-8 md:col-span-3 lg:col-span-2">
          <SetupCard copy={copy} lang={lang} />

          <Suspense fallback={<SideWidgetFallback />}>
            <RiskPreviewSection
              activeStoreId={storeLink.storeId}
              copy={copy}
              lang={lang}
              locale={locale}
              uiText={uiText}
            />
          </Suspense>

          <Suspense fallback={<SideWidgetFallback />}>
            <LowStockPreviewSection activeStoreId={storeLink.storeId} uiText={uiText} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
