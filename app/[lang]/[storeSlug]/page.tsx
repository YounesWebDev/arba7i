import Link from "next/link"
import { notFound } from "next/navigation"
import { and, desc, eq, gte, ilike, isNull, lte, or } from "drizzle-orm"
import {
  ArrowRight,
  CreditCard,
  HeadphonesIcon,
  ImageIcon,
  Menu,
  Search,
  Store,
  Truck,
} from "lucide-react"
import { db } from "@/db"
import { categories, productImages, products, storeBanners, stores } from "@/db/schema"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/storefront/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getStorefrontDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import Image from 'next/image';

function formatMoney(value: string | number, currency = "DZD") {
  return `${Math.round(Number(value || 0)).toLocaleString()} ${currency}`
}

function buildStoreHref(lang: string, storeSlug: string, q?: string) {
  const params = new URLSearchParams()

  if (q) params.set("q", q)

  const queryString = params.toString()
  return queryString ? `/${lang}/${storeSlug}?${queryString}` : `/${lang}/${storeSlug}`
}

export default async function StoreHomePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; storeSlug: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const { lang, storeSlug } = await params
  const { q = "" } = await searchParams
  const dict = await getStorefrontDictionary(lang as Locale)
  const copy = dict.storefront

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

  const now = new Date()
  const productFilters = and(
    eq(products.storeId, store.id),
    eq(products.status, "active"),
    q ? ilike(products.name, `%${q}%`) : undefined
  )

  const [activeBanners, storeCategories, featuredProducts, catalogProducts] = await Promise.all([
    db
      .select({
        title: storeBanners.title,
        subtitle: storeBanners.subtitle,
        imageUrl: storeBanners.imageUrl,
        buttonText: storeBanners.buttonText,
        buttonLink: storeBanners.buttonLink,
        position: storeBanners.position,
      })
      .from(storeBanners)
      .where(
        and(
          eq(storeBanners.storeId, store.id),
          eq(storeBanners.isActive, true),
          or(isNull(storeBanners.startsAt), lte(storeBanners.startsAt, now)),
          or(isNull(storeBanners.endsAt), gte(storeBanners.endsAt, now))
        )
      )
      .orderBy(desc(storeBanners.createdAt))
      .limit(6),
    db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      })
      .from(categories)
      .where(eq(categories.storeId, store.id))
      .orderBy(desc(categories.createdAt))
      .limit(8),
    db.query.products.findMany({
      where: and(eq(products.storeId, store.id), eq(products.status, "active")),
      columns: {
        id: true,
        slug: true,
        name: true,
        price: true,
      },
      with: {
        category: {
          columns: {
            name: true,
          },
        },
        images: {
          columns: {
            url: true,
          },
          orderBy: [desc(productImages.isPrimary), desc(productImages.createdAt)],
          limit: 1,
        },
      },
      orderBy: desc(products.createdAt),
      limit: 4,
    }),
    db.query.products.findMany({
      where: productFilters,
      columns: {
        id: true,
        slug: true,
        name: true,
        price: true,
        status: true,
      },
      with: {
        category: {
          columns: {
            name: true,
          },
        },
        images: {
          columns: {
            url: true,
          },
          orderBy: [desc(productImages.isPrimary), desc(productImages.createdAt)],
          limit: 1,
        },
      },
      orderBy: desc(products.createdAt),
      limit: 12,
    }),
  ])

  const heroBanner = activeBanners.find((item) => item.position === "hero")
  const promoBanners = activeBanners.filter((item) => item.position === "promo")
  const topStripBanner = activeBanners.find((item) => item.position === "top_strip")
  const bottomBanner = activeBanners.find((item) => item.position === "bottom")
  const searchPlaceholder = `Search ${store.name} products`

  return (
    <div className="space-y-10 px-4 py-5 sm:space-y-12 sm:px-6 sm:py-8">
      {topStripBanner ? (
        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              {topStripBanner.title ? <p className="font-semibold">{topStripBanner.title}</p> : null}
              {topStripBanner.subtitle ? (
                <p className="text-sm text-muted-foreground">{topStripBanner.subtitle}</p>
              ) : null}
            </div>
            {topStripBanner.buttonLink && topStripBanner.buttonText ? (
              <Button className="rounded-full" asChild>
                <Link href={topStripBanner.buttonLink}>{topStripBanner.buttonText}</Link>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.7fr)]">
        <Card className="overflow-hidden border-border/60 bg-card shadow-sm">
          <CardContent className="grid gap-6 p-4 sm:p-6 md:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] md:gap-8 md:p-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]">
                  <Store className="mr-1 h-3.5 w-3.5" />
                  {store.name}
                </Badge>
                <div className="space-y-2">
                  <h1 className="text-2xl font-black tracking-tighter text-foreground sm:text-3xl lg:text-4xl">
                    {heroBanner?.title || `${store.name} storefront`}
                  </h1>
                  <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                    {heroBanner?.subtitle ||
                      "Browse active products, search quickly, and jump into category pages without heavy storefront overhead."}
                  </p>
                </div>
              </div>

              <form action={`/${lang}/${store.slug}/search`} method="get" className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    name="q"
                    defaultValue={q}
                    placeholder={searchPlaceholder}
                    className="h-12 rounded-full border-border/60 bg-background pl-11"
                  />
                </div>
                <Button type="submit" className="h-12 rounded-full px-6 font-semibold">
                  Search
                </Button>
              </form>

              <div id="store-categories" className="flex flex-wrap items-center gap-3 scroll-mt-32">
                <Sheet>
                  <SheetTrigger className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full border border-border bg-background px-2.5 text-sm font-medium transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden">
                      <Menu className="mr-2 h-4 w-4" />
                      Categories
                  </SheetTrigger>
                  <SheetContent side={lang === "ar" ? "left" : "right"}>
                    <SheetHeader>
                      <SheetTitle>Categories</SheetTitle>
                      <SheetDescription>Jump between product groups without blocking the first render.</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-3 px-4 pb-4">
                      <Link
                        href={buildStoreHref(lang, store.slug, q)}
                        className="rounded-2xl border border-primary bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition-colors"
                      >
                        All products
                      </Link>
                      {storeCategories.map((item) => (
                        <Link
                          key={item.id}
                          href={`/${lang}/${store.slug}/category/${item.slug}`}
                          className="rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold transition-colors hover:border-primary/30"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="hidden max-w-full flex-wrap gap-2 md:flex">
                  <Link
                    href={buildStoreHref(lang, store.slug, q)}
                    className="inline-flex rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors"
                  >
                    All products
                  </Link>
                  {storeCategories.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${lang}/${store.slug}/category/${item.slug}`}
                      className="inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/30"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/50 bg-muted/40 sm:rounded-[2rem]">
              {heroBanner?.imageUrl ? (
                <Image
                  src={heroBanner.imageUrl}
                  alt={heroBanner.title || store.name}
                  className="h-full min-h-[220px] w-full object-cover sm:min-h-[280px]"
                  loading="eager"
                  decoding="async"
                  width={500} // Adjust width and height as needed
                  height={500}
                />
              ) : (
                <div className="flex h-full min-h-[220px] flex-col justify-between bg-gradient-to-br from-primary to-accent p-5 text-primary-foreground sm:min-h-[280px] sm:p-8">
                  <div className="space-y-3">
                    <Badge className="w-fit rounded-full bg-white/15 text-primary-foreground hover:bg-white/15">
                      {copy.home.featuredStore}
                    </Badge>
                    <h2 className="text-xl font-black tracking-tight sm:text-2xl">{store.name}</h2>
                    <p className="max-w-xs text-sm text-primary-foreground/80">
                      Active catalog, lightweight browsing, and a storefront focused on product discovery.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    {copy.home.browseLatest}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[
            {
              title: "Fast shipping",
              body: "Show only active products and keep fulfillment details clear up front.",
              icon: Truck,
            },
            {
              title: copy.home.cashOnDelivery,
              body: "Transparent pricing and simple ordering without extra friction.",
              icon: CreditCard,
            },
            {
              title: copy.home.responsiveSupport,
              body: "Store identity, search, and category navigation stay accessible first.",
              icon: HeadphonesIcon,
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.title} className="border-border/60 bg-card/95 shadow-sm">
                <CardContent className="flex gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {promoBanners.length > 0 ? (
        <Carousel aria-label="Active promotional banners">
          <CarouselContent>
            {promoBanners.map((promoBanner) => (
              <CarouselItem
                key={`${promoBanner.position}-${promoBanner.title}-${promoBanner.imageUrl}`}
                className="basis-[88%] md:basis-[48%] xl:basis-[32%]"
              >
                <Card className="h-full overflow-hidden border-border/60 bg-card/95 shadow-sm">
                  <CardContent className="grid h-full gap-5 p-5 sm:p-6">
                    {promoBanner.imageUrl ? (
                      <Image
                        src={promoBanner.imageUrl}
                        alt={promoBanner.title || store.name}
                        className="aspect-[16/7] w-full rounded-2xl object-cover"
                        loading="lazy"
                        decoding="async"
                        width={500} // Adjust width and height as needed
                        height={500}
                      />
                    ) : null}
                    <div className="space-y-2">
                      {promoBanner.title ? <h2 className="text-2xl font-black tracking-tight">{promoBanner.title}</h2> : null}
                      {promoBanner.subtitle ? <p className="text-sm text-muted-foreground">{promoBanner.subtitle}</p> : null}
                    </div>
                    {promoBanner.buttonLink && promoBanner.buttonText ? (
                      <Button className="mt-auto w-fit rounded-full" asChild>
                        <Link href={promoBanner.buttonLink}>{promoBanner.buttonText}</Link>
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : null}

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]">
              {copy.home.featuredProducts}
            </Badge>
            <h2 className="text-2xl font-black tracking-tight">{copy.home.freshFrom} {store.name}</h2>
          </div>
        </div>

        <div id="featured-products" className="grid gap-4 scroll-mt-32 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.length === 0 ? (
            <Card className="sm:col-span-2 xl:col-span-4">
              <CardContent className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
                No active products are published yet.
              </CardContent>
            </Card>
          ) : (
            featuredProducts.map((product) => {
              const image = product.images[0]

              return (
                <Link key={product.id} href={`/${lang}/${store.slug}/products/${product.slug}`} className="group">
                  <Card className="h-full overflow-hidden border-border/60 bg-card transition-colors group-hover:border-primary/30">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                          decoding="async"
                          width={500} // Adjust width and height as needed
                          height={500}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <CardContent className="space-y-3 p-4">
                      <div className="space-y-2">
                        {product.category ? (
                          <Badge variant="outline" className="rounded-full text-[11px]">
                            {product.category.name}
                          </Badge>
                        ) : null}
                        <h3 className="line-clamp-2 text-lg font-bold tracking-tight">{product.name}</h3>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-lg font-black">{formatMoney(product.price, store.currency || "DZD")}</span>
                        <AddToCartButton
                          product={{ id: product.id, slug: product.slug, name: product.name, price: Number(product.price), image: image?.url }}
                          label={copy.product.addToCart}
                          className="w-full rounded-full sm:w-auto"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          )}
        </div>
      </section>

      {bottomBanner ? (
        <Card className="overflow-hidden border-border/60 bg-card/95 shadow-sm">
          <CardContent className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="space-y-2">
              {bottomBanner.title ? <h2 className="text-2xl font-black tracking-tight">{bottomBanner.title}</h2> : null}
              {bottomBanner.subtitle ? <p className="text-sm text-muted-foreground">{bottomBanner.subtitle}</p> : null}
            </div>
            {bottomBanner.buttonLink && bottomBanner.buttonText ? (
              <Button className="rounded-full" asChild>
                <Link href={bottomBanner.buttonLink}>{bottomBanner.buttonText}</Link>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]">
              {copy.home.productGrid}
            </Badge>
            <h2 className="text-2xl font-black tracking-tight">{copy.home.allProducts}</h2>
            <p className="text-sm text-muted-foreground">
              {q ? `${copy.home.searchResultsFor} "${q}".` : copy.home.previewSet}
            </p>
          </div>
          <span className="text-sm text-muted-foreground">{catalogProducts.length} {copy.home.loaded}</span>
        </div>

        <div id="catalog-products" className="grid gap-4 scroll-mt-32 sm:grid-cols-2 xl:grid-cols-3">
          {catalogProducts.length === 0 ? (
            <Card>
              <CardContent className="flex min-h-40 flex-col items-center justify-center gap-2 p-6 text-center">
                <Store className="h-8 w-8 text-muted-foreground" />
                <p className="font-semibold">{copy.home.noMatches}</p>
                <p className="text-sm text-muted-foreground">{copy.home.noMatchesBody}</p>
              </CardContent>
            </Card>
          ) : (
            catalogProducts.map((product) => {
              const image = product.images[0]

              return (
                <Link key={product.id} href={`/${lang}/${store.slug}/products/${product.slug}`} className="group">
                  <Card className="h-full overflow-hidden border-border/60 bg-card/95 shadow-sm transition-colors group-hover:border-primary/30">
                    <CardHeader className="space-y-0 p-0">
                      <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                        {image ? (
                          <Image
                            src={image.url}
                            alt={product.name}
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
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 sm:p-5">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {product.category ? (
                            <Badge variant="outline" className="rounded-full text-[11px]">
                              {product.category.name}
                            </Badge>
                          ) : null}
                          <Badge variant="secondary" className="rounded-full text-[11px]">
                            {product.status}
                          </Badge>
                        </div>
                        <CardTitle className="line-clamp-2 text-xl">{product.name}</CardTitle>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-xl font-black">{formatMoney(product.price, store.currency || "DZD")}</span>
                        <AddToCartButton
                          product={{ id: product.id, slug: product.slug, name: product.name, price: Number(product.price), image: image?.url }}
                          label={copy.product.addToCart}
                          className="w-full rounded-full sm:w-auto"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}
