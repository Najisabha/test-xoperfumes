"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  LayoutDashboard,
  LogOut,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ADMIN_COOKIE } from "@/lib/admin-auth"
import { CATEGORIES } from "@/lib/data"
import type { Product } from "@/lib/data"

const API = "/api/admin/products"

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [viewProduct, setViewProduct] = useState<Product | null>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    categorySlug: "",
    price: "",
    originalPrice: "",
    image: "",
    rating: "0",
    reviews: "0",
    freeDelivery: false,
    returnWithin30Days: false,
    description: "",
  })

  const fetchProducts = async () => {
    try {
      const res = await fetch(API, { credentials: "include" })
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch {
      setError("فشل تحميل المنتجات")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const openAddForm = () => {
    setEditingProduct(null)
    setFormData({
      name: "",
      brand: "",
      categorySlug: "",
      price: "",
      originalPrice: "",
      image: "",
      rating: "0",
      reviews: "0",
      freeDelivery: false,
      returnWithin30Days: false,
      description: "",
    })
    setIsFormOpen(true)
  }

  const openEditForm = (p: Product) => {
    setEditingProduct(p)
    setFormData({
      name: p.name,
      brand: p.brand,
      categorySlug: p.categorySlug,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : "",
      image: p.image,
      rating: String(p.rating),
      reviews: String(p.reviews),
      freeDelivery: p.freeDelivery ?? false,
      returnWithin30Days: p.returnWithin30Days ?? false,
      description: p.description ?? "",
    })
    setIsFormOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      const payload = {
        name: formData.name,
        brand: formData.brand,
        categorySlug: formData.categorySlug,
        price: parseFloat(formData.price) || 0,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        image: formData.image || "/images/product-1.jpg",
        rating: parseFloat(formData.rating) || 0,
        reviews: parseInt(formData.reviews, 10) || 0,
        freeDelivery: formData.freeDelivery,
        returnWithin30Days: formData.returnWithin30Days,
        description: formData.description || undefined,
      }

      const url = editingProduct ? `${API}/${editingProduct.id}` : API
      const method = editingProduct ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      if (res.status === 401) {
        router.push("/admin/login")
        return
      }

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setError(json.error || "فشل الحفظ")
        return
      }

      setIsFormOpen(false)
      fetchProducts()
    } catch {
      setError("حدث خطأ")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setSaving(true)
    try {
      const res = await fetch(`${API}/${deleteTarget.id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (res.status === 401) {
        router.push("/admin/login")
        return
      }

      setDeleteTarget(null)
      fetchProducts()
    } catch {
      setError("فشل الحذف")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    document.cookie = `${ADMIN_COOKIE}=; path=/; max-age=0`
    router.push("/admin/login")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-slate-400">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-amber-400" />
            <h1 className="text-xl font-bold">لوحة التحكم - المنتجات</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={openAddForm}
              className="bg-amber-500 text-slate-900 hover:bg-amber-400"
            >
              <Plus className="ml-2 h-4 w-4" />
              إضافة منتج
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              onClick={handleLogout}
            >
              <LogOut className="ml-2 h-4 w-4" />
              خروج
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">الصورة</TableHead>
                <TableHead className="text-slate-400">الاسم</TableHead>
                <TableHead className="text-slate-400">البراند</TableHead>
                <TableHead className="text-slate-400">الفئة</TableHead>
                <TableHead className="text-slate-400">السعر</TableHead>
                <TableHead className="text-slate-400 text-left">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow className="border-slate-800">
                  <TableCell colSpan={6} className="py-12 text-center text-slate-500">
                    <Package className="mx-auto mb-2 h-12 w-12 opacity-50" />
                    لا توجد منتجات
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p) => (
                  <TableRow key={p.id} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell>
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-slate-800">
                        <Image
                          src={p.image || "/images/product-1.jpg"}
                          alt={p.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.brand}</TableCell>
                    <TableCell>{p.categorySlug}</TableCell>
                    <TableCell>
                      {p.price} ر.س
                      {p.originalPrice && (
                        <span className="mr-2 text-sm text-slate-500 line-through">
                          {p.originalPrice}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-slate-400 hover:text-slate-200"
                          onClick={() => setViewProduct(p)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-amber-400 hover:text-amber-300"
                          onClick={() => openEditForm(p)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => setDeleteTarget(p)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-slate-800 bg-slate-900 text-slate-100 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
                  className="border-slate-600 bg-slate-800"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">البراند</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData((s) => ({ ...s, brand: e.target.value }))}
                  className="border-slate-600 bg-slate-800"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>الفئة</Label>
              <Select
                value={formData.categorySlug}
                onValueChange={(v) => setFormData((s) => ({ ...s, categorySlug: v }))}
              >
                <SelectTrigger className="border-slate-600 bg-slate-800">
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">السعر</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData((s) => ({ ...s, price: e.target.value }))}
                  className="border-slate-600 bg-slate-800"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">السعر الأصلي (اختياري)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData((s) => ({ ...s, originalPrice: e.target.value }))}
                  className="border-slate-600 bg-slate-800"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rating">التقييم</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData((s) => ({ ...s, rating: e.target.value }))}
                  className="border-slate-600 bg-slate-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviews">عدد التقييمات</Label>
                <Input
                  id="reviews"
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={(e) => setFormData((s) => ({ ...s, reviews: e.target.value }))}
                  className="border-slate-600 bg-slate-800"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">رابط الصورة</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData((s) => ({ ...s, image: e.target.value }))}
                className="border-slate-600 bg-slate-800"
                placeholder="/images/product-1.jpg"
              />
            </div>
            <div className="flex gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.freeDelivery}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, freeDelivery: e.target.checked }))
                  }
                  className="rounded border-slate-600"
                />
                <span>شحن مجاني</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.returnWithin30Days}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, returnWithin30Days: e.target.checked }))
                  }
                  className="rounded border-slate-600"
                />
                <span>إرجاع خلال 30 يوم</span>
              </label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">الوصف (اختياري)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((s) => ({ ...s, description: e.target.value }))}
                className="min-h-[80px] border-slate-600 bg-slate-800"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="border-slate-600"
                onClick={() => setIsFormOpen(false)}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-amber-500 text-slate-900 hover:bg-amber-400"
              >
                {saving ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewProduct} onOpenChange={() => setViewProduct(null)}>
        <DialogContent className="border-slate-800 bg-slate-900 text-slate-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>عرض المنتج</DialogTitle>
          </DialogHeader>
          {viewProduct && (
            <div className="space-y-4">
              <div className="relative mx-auto aspect-square max-w-[200px] overflow-hidden rounded-lg bg-slate-800">
                <Image
                  src={viewProduct.image || "/images/product-1.jpg"}
                  alt={viewProduct.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">{viewProduct.name}</p>
                <p className="text-slate-400">{viewProduct.brand}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-slate-500">الفئة:</span>
                <span>{viewProduct.categorySlug}</span>
                <span className="text-slate-500">السعر:</span>
                <span>{viewProduct.price} ر.س</span>
                {viewProduct.originalPrice && (
                  <>
                    <span className="text-slate-500">السعر الأصلي:</span>
                    <span className="line-through">{viewProduct.originalPrice} ر.س</span>
                  </>
                )}
                <span className="text-slate-500">التقييم:</span>
                <span>{viewProduct.rating} ({viewProduct.reviews} تقييم)</span>
              </div>
              {viewProduct.description && (
                <p className="text-sm text-slate-400">{viewProduct.description}</p>
              )}
              <Button
                onClick={() => {
                  setViewProduct(null)
                  openEditForm(viewProduct)
                }}
                className="w-full bg-amber-500 text-slate-900 hover:bg-amber-400"
              >
                <Pencil className="ml-2 h-4 w-4" />
                تعديل
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="border-slate-800 bg-slate-900 text-slate-100">
          <AlertDialogHeader>
            <AlertDialogTitle>حذف المنتج</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف &quot;{deleteTarget?.name}&quot;؟ لا يمكن التراجع.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-600 text-slate-300">
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={saving}
              className="bg-red-600 hover:bg-red-500"
            >
              {saving ? "جاري الحذف..." : "حذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
