"use client"

import { useState } from "react"
import { Loader2, Plus } from "lucide-react"
import { createCategory } from "@/app/actions/categories"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function getDialogCopy(lang: string) {
  if (lang === "ar") {
    return {
      trigger: "إضافة قسم",
      title: "إنشاء قسم جديد",
      description: "أضف قسم جديد باش تنظم منتجات متجرك بطريقة أوضح.",
      name: "اسم القسم",
      namePlaceholder: "مثال: إلكترونيات",
      slugHint: "الرابط يتولد تلقائيا من اسم القسم.",
      submit: "حفظ القسم",
    }
  }

  if (lang === "fr") {
    return {
      trigger: "Ajouter une categorie",
      title: "Creer une nouvelle categorie",
      description: "Ajoutez une categorie pour organiser les produits de votre boutique.",
      name: "Nom de la categorie",
      namePlaceholder: "Exemple : Electronique",
      slugHint: "Le slug sera genere automatiquement a partir du nom.",
      submit: "Enregistrer la categorie",
    }
  }

  return {
    trigger: "Add Category",
    title: "Create New Category",
    description: "Add a category to organize products inside your store.",
    name: "Category Name",
    namePlaceholder: "e.g. Electronics",
    slugHint: "The slug will be generated automatically from the category name.",
    submit: "Save Category",
  }
}

export function AddCategoryDialog({ storeId, lang }: { storeId: string; lang: string }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const copy = getDialogCopy(lang)
  const isArabic = lang === "ar"

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")

    const name = formData.get("name") as string
    const result = await createCategory(storeId, name, lang)

    if (result.success) {
      setOpen(false)
    } else {
      setError(result.error as string)
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl px-5 shadow-sm">
          <Plus className="me-2 h-4 w-4" />
          {copy.trigger}
        </Button>
      </DialogTrigger>

      <DialogContent dir={isArabic ? "rtl" : "ltr"} className="rounded-[1.75rem] sm:max-w-lg">
        <DialogHeader className="text-start">
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-start">
            <Label htmlFor="name">{copy.name}</Label>
            <Input id="name" name="name" placeholder={copy.namePlaceholder} required />
            <p className="text-xs text-muted-foreground">{copy.slugHint}</p>
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full rounded-2xl sm:w-auto">
              {loading ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : null}
              {copy.submit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
