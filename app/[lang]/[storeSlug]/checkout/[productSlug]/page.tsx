import Link from "next/link"
import { notFound } from "next/navigation"
import { and, desc, eq } from "drizzle-orm"
import { ArrowLeft, ImageIcon, Lock, PackageCheck, ShieldCheck, Truck } from "lucide-react"
import { db } from "@/db"
import { productImages, products, stores } from "@/db/schema"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickCodCheckoutForm } from "@/components/storefront/quick-cod-checkout-form"
import { getStorefrontDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import Image from 'next/image';

function formatMoney(value: string | number, currency = "DZD") {
  return `${Math.round(Number(value || 0)).toLocaleString()} ${currency}`
}

function parseQuantity(value?: string) {
  const parsed = Number.parseInt(value || "1", 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function parseSelectedOptions(raw?: string) {
  try {
    const parsed = JSON.parse(raw || "[]")
    if (!Array.isArray(parsed)) return []

    return parsed
      .map((item) => ({
        name: String(item?.name || "").trim(),
        value: String(item?.value || "").trim(),
      }))
      .filter((item) => item.name && item.value)
  } catch {
    return []
  }
}

export default async function QuickCodCheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; storeSlug: string; productSlug: string }>
  searchParams: Promise<{ quantity?: string; options?: string }>
}) {
  const { lang, storeSlug, productSlug } = await params
  const resolvedSearchParams = await searchParams
  const quantity = parseQuantity(resolvedSearchParams.quantity)
  const dict = await getStorefrontDictionary(lang as Locale)
  const copy = dict.storefront.checkout

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

  const product = await db.query.products.findFirst({
    where: and(eq(products.storeId, store.id), eq(products.slug, productSlug), eq(products.status, "active")),
    columns: {
      id: true,
      name: true,
      slug: true,
      price: true,
      stock: true,
    },
    with: {
      images: {
        columns: {
          url: true,
        },
        orderBy: [desc(productImages.isPrimary), desc(productImages.createdAt)],
        limit: 1,
      },
      options: {
        columns: {
          id: true,
          name: true,
          values: true,
          isRequired: true,
        },
      },
    },
  })

  if (!product || Number(product.stock || 0) <= 0) notFound()

  const selectedFromQuery = parseSelectedOptions(resolvedSearchParams.options)
  const selectedOptions =
    selectedFromQuery.length > 0
      ? selectedFromQuery
      : product.options
          .map((option) => ({
            name: option.name,
            value: Array.isArray(option.values) ? String(option.values[0] || "") : "",
          }))
          .filter((option) => option.name && option.value)
  const safeQuantity = Math.min(quantity, Number(product.stock || 1))
  const subtotal = Number(product.price || 0) * safeQuantity
  const image = product.images[0]?.url

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" className="rounded-full" asChild>
          <Link href={`/${lang}/${store.slug}/products/${product.slug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {copy.backToProduct}
          </Link>
        </Button>
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
          {copy.eyebrow}
        </Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:gap-12">
        <section className="space-y-7">
          <div className="space-y-3">
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{copy.title}</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {copy.description}
            </p>
          </div>

          <Alert className="rounded-2xl border-primary/20 bg-primary/5 px-4 py-3">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <AlertTitle>{copy.alertTitle}</AlertTitle>
            <AlertDescription>
              {copy.alertBody}
            </AlertDescription>
          </Alert>

          <Card className="border-border/60 bg-card shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <QuickCodCheckoutForm
                actionContext={{ lang, storeSlug: store.slug, productSlug: product.slug }}
                quantity={safeQuantity}
                selectedOptions={selectedOptions}
                copy={copy.form}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: copy.trust.secureTitle, body: copy.trust.secureBody, icon: Lock },
              { title: copy.trust.confirmationTitle, body: copy.trust.confirmationBody, icon: PackageCheck },
              { title: copy.trust.deliveryTitle, body: copy.trust.deliveryBody, icon: Truck },
            ].map((item) => {
              const Icon = item.icon

              return (
                <Card key={item.title} className="border-border/60 bg-card/95">
                  <CardContent className="space-y-3 p-4 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <aside className="lg:sticky lg:top-32">
          <Card className="overflow-hidden border-border/60 bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">{copy.summary}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-5 pt-0 sm:p-6 sm:pt-0">
              <div className="flex gap-4">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
                  {image ? (
                    <Image
                      src={image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                      width={500} // Adjust width and height as needed
                      height={500}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <h2 className="line-clamp-2 text-lg font-black leading-tight">{product.name}</h2>
                  <p className="text-sm text-muted-foreground">{copy.quantity}: {safeQuantity}</p>
                  <p className="text-lg font-black text-primary">{formatMoney(product.price, store.currency || "DZD")}</p>
                </div>
              </div>

              {selectedOptions.length > 0 ? (
                <div className="space-y-3 rounded-2xl bg-muted/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{copy.selectedOptions}</p>
                  <div className="grid gap-2">
                    {selectedOptions.map((option) => (
                      <div key={`${option.name}-${option.value}`} className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">{option.name}</span>
                        <span className="font-semibold">{option.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="space-y-3 border-t border-border/60 pt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{copy.subtotal}</span>
                  <span className="font-semibold">{formatMoney(subtotal, store.currency || "DZD")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{copy.shipping}</span>
                  <Badge variant="secondary" className="rounded-full">{copy.shippingHandled}</Badge>
                </div>
                <div className="flex items-end justify-between border-t border-border/60 pt-4">
                  <span className="text-lg font-bold">{copy.total}</span>
                  <span className="text-2xl font-black text-primary">{formatMoney(subtotal, store.currency || "DZD")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
