import { requirePermission } from "@/lib/auth-guard"
import { getProductsDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { db } from "@/db"
import { categories, sellerStoreLinks } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Info, Image as ImageIcon, Banknote, Plus, Lightbulb, AlertTriangle, Store } from "lucide-react"
import Link from "next/link"
import { createProduct } from "@/app/actions/products"
import { ImageUpload } from "@/components/products/image-upload"
import { VariantBuilder } from "@/components/products/variant-builder"
import { OptionalField } from "@/components/products/optional-field"
import type { ProductFormPageCopy } from "@/components/products/types"

export default async function AddProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { lang } = await params
  const { error } = await searchParams
  const auth = await requirePermission(lang, "manage_products")
  const dict = await getProductsDictionary(lang as Locale)
  const copy = (dict as { newProductPage: ProductFormPageCopy }).newProductPage
  const isAr = lang === "ar"

  const [storeLink] = await db.select().from(sellerStoreLinks)
    .where(and(eq(sellerStoreLinks.userId, auth.user.id), eq(sellerStoreLinks.isActive, true))).limit(1)

  if (!storeLink) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border/80 bg-card/70 p-8 text-center shadow-sm">
        <Store className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">{copy.noStore}</h2>
      </div>
    )
  }

  const storeCategories = await db.select({ id: categories.id, name: categories.name })
    .from(categories).where(eq(categories.storeId, storeLink.storeId))

  const createProductAction = createProduct.bind(null, storeLink.storeId, lang)

  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-8" dir={isAr ? "rtl" : "ltr"}>
      
      {/* Kept encType to securely stream file uploads! */}
      <form action={createProductAction}>
        
        {/* Page Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/${lang}/dashboard/products`} 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background text-foreground transition-colors hover:bg-muted"
            >
              {isAr ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{copy.title}</h1>
              <p className="text-sm text-muted-foreground">{copy.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Removed the buggy document.querySelector click handler */}
            <Link 
              href={`/${lang}/dashboard/products`}
              className="px-6 py-3 rounded-2xl border border-border/60 font-semibold text-sm hover:bg-background transition-colors bg-card shadow-sm text-center"
            >
              Cancel
            </Link>
            <button type="submit" className="rounded-2xl bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-transform hover:scale-[1.02]">
              {copy.publish}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
            <AlertTriangle className="h-4 w-4" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8 text-start">
            
            <Card className="bg-card p-6 sm:p-8 rounded-[2rem] shadow-sm border-border/40">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Info className="h-6 w-6 text-primary" />
                {copy.details}
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{copy.name}</label>
                  <Input 
                    name="name" placeholder={copy.namePlaceholder} 
                    className="w-full bg-muted/30 border-none rounded-2xl px-4 py-6 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all text-foreground placeholder:text-muted-foreground" required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{copy.descriptionLabel}</label>
                  <Textarea 
                    name="description" placeholder={copy.descriptionPlaceholder} rows={6}
                    className="w-full bg-muted/30 border-none rounded-2xl px-4 py-4 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all text-foreground placeholder:text-muted-foreground resize-none" 
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-card p-6 sm:p-8 rounded-[2rem] shadow-sm border-border/40">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ImageIcon className="h-6 w-6 text-primary" /> {copy.mediaTitle}
                </h2>
              </div>
              <ImageUpload copy={copy.uploadCopy} />
            </Card>

            <Card className="bg-card p-6 sm:p-8 rounded-[2rem] shadow-sm border-border/40">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Banknote className="h-6 w-6 text-primary" /> {copy.pricingTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{copy.price}</label>
                  <div className="relative">
                    <span className={`absolute ${isAr ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 font-bold text-muted-foreground pointer-events-none`}>DZD</span>
                    <Input name="price" type="number" step="0.01" placeholder="0.00" className={`w-full bg-muted/30 border-none rounded-2xl py-6 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all ${isAr ? "pr-14 pl-4" : "pl-14 pr-4"}`} required />
                  </div>
                </div>

                <OptionalField label={copy.comparePrice}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{copy.comparePrice}</label>
                    <div className="relative">
                      <span className={`absolute ${isAr ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 font-bold text-muted-foreground pointer-events-none`}>DZD</span>
                      <Input name="comparePrice" type="number" step="0.01" placeholder="0.00" className={`w-full bg-muted/30 border-none rounded-2xl py-6 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all ${isAr ? "pr-14 pl-4" : "pl-14 pr-4"}`} />
                    </div>
                  </div>
                </OptionalField>

                <OptionalField label={copy.sku}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{copy.sku}</label>
                    <Input name="sku" placeholder="PROD-001" className="w-full bg-muted/30 border-none rounded-2xl px-4 py-6 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all font-mono text-sm" />
                  </div>
                </OptionalField>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{copy.stock}</label>
                  <Input name="stock" type="number" min="0" defaultValue="0" className="w-full bg-muted/30 border-none rounded-2xl px-4 py-6 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all" required />
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8 text-start">
            
            <Card className="bg-card p-6 rounded-[2rem] shadow-sm border-border/40">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{copy.statusTitle}</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-2xl bg-primary/5 border border-primary/10 cursor-pointer transition-colors hover:bg-primary/10 has-[:checked]:bg-primary/10 has-[:checked]:border-primary/30">
                  <input type="radio" name="status" value="active" className="peer hidden" defaultChecked />
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground peer-checked:border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-sm font-bold text-foreground peer-checked:text-primary">{copy.statusActive}</span>
                  <span className="ml-auto rounded-full bg-gradient-to-br from-primary to-accent px-2 py-0.5 text-[10px] text-primary-foreground shadow-sm rtl:mr-auto rtl:ml-0">{copy.statusLive}</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-2xl border border-transparent cursor-pointer transition-colors hover:bg-muted/50 has-[:checked]:bg-muted/50 has-[:checked]:border-border/60">
                  <input type="radio" name="status" value="draft" className="peer hidden" />
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground peer-checked:border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">{copy.draft}</span>
                </label>
              </div>
            </Card>

            <Card className="bg-card p-6 rounded-[2rem] shadow-sm border-border/40">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{copy.categoryTitle}</h3>
              <div className="relative">
                <select name="categoryId" defaultValue="none" className="w-full bg-muted/30 border-none rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/40 appearance-none">
                  <option value="none" disabled>{copy.noCategory}</option>
                  {storeCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <Link href={`/${lang}/dashboard/products/categories`} className="mt-4 text-xs font-bold text-primary flex items-center gap-1 hover:underline w-fit">
                <Plus className="h-3.5 w-3.5" /> {copy.createCategory}
              </Link>
            </Card>

            <Card className="bg-card p-6 rounded-[2rem] shadow-sm border-border/40">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{copy.optionsTitle}</h3>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded shadow-sm">{copy.optionsBeta}</span>
              </div>
              <VariantBuilder copy={copy.variantCopy} />
            </Card>

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground shadow-lg">
              <Lightbulb className="mb-4 h-8 w-8 relative z-10" fill="currentColor" />
              <h4 className="font-bold text-lg leading-tight mb-2 relative z-10">{copy.seoHelpTitle}</h4>
              <p className="text-primary-foreground/80 text-xs mb-6 relative z-10">{copy.seoHelpDesc}</p>
              <button type="button" className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-xs font-bold transition-colors relative z-10">{copy.seoHelpBtn}</button>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}
