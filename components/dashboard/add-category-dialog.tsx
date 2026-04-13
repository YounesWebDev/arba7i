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

export function AddCategoryDialog({
  storeId,
  lang,
  copy,
}: {
  storeId: string
  lang: string
  copy: {
    trigger: string
    title: string
    description: string
    nameLabel: string
    namePlaceholder: string
    slugHint: string
    submit: string
  }
}) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
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
        <Button size="lg" className="bg-gradient-to-br from-primary to-accent p-4 shadow-sm">
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
            <Label htmlFor="name">{copy.nameLabel}</Label>
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
