import { NextRequest, NextResponse } from "next/server"
import { verifyAdminAuth } from "@/lib/admin-auth"
import * as productsStore from "@/lib/admin-products-store"
import type { Product } from "@/lib/data"

function requireAdmin(request: NextRequest) {
  const cookie = request.headers.get("cookie")
  if (!verifyAdminAuth(cookie ?? undefined)) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }
  return null
}

export async function GET() {
  const products = productsStore.getAllProducts()
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  try {
    const body = await request.json() as Partial<Product>
    const { name, brand, categorySlug, price, originalPrice, image, rating, reviews, freeDelivery, returnWithin30Days, description } = body

    if (!name || !brand || !categorySlug || typeof price !== "number") {
      return NextResponse.json(
        { error: "الاسم، البراند، الفئة والسعر مطلوبة" },
        { status: 400 }
      )
    }

    const product = productsStore.addProduct({
      name,
      brand,
      categorySlug,
      price,
      originalPrice,
      image: image || "",
      rating: rating ?? 0,
      reviews: reviews ?? 0,
      freeDelivery,
      returnWithin30Days,
      description,
    })

    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: "فشل في إضافة المنتج" }, { status: 500 })
  }
}
