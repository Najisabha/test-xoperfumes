"use client"

import Image from "next/image"
import Link from "next/link"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { BRANDS } from "@/lib/data"

const BRAND_SIZE = 120

function BrandCard({
  brand,
}: {
  brand: { slug: string; name: string; logo: string; productCount: number }
}) {
  const { t } = useLanguage()

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent/50 hover:shadow-lg"
    >
      <div
        className="relative mb-4 overflow-hidden rounded-xl border border-border bg-white transition-transform group-hover:scale-105"
        style={{ width: BRAND_SIZE, height: BRAND_SIZE }}
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          sizes="120px"
          className="object-contain p-3"
        />
      </div>
      <h3 className="mb-1 font-semibold text-foreground">{brand.name}</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        {brand.productCount} {t.brandsPage.productsCount}
      </p>
      <Button variant="outline" size="sm" className="w-full">
        {t.brandsPage.viewProducts}
      </Button>
    </Link>
  )
}

export default function BrandsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            {t.brandsPage.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t.brandsPage.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {BRANDS.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
