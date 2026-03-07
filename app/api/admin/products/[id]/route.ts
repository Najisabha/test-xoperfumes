import { NextRequest, NextResponse } from "next/server"
import { verifyAdminAuth } from "@/lib/admin-auth"
import * as productsStore from "@/lib/admin-products-store"

function requireAdmin(request: NextRequest) {
  const cookie = request.headers.get("cookie")
  if (!verifyAdminAuth(cookie ?? undefined)) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }
  return null
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = productsStore.getProductById(Number(id))
  if (!product) {
    return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 })
  }
  return NextResponse.json(product)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const { id } = await params
  const productId = Number(id)

  try {
    const body = await request.json()
    const updated = productsStore.updateProduct(productId, body)
    if (!updated) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 })
    }
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: "فشل في تحديث المنتج" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const { id } = await params
  const deleted = productsStore.deleteProduct(Number(id))
  if (!deleted) {
    return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
