import { redirect } from "next/navigation"
import { getProductBySlug } from "@/lib/data"

export default function ProductPage() {
  const product = getProductBySlug("dior-sauvage-eau-de-parfum")
  redirect(product ? `/product/${product.slug}` : "/")
}
