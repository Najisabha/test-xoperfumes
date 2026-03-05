"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"

const BRAND_SIZE = 88

function BrandLogo({
  brand,
}: {
  brand: { name: string; logo: string; slug: string }
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group block transition-transform hover:scale-105"
      title={brand.name}
    >
      <div
        className="relative overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-md"
        style={{ width: BRAND_SIZE, height: BRAND_SIZE }}
      >
        {!imgError ? (
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            sizes="88px"
            className="object-contain p-2 opacity-90 transition-opacity group-hover:opacity-100"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xl font-bold text-foreground">
            {brand.name.charAt(0)}
          </span>
        )}
      </div>
    </Link>
  )
}

const featuredBrands = [
  { name: "Dior", logo: "/images/product-1.jpg", slug: "dior" },
  { name: "Chanel", logo: "/images/product-2.jpg", slug: "chanel" },
  { name: "Tom Ford", logo: "/images/product-3.jpg", slug: "tom-ford" },
  { name: "Gucci", logo: "/images/product-4.jpg", slug: "gucci" },
  { name: "Prada", logo: "/images/cat-unisex.jpg", slug: "prada" },
  { name: "Versace", logo: "/images/product-5.jpg", slug: "versace" },
  { name: "YSL", logo: "/images/cat-men.jpg", slug: "ysl" },
  { name: "Armani", logo: "/images/cat-women.jpg", slug: "armani" },
]

export function Categories() {
  const { t } = useLanguage()

  const categories = [
    { nameKey: "women" as const, nameEn: "Women", image: "/images/cat-women.jpg", slug: "women" },
    { nameKey: "men" as const, nameEn: "Men", image: "/images/cat-men.jpg", slug: "men" },
    { nameKey: "unisex" as const, nameEn: "Unisex", image: "/images/cat-unisex.jpg", slug: "unisex" },
    { nameKey: "oud" as const, nameEn: "Oud", image: "/images/cat-oud.jpg", slug: "oud" },
    { nameKey: "bodyCare" as const, nameEn: "Body Care", image: "/images/cat-bodycare.jpg", slug: "body-care" },
    { nameKey: "giftSets" as const, nameEn: "Gift Sets", image: "/images/cat-gifts.jpg", slug: "gift-sets" },
  ]

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.categories.browseCollections}
          </span>
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            {t.categories.shopByCategory}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {t.categories.categorySubtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5">
          {categories.map((category) => (
            <Link
              key={category.nameKey}
              href={`/categories/${category.slug}`}
              className="group relative flex flex-col items-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-xl">
                <Image
                  src={category.image}
                  alt={category.nameEn}
                  fill
                  sizes="(max-width: 640px) 25vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-end justify-center p-4">
                  <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-foreground shadow-lg backdrop-blur-sm transition-all group-hover:bg-white">
                    {t.categories[category.nameKey]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Brands Strip */}
        <div className="mt-14 rounded-2xl border border-border/60 bg-gradient-to-b from-muted/30 to-muted/10 p-6 lg:p-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-foreground md:text-xl">
                {t.categories.topBrands}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t.categories.topBrandsSubtitle}
              </p>
            </div>
            <Link
              href="/categories"
              className="hidden text-sm font-medium text-accent transition-colors hover:text-accent/80 sm:block"
            >
              {t.categories.viewAll}
            </Link>
          </div>
          <div className="grid grid-cols-4 place-items-center gap-4 sm:grid-cols-4 sm:gap-6 md:grid-cols-8 md:gap-6">
            {featuredBrands.map((brand) => (
              <BrandLogo key={brand.name} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
