"use client"

import { useParams } from "next/navigation"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfoPanel } from "@/components/product-info-panel"
import { ProductTabs } from "@/components/product-tabs"
import { ProductSliders, ProductUSP } from "@/components/product-sliders"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import { getProductBySlug, getRelatedProducts } from "@/lib/data"
import { notFound } from "next/navigation"

export default function ProductSlugPage() {
  const params = useParams()
  const slug = params.slug as string
  const { t } = useLanguage()

  const product = getProductBySlug(slug)
  if (!product) notFound()

  const relatedProducts = getRelatedProducts(product)

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-7xl px-4 py-5">
        <nav className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            {t.productPage.breadcrumbHome}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/categories" className="transition-colors hover:text-foreground">
            {t.productPage.breadcrumbCategory}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href={`/brands/${product.brandSlug}`}
            className="transition-colors hover:text-foreground"
          >
            {product.brand}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mb-10 grid gap-8 lg:grid-cols-2">
          <ProductGallery product={product} />
          <ProductInfoPanel product={product} />
        </div>

        <div className="mb-10">
          <ProductTabs product={product} />
        </div>

        <div className="mb-10">
          <ProductUSP />
        </div>

        <ProductSliders relatedProducts={relatedProducts} />
      </main>

      <Footer />
    </div>
  )
}
