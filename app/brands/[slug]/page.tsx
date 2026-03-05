"use client"

import { useParams } from "next/navigation"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useLanguage } from "@/lib/i18n/language-context"
import { getBrandBySlug, getProductsByBrand, BRANDS } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"

export default function BrandSlugPage() {
  const params = useParams()
  const slug = params.slug as string
  const { t } = useLanguage()

  const brand = getBrandBySlug(slug)
  if (!brand) notFound()

  const products = getProductsByBrand(slug)

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
            href="/brands"
            className="transition-colors hover:text-foreground"
          >
            {t.brandsPage.title}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{brand.name}</span>
        </nav>

        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-border bg-white">
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              {brand.name}
            </h1>
            <p className="text-muted-foreground">
              {brand.productCount} {t.brandsPage.productsCount}
            </p>
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
              لا توجد منتجات من هذه الماركة حالياً
            </p>
            <Link
              href="/brands"
              className="mt-4 text-sm font-medium text-accent hover:underline"
            >
              تصفح الماركات الأخرى
            </Link>
          </div>
        )}

        <div className="mt-12 border-t border-border pt-8">
          <h2 className="mb-4 font-semibold text-foreground">
            {t.brandsPage.subtitle}
          </h2>
          <div className="flex flex-wrap gap-2">
            {BRANDS.filter((b) => b.slug !== slug).slice(0, 12).map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
