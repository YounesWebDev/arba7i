import Link from "next/link"
import { notFound } from "next/navigation"
import { and, desc, eq } from "drizzle-orm"
import { ArrowLeft, MapPin, PackageCheck, ShieldAlert, Store, UserRound } from "lucide-react"
import { db } from "@/db"
import { orders, riskEvents, sellerStoreLinks, shipments } from "@/db/schema"
import type { Locale } from "@/i18n-config"
import { requirePermission } from "@/lib/auth-guard"
import { getOrdersDictionary } from "@/lib/dictionary"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderNotesForm } from "@/components/orders/order-notes-form"
import { OrderStatusForm } from "@/components/orders/order-status-form"

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

function statusVariant(status: string) {
  if (status === "delivered" || status === "confirmed") return "default"
  if (status === "canceled" || status === "returned") return "destructive"
  return "secondary"
}

function normalizeOptions(value: unknown): Array<{ name: string; value: string }> {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => ({
      name: String(item?.name || "").trim(),
      value: String(item?.value || "").trim(),
    }))
    .filter((item) => item.name && item.value)
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  const auth = await requirePermission(lang, "confirm_orders")
  const dict = await getOrdersDictionary(lang as Locale)
  const copy = dict.detail
  const locale = getLocale(lang)
  const statuses = ORDER_STATUS_KEYS.map((key) => ({ value: key, label: dict.statuses[key] }))

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

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, id), eq(orders.storeId, storeLink.storeId)),
    columns: {
      id: true,
      totalAmount: true,
      status: true,
      internalNotes: true,
      createdAt: true,
      updatedAt: true,
    },
    with: {
      customer: true,
      items: {
        columns: {
          id: true,
          quantity: true,
          price: true,
          selectedOptions: true,
        },
        with: {
          product: {
            columns: {
              name: true,
              sku: true,
              slug: true,
            },
          },
          variant: {
            columns: {
              name: true,
              sku: true,
            },
          },
        },
      },
    },
  })

  if (!order) notFound()
  const orderStatus = order.status || "new"

  const [orderRisks, orderShipments] = await Promise.all([
    db
      .select()
      .from(riskEvents)
      .where(and(eq(riskEvents.storeId, storeLink.storeId), eq(riskEvents.orderId, order.id)))
      .orderBy(desc(riskEvents.createdAt)),
    db.select().from(shipments).where(eq(shipments.orderId, order.id)).orderBy(desc(shipments.createdAt)),
  ])

  return (
    <div className="flex min-w-0 flex-col gap-8" dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-gradient-to-br from-card via-card to-accent/50 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <Button variant="outline" className="w-fit rounded-full" asChild>
            <Link href={`/${lang}/dashboard/orders`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {copy.back}
            </Link>
          </Button>
          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-tight">
            {copy.eyebrow}
          </Badge>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl">{shortOrderId(order.id)}</h1>
            <p className="text-sm text-muted-foreground">{order.createdAt?.toLocaleString(locale)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Badge variant={statusVariant(orderStatus)} className="w-fit rounded-full px-3 py-1">
            {dict.statuses[orderStatus as keyof typeof dict.statuses] || orderStatus}
          </Badge>
          <OrderStatusForm
            lang={lang}
            orderId={order.id}
            currentStatus={orderStatus}
            statuses={statuses}
            submit={copy.saveStatus}
            saving={copy.saving}
          />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Tabs defaultValue="overview" className="gap-6">
          <TabsList variant="line" className="w-full justify-start overflow-x-auto p-0">
            <TabsTrigger value="overview" className="px-0 py-3">{copy.tabs.overview}</TabsTrigger>
            <TabsTrigger value="products" className="px-0 py-3">{copy.tabs.products}</TabsTrigger>
            <TabsTrigger value="risk" className="px-0 py-3">{copy.tabs.risk}</TabsTrigger>
            <TabsTrigger value="notes" className="px-0 py-3">{copy.tabs.notes}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-border/60 bg-card/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserRound className="h-5 w-5 text-primary" />
                    {copy.customer}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4"><span className="text-muted-foreground">{copy.customer}</span><span className="font-semibold">{order.customer.fullName}</span></div>
                  <div className="flex justify-between gap-4"><span className="text-muted-foreground">Phone</span><span className="font-semibold">{order.customer.phone}</span></div>
                  <div className="flex justify-between gap-4"><span className="text-muted-foreground">Risk</span><Badge variant="secondary">{order.customer.riskScore}</Badge></div>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {copy.address}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4"><span className="text-muted-foreground">Wilaya</span><span className="font-semibold">{order.customer.wilaya}</span></div>
                  <div className="flex justify-between gap-4"><span className="text-muted-foreground">Commune</span><span className="font-semibold">{order.customer.commune}</span></div>
                  <Separator />
                  <p className="leading-relaxed text-muted-foreground">{order.customer.address}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/60 bg-card/95">
              <CardHeader>
                <CardTitle>{copy.shipping}</CardTitle>
                <CardDescription>{copy.noShipment}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {orderShipments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{copy.noShipment}</p>
                ) : (
                  orderShipments.map((shipment) => (
                    <div key={shipment.id} className="rounded-2xl border border-border/60 p-4 text-sm">
                      <div className="flex flex-wrap justify-between gap-3">
                        <span className="font-semibold">{shipment.carrier}</span>
                        <Badge>{shipment.status}</Badge>
                      </div>
                      <p className="mt-2 text-muted-foreground">{shipment.trackingNumber || "-"}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card className="border-border/60 bg-card/95">
              <CardHeader>
                <CardTitle>{copy.products}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) => {
                  const options = normalizeOptions(item.selectedOptions)
                  return (
                    <div key={item.id} className="rounded-2xl border border-border/60 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="font-black">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.product.sku || item.variant?.sku || "-"}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black">{formatMoney(item.price)}</p>
                          <p className="text-sm text-muted-foreground">{copy.quantity}: {item.quantity}</p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{copy.selectedOptions}</p>
                        {options.length === 0 ? (
                          <p className="text-sm text-muted-foreground">{copy.noOptions}</p>
                        ) : (
                          options.map((option) => (
                            <div key={`${item.id}-${option.name}`} className="flex justify-between gap-4 text-sm">
                              <span className="text-muted-foreground">{option.name}</span>
                              <span className="font-semibold">{option.value}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk">
            <Card className="border-border/60 bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-primary" />
                  {copy.risk}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orderRisks.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{copy.noRisks}</p>
                ) : (
                  orderRisks.map((riskEvent) => (
                    <div key={riskEvent.id} className="rounded-2xl border border-border/60 p-4">
                      <div className="flex flex-wrap justify-between gap-3">
                        <Badge variant={riskEvent.severity === "high" || riskEvent.severity === "critical" ? "destructive" : "secondary"}>
                          {riskEvent.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{riskEvent.createdAt?.toLocaleString(locale)}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{riskEvent.reason}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card className="border-border/60 bg-card/95">
              <CardHeader>
                <CardTitle>{copy.notes}</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderNotesForm
                  lang={lang}
                  orderId={order.id}
                  defaultValue={order.internalNotes || ""}
                  placeholder={copy.notesPlaceholder}
                  submit={copy.saveNotes}
                  saving={copy.saving}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <aside className="space-y-4">
          <Card className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackageCheck className="h-5 w-5 text-primary" />
                {copy.summary}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between gap-4"><span className="text-muted-foreground">{copy.status}</span><Badge variant={statusVariant(orderStatus)}>{dict.statuses[orderStatus as keyof typeof dict.statuses] || orderStatus}</Badge></div>
              <div className="flex justify-between gap-4"><span className="text-muted-foreground">{copy.products}</span><span className="font-semibold">{order.items.length}</span></div>
              <Separator />
              <div className="flex items-end justify-between gap-4">
                <span className="text-lg font-bold">{copy.total}</span>
                <span className="text-2xl font-black">{formatMoney(order.totalAmount)}</span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
