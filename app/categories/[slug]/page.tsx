"use client"

import { useParams } from "next/navigation"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  getCategoryBySlug,
  getProductsByCategory,
  CATEGORIES,
} from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"

export default function CategorySlugPage() {
  const params = useParams()
  const slug = params.slug as string
  const { t } = useLanguage()

  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const products = getProductsByCategory(slug)
  const categoryLabel =
    t.categoriesPage[category.nameKey as keyof typeof t.categoriesPage] ??
    category.nameEn

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            {t.productPage.breadcrumbHome}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/categories"
            className="transition-colors hover:text-foreground"
          >
            {t.categoriesPage.title}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{categoryLabel}</span>
        </nav>

        <div className="mb-8">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src={category.image}
              alt={categoryLabel}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <h1 className="font-serif text-3xl font-bold text-white md:text-4xl">
                {categoryLabel}
              </h1>
            </div>
          </div>
        </div>

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
            <p className="text-muted-foreground">
              لا توجد منتجات في هذه الفئة حالياً
            </p>
            <Link
              href="/categories"
              className="mt-4 text-sm font-medium text-accent hover:underline"
            >
              تصفح الفئات الأخرى
            </Link>
          </div>
        )}

        <div className="mt-12 border-t border-border pt-8">
          <h2 className="mb-4 font-semibold text-foreground">
            {t.categoriesPage.browseByCategory}
          </h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                {t.categoriesPage[c.nameKey as keyof typeof t.categoriesPage] ??
                  c.nameEn}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
