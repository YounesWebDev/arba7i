import Link from "next/link"
import { notFound } from "next/navigation"
import { and, eq } from "drizzle-orm"
import { CheckCircle2, HeadphonesIcon, PackageCheck, PhoneCall, ShieldCheck, Truck } from "lucide-react"
import { db } from "@/db"
import { orders, stores } from "@/db/schema"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStorefrontDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"

function formatMoney(value: string | number, currency = "DZD") {
  return `${Math.round(Number(value || 0)).toLocaleString()} ${currency}`
}

function shortOrderId(value: string) {
  return `#${value.slice(0, 8).toUpperCase()}`
}

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ lang: string; storeSlug: string; orderId: string }>
}) {
  const { lang, storeSlug, orderId } = await params
  const dict = await getStorefrontDictionary(lang as Locale)
  const copy = dict.storefront.success

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

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, orderId), eq(orders.storeId, store.id)),
    columns: {
      id: true,
      totalAmount: true,
      status: true,
      createdAt: true,
    },
    with: {
      customer: {
        columns: {
          fullName: true,
          phone: true,
          wilaya: true,
          commune: true,
        },
      },
      items: {
        columns: {
          quantity: true,
          price: true,
          selectedOptions: true,
        },
        with: {
          product: {
            columns: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  })

  if (!order) notFound()

  const primaryItem = order.items[0]
  const selectedOptions = Array.isArray(primaryItem?.selectedOptions)
    ? (primaryItem.selectedOptions as Array<{ name?: string; value?: string }>).filter((item) => item.name && item.value)
    : []

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:gap-12">
        <section className="space-y-8">
          <div className="space-y-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <CheckCircle2 className="h-11 w-11" />
            </div>
            <div className="space-y-3">
              <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
                {copy.eyebrow}
              </Badge>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">{copy.title}</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {copy.description}
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-muted px-4 py-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{copy.orderId}</span>
              <span className="font-black text-primary">{shortOrderId(order.id)}</span>
            </div>
          </div>

          <Alert className="rounded-2xl border-primary/20 bg-primary/5 px-4 py-3">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <AlertTitle>{copy.alertTitle}</AlertTitle>
            <AlertDescription>
              {copy.alertBody}
            </AlertDescription>
          </Alert>

          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight">{copy.nextTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: copy.steps.confirmationTitle, body: copy.steps.confirmationBody, icon: PhoneCall },
                { title: copy.steps.packageTitle, body: copy.steps.packageBody, icon: PackageCheck },
                { title: copy.steps.deliveryTitle, body: copy.steps.deliveryBody, icon: Truck },
                { title: copy.steps.supportTitle, body: copy.steps.supportBody, icon: HeadphonesIcon },
              ].map((step) => {
                const Icon = step.icon

                return (
                  <Card key={step.title} className="border-border/60 bg-card/95">
                    <CardContent className="flex gap-4 p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 rounded-2xl px-8 font-bold" asChild>
              <Link href={`/${lang}/${store.slug}`}>{copy.backToStore}</Link>
            </Button>
            {primaryItem?.product?.slug ? (
              <Button variant="outline" className="h-12 rounded-2xl px-8 font-bold" asChild>
                <Link href={`/${lang}/${store.slug}/products/${primaryItem.product.slug}`}>{copy.viewProduct}</Link>
              </Button>
            ) : null}
          </div>
        </section>

        <aside className="lg:sticky lg:top-32">
          <Card className="border-border/60 bg-card shadow-sm">
            <CardHeader>
              <CardTitle>{copy.summary}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-5 pt-0 sm:p-6 sm:pt-0">
              <div className="space-y-2 rounded-2xl bg-muted/30 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{copy.status}</span>
                  <Badge className="rounded-full">{order.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{copy.customer}</span>
                  <span className="font-semibold">{order.customer.fullName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{copy.phone}</span>
                  <span className="font-semibold">{order.customer.phone}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{copy.location}</span>
                  <span className="text-right font-semibold">{order.customer.wilaya}, {order.customer.commune}</span>
                </div>
              </div>

              {primaryItem ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="font-black">{primaryItem.product.name}</h2>
                      <p className="text-sm text-muted-foreground">{copy.quantity}: {primaryItem.quantity}</p>
                    </div>
                    <span className="font-black text-primary">{formatMoney(primaryItem.price, store.currency || "DZD")}</span>
                  </div>

                  {selectedOptions.length > 0 ? (
                    <div className="space-y-2 rounded-2xl bg-muted/30 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{copy.selectedOptions}</p>
                      {selectedOptions.map((option) => (
                        <div key={`${option.name}-${option.value}`} className="flex justify-between gap-4 text-sm">
                          <span className="text-muted-foreground">{option.name}</span>
                          <span className="font-semibold">{option.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="flex items-end justify-between border-t border-border/60 pt-5">
                <span className="text-lg font-bold">{copy.total}</span>
                <span className="text-2xl font-black">{formatMoney(order.totalAmount, store.currency || "DZD")}</span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
