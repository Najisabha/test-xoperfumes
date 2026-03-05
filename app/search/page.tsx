"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useLanguage } from "@/lib/i18n/language-context"
import { searchProducts } from "@/lib/data"
import Link from "next/link"
import { Search } from "lucide-react"

function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get("q") ?? ""
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const products = searchProducts(q)

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 font-serif text-2xl font-bold text-foreground md:text-3xl">
          {q ? `${t.nav.searchPlaceholder} "${q}"` : t.nav.searchPlaceholder}
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                brand={product.brand}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                freeDelivery={product.freeDelivery}
                returnWithin30Days={product.returnWithin30Days}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-16">
            <Search className="mb-4 h-16 w-16 text-muted-foreground" />
            <p className="mb-2 text-lg font-medium text-foreground">
              {q ? "لم نجد نتائج" : "ابدأ بالبحث"}
            </p>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              {q
                ? `لم نجد منتجات تطابق "${q}". جرّب كلمات أخرى.`
                : "ابحث عن العطور والماركات"}
            </p>
            <Link
              href="/"
              className="text-sm font-medium text-accent hover:underline"
            >
              {t.cart.continueShopping}
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SearchContent />
    </Suspense>
  )
}
