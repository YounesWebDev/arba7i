import Link from "next/link"
import { notFound } from "next/navigation"
import { and, desc, eq, ne } from "drizzle-orm"
import {
  CheckCircle,
  ChevronRight,
  ImageIcon,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react"
import { db } from "@/db"
import { productImages, products, stores } from "@/db/schema"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { AddToCartButton } from "@/components/storefront/add-to-cart-button"
import { ProductPurchasePanel } from "@/components/storefront/product-purchase-panel"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getStorefrontDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import Image from 'next/image';

function formatMoney(value: string | number, currency = "DZD") {
  return `${Math.round(Number(value || 0)).toLocaleString()} ${currency}`
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ lang: string; storeSlug: string; productSlug: string }>
}) {
  const { lang, storeSlug, productSlug } = await params
  const dict = await getStorefrontDictionary(lang as Locale)
  const copy = dict.storefront.product

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
    where: and(eq(products.slug, productSlug), eq(products.storeId, store.id), ne(products.status, "draft"), ne(products.status, "archived")),
    columns: {
      id: true,
      categoryId: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      comparePrice: true,
      stock: true,
      sku: true,
      status: true,
    },
    with: {
      category: {
        columns: {
          name: true,
          slug: true,
        },
      },
      images: {
        columns: {
          id: true,
          url: true,
        },
        orderBy: desc(productImages.isPrimary),
      },
      options: true,
      variants: true,
    },
  })

  if (!product) notFound()

  const relatedProducts = await db.query.products.findMany({
    where: and(eq(products.storeId, store.id), eq(products.status, "active"), ne(products.id, product.id)),
    columns: {
      id: true,
      slug: true,
      name: true,
      price: true,
    },
    with: {
      images: {
        columns: {
          url: true,
        },
        orderBy: desc(productImages.isPrimary),
        limit: 1,
      },
    },
    orderBy: desc(products.createdAt),
    limit: 4,
  })

  const normalizedImages = Array.isArray(product.images)
    ? product.images.filter((image) => Boolean(image?.url))
    : []
  const normalizedOptions = Array.isArray(product.options)
    ? product.options.map((option) => ({
        ...option,
        values: Array.isArray(option.values)
          ? option.values.filter((value): value is string => typeof value === "string" && value.trim().length > 0)
          : [],
      }))
    : []
  const normalizedRelatedProducts = Array.isArray(relatedProducts)
    ? relatedProducts.map((item) => ({
        ...item,
        images: Array.isArray(item.images) ? item.images.filter((image) => Boolean(image?.url)) : [],
      }))
    : []

  const primaryImage = normalizedImages[0]
  const secondaryImages = normalizedImages.slice(1, 5)
  const hasStock = Number(product.stock || 0) > 0

  return (
    <div className="space-y-8 px-4 py-5 sm:space-y-10 sm:px-6 sm:py-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/${lang}/${store.slug}`} className="transition-colors hover:text-primary">
          {store.name}
        </Link>
        <ChevronRight className="h-4 w-4" />
        {product.category ? (
          <>
            <Link
              href={`/${lang}/${store.slug}/category/${product.category.slug}`}
              className="transition-colors hover:text-primary"
            >
              {product.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        ) : null}
        <span className="font-semibold text-foreground">{product.name}</span>
      </nav>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-8">
        <div className="space-y-4">
          <Card className="overflow-hidden border-border/60 bg-card">
            <CardContent className="p-0">
              <div className="relative aspect-square bg-muted">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                    width={500} // Adjust width and height as needed
                    height={500}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {secondaryImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {secondaryImages.map((image, index) => (
                <Card key={image.id} className="overflow-hidden border-border/60">
                  <CardContent className="p-0">
                    <Image
                      src={image.url}
                      alt={`${product.name} gallery ${index + 2}`}
                      className="aspect-square w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width={500} // Adjust width and height as needed
                      height={500}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <Card className="border-border/60 bg-card shadow-sm">
            <CardContent className="space-y-6 p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {product.status}
                  </Badge>
                  {product.category ? (
                    <Badge variant="outline" className="rounded-full">
                      {product.category.name}
                    </Badge>
                  ) : null}
                  {product.sku ? (
                    <Badge variant="outline" className="rounded-full">
                      SKU: {product.sku}
                    </Badge>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">{product.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span>{copy.storefrontPreview}</span>
                    <span>{hasStock ? `${product.stock} ${copy.inStock}` : copy.outOfStock}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {product.comparePrice ? (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatMoney(product.comparePrice, store.currency || "DZD")}
                    </p>
                  ) : null}
                  <p className="text-2xl font-black sm:text-3xl">{formatMoney(product.price, store.currency || "DZD")}</p>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.description || copy.noDescription}
                </p>
              </div>

              <Separator />

              <ProductPurchasePanel
                product={{ id: product.id, slug: product.slug, name: product.name, price: Number(product.price), stock: Number(product.stock || 0), image: primaryImage?.url }}
                options={normalizedOptions.map((option) => ({ ...option, values: option.values }))}
                currency={store.currency}
                checkoutHref={`/${lang}/${store.slug}/checkout/${product.slug}`}
                copy={{
                  quantity: copy.quantity,
                  addToCart: copy.addToCart,
                  orderNow: copy.orderNow,
                  unavailable: copy.unavailable,
                  yourDetails: copy.yourDetails,
                  fullName: copy.fullName,
                  fullNamePlaceholder: copy.fullNamePlaceholder,
                  wilaya: copy.wilaya,
                  wilayaPlaceholder: copy.wilayaPlaceholder,
                  commune: copy.commune,
                  communePlaceholder: copy.communePlaceholder,
                  shipment: copy.shipment,
                  subtotal: copy.subtotal,
                  total: copy.total,
                  orderSummary: copy.orderSummary,
                }}
              />
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { title: copy.fastShipping, body: "Primary purchase details render first, delivery reassurance stays visible.", icon: Truck },
              { title: copy.secureCod, body: "Simple order flow with clear price and quantity controls.", icon: ShieldCheck },
              { title: copy.qualityChecked, body: "Storefront uses only published product data and preview-safe recommendations.", icon: CheckCircle },
            ].map((item) => {
              const Icon = item.icon

              return (
                <Card key={item.title} className="border-border/60 bg-card/95">
                  <CardContent className="space-y-3 p-4 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Tabs defaultValue="description" className="gap-6">
        <TabsList variant="line" className="w-full justify-start overflow-x-auto p-0">
          <TabsTrigger value="description" className="px-0 py-3">
            {copy.description}
          </TabsTrigger>
          <TabsTrigger value="details" className="px-0 py-3">
            {copy.details}
          </TabsTrigger>
          <TabsTrigger value="shipping" className="px-0 py-3">
            {copy.shipping}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <Card className="border-border/60 bg-card">
            <CardContent className="space-y-4 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">{copy.productDescription}</CardTitle>
              <p className="leading-relaxed text-muted-foreground">
                {product.description || copy.noLongDescription}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card className="border-border/60 bg-card">
            <CardContent className="space-y-4 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">{copy.productDetails}</CardTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-muted/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{copy.category}</p>
                  <p className="mt-2 font-semibold">{product.category?.name || copy.uncategorized}</p>
                </div>
                <div className="rounded-2xl bg-muted/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{copy.inventory}</p>
                  <p className="mt-2 font-semibold">{hasStock ? `${product.stock} units available` : copy.outOfStock}</p>
                </div>
                <div className="rounded-2xl bg-muted/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{copy.sku}</p>
                  <p className="mt-2 font-semibold">{product.sku || copy.notAssigned}</p>
                </div>
                <div className="rounded-2xl bg-muted/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{copy.variants}</p>
                  <p className="mt-2 font-semibold">{product.variants.length ? `${product.variants.length} variant(s)` : copy.noVariants}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card className="border-border/60 bg-card">
            <CardContent className="space-y-4 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">{copy.shippingReturns}</CardTitle>
              <p className="leading-relaxed text-muted-foreground">
                {copy.shippingBody}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {normalizedRelatedProducts.length > 0 ? (
        <section className="space-y-4">
          <div className="space-y-1">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]">
              {copy.relatedProducts}
            </Badge>
            <h2 className="text-2xl font-black tracking-tight">{copy.youMayAlsoLike}</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {normalizedRelatedProducts.map((item) => {
              const image = item.images[0]

              return (
                <Link key={item.id} href={`/${lang}/${store.slug}/products/${item.slug}`} className="group">
                  <Card className="h-full overflow-hidden border-border/60 bg-card transition-colors group-hover:border-primary/30">
                    <CardContent className="space-y-4 p-0">
                      <div className="aspect-4/3 overflow-hidden bg-muted">
                        {image ? (
                          <Image
                            src={image.url}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 p-4">
                        <h3 className="line-clamp-2 font-bold">{item.name}</h3>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-lg font-black">{formatMoney(item.price, store.currency || "DZD")}</p>
                          <AddToCartButton
                            product={{ id: item.id, slug: item.slug, name: item.name, price: Number(item.price), image: image?.url }}
                            label={copy.addToCart}
                            size="sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      ) : null}
    </div>
  )
}
