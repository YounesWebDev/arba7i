import { requirePermission } from "@/lib/auth-guard"
import { createProduct } from "@/app/actions/products"
import { getProductsDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { db } from "@/db"
import { categories, sellerStoreLinks } from "@/db/schema"
import { and, asc, eq } from "drizzle-orm"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Store } from "lucide-react"

export default async function DashboardNewProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { lang } = await params
  const { error } = await searchParams
  const dict = await getProductsDictionary(lang as Locale)
  const copy = (dict as Record<string, unknown>).newProductPage as Record<string, string>
  const auth = await requirePermission(lang, "manage_products")

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
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(eq(categories.storeId, storeLink.storeId))
    .orderBy(asc(categories.name))

  const submitAction = createProduct.bind(null, storeLink.storeId, lang)

  return (
    <div className="flex min-w-0 flex-col gap-8">
      <section className="flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-gradient-to-br from-card via-card to-accent/50 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold tracking-tight">
            <Plus className="me-1 h-3.5 w-3.5" />
            {copy.title}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl">{copy.title}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{copy.desc}</p>
          </div>
        </div>

        <Button variant="outline" className="rounded-2xl" asChild>
          <Link href={`/${lang}/dashboard/products`}>{copy.back}</Link>
        </Button>
      </section>

      <Card className="border-border/60 bg-card/95 shadow-sm">
        <CardHeader>
          <CardTitle>{copy.details}</CardTitle>
          <CardDescription>{copy.detailsDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={submitAction} className="grid gap-6">
            {error ? (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <div className="font-semibold">{copy.errorTitle}</div>
                <div>{error}</div>
              </div>
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">{copy.name}</Label>
                <Input id="name" name="name" placeholder={copy.namePlaceholder} required className="rounded-2xl" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">{copy.descriptionLabel}</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder={copy.descriptionPlaceholder}
                  className="min-h-28 rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryId">{copy.category}</Label>
                <Select name="categoryId">
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder={copy.category} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{copy.noCategory}</SelectItem>
                    {storeCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">{copy.status}</Label>
                <Select name="status" defaultValue="active">
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder={copy.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{copy.active}</SelectItem>
                    <SelectItem value="draft">{copy.draft}</SelectItem>
                    <SelectItem value="out_of_stock">{copy.outOfStock}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">{copy.price}</Label>
                <Input id="price" name="price" type="number" min="0" step="0.01" required className="rounded-2xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">{copy.stock}</Label>
                <Input id="stock" name="stock" type="number" min="0" step="1" defaultValue="0" required className="rounded-2xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lowStockThreshold">{copy.threshold}</Label>
                <Input
                  id="lowStockThreshold"
                  name="lowStockThreshold"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue="5"
                  required
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">{copy.sku}</Label>
                <Input id="sku" name="sku" className="rounded-2xl" />
                <p className="text-xs text-muted-foreground">{copy.skuHint}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="rounded-2xl">
                {copy.create}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
