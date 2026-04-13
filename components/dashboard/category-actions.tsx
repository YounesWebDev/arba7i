"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { deleteCategory, updateCategory } from "@/app/actions/categories"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CategoryActions({
  categoryId,
  categoryName,
  storeId,
  lang,
  copy,
}: {
  categoryId: string
  categoryName: string
  storeId: string
  lang: string
  copy: {
    srOnly: string
    menuLabel: string
    edit: string
    delete: string
    editTitle: string
    editDescription: string
    nameLabel: string
    save: string
    cancel: string
    deleteTitle: string
    deleteDescription: string
    deleteConfirm: string
  }
}) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [currentName, setCurrentName] = useState(categoryName)
  const [name, setName] = useState(categoryName)
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const isArabic = lang === "ar"

  useEffect(() => {
    setCurrentName(categoryName)
    setName(categoryName)
  }, [categoryName])

  async function handleSave() {
    setIsSaving(true)
    setError("")

    const result = await updateCategory(categoryId, storeId, name, lang)

    if (result.success) {
      const nextName = name.trim()
      setCurrentName(nextName)
      setName(nextName)
      setEditOpen(false)
      router.refresh()
    } else {
      setError(result.error as string)
    }

    setIsSaving(false)
  }

  async function handleDelete() {
    setIsDeleting(true)
    const result = await deleteCategory(categoryId, storeId, lang)

    if (!result.success) {
      setError((result.error as string) ?? "")
    }

    setIsDeleting(false)

    if (result.success) {
      setDeleteOpen(false)
      router.refresh()
    }
  }

  return (
    <>
      <DropdownMenu dir={isArabic ? "rtl" : "ltr"} open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-9 w-9 rounded-2xl p-0 hover:bg-primary/10 hover:text-primary"
            disabled={isSaving || isDeleting}
          >
            <span className="sr-only">{copy.srOnly}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isArabic ? "start" : "end"} className="w-44 rounded-2xl">
          <DropdownMenuLabel>{copy.menuLabel}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault()
              setMenuOpen(false)
              setName(currentName)
              setError("")
              setEditOpen(true)
            }}
          >
            <Edit className="me-2 h-4 w-4" />
            {copy.edit}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={(event) => {
              event.preventDefault()
              setMenuOpen(false)
              setError("")
              setDeleteOpen(true)
            }}
          >
            <Trash2 className="me-2 h-4 w-4" />
            {copy.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open)
          if (open) {
            setName(currentName)
            setError("")
          }
        }}
      >
        <DialogContent dir={isArabic ? "rtl" : "ltr"} className="rounded-[1.75rem] sm:max-w-lg">
          <DialogHeader className="text-start">
            <DialogTitle>{copy.editTitle}</DialogTitle>
            <DialogDescription>{copy.editDescription}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2 text-start">
              <Label htmlFor={`category-name-${categoryId}`}>{copy.nameLabel}</Label>
              <Input
                id={`category-name-${categoryId}`}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              {copy.cancel}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !name.trim() || name.trim() === currentName.trim()}
            >
              {copy.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent dir={isArabic ? "rtl" : "ltr"} className="rounded-[1.75rem]">
          <AlertDialogHeader className="text-start">
            <AlertDialogTitle>{copy.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>{copy.deleteDescription}</AlertDialogDescription>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.cancel}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {copy.deleteConfirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
