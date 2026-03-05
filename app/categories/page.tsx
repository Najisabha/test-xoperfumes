"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"

const BRAND_SIZE = 96

const brands = [
  { id: 1, name: "KAYALI", logo: "/images/product-1.jpg", slug: "kayali" },
  { id: 2, name: "LAVERNE", logo: "/images/product-2.jpg", slug: "laverne" },
  { id: 3, name: "ASSAF", logo: "/images/product-3.jpg", slug: "assaf" },
  { id: 4, name: "Victoria's Secret", logo: "/images/product-4.jpg", slug: "victorias-secret" },
  { id: 5, name: "طلق", logo: "/images/product-5.jpg", slug: "talaq" },
  { id: 6, name: "Rare Beauty", logo: "/images/cat-women.jpg", slug: "rare-beauty" },
  { id: 7, name: "CAVE", logo: "/images/cat-men.jpg", slug: "cave" },
  { id: 8, name: "Jimmies", logo: "/images/cat-unisex.jpg", slug: "jimmies" },
  { id: 9, name: "I LOVE", logo: "/images/cat-oud.jpg", slug: "i-love" },
  { id: 10, name: "Neurhan", logo: "/images/cat-bodycare.jpg", slug: "neurhan" },
  { id: 11, name: "Charlotte Tilbury", logo: "/images/cat-gifts.jpg", slug: "charlotte-tilbury" },
  { id: 12, name: "Dior", logo: "/images/product-detail-main.jpg", slug: "dior" },
]

function BrandLogo({
  brand,
}: {
  brand: { id: number; name: string; logo: string; slug: string }
}) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group block transition-transform hover:scale-105"
      title={brand.name}
    >
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:border-accent/50 hover:shadow-md"
        style={{ width: BRAND_SIZE, height: BRAND_SIZE }}
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          sizes="192px"
          className="object-cover transition-all duration-300 group-hover:scale-110"
        />
      </div>
    </Link>
  )
}

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("perfume")
  const { t } = useLanguage()

  const rightCategories = [
    { id: "cosmetics", label: t.categoriesPage.cosmetics, icon: "💄" },
    { id: "perfume", label: t.categoriesPage.perfume, icon: "🌸" },
    { id: "body", label: t.categoriesPage.bodyCare, icon: "🧴" },
    { id: "skin", label: t.categoriesPage.skinCare, icon: "✨" },
    { id: "hair", label: t.categoriesPage.hairCare, icon: "💆" },
    { id: "lenses", label: t.categoriesPage.lenses, icon: "👁" },
    { id: "hygiene", label: t.categoriesPage.hygiene, icon: "🧼" },
    { id: "devices", label: t.categoriesPage.devices, icon: "📱" },
    { id: "supplements", label: t.categoriesPage.supplements, icon: "💊" },
    { id: "watches", label: t.categoriesPage.watches, icon: "⌚" },
    { id: "accessories", label: t.categoriesPage.accessories, icon: "💎" },
  ]

  const leftCategories = [
    { id: "men", slug: "men", label: t.categoriesPage.menPerfumes },
    { id: "women", slug: "women", label: t.categoriesPage.womenPerfumes },
    { id: "unisex", slug: "unisex", label: t.categoriesPage.unisexPerfumes },
    { id: "packages", slug: "gift-sets", label: t.categoriesPage.perfumePackages },
    { id: "body-perfume", slug: "body-care", label: t.categoriesPage.bodyPerfume },
  ]

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-7xl">
        {/* Page Title — desktop only */}
        <div className="hidden border-b border-border px-6 py-4 lg:block">
          <h1 className="text-xl font-bold text-foreground">{t.categoriesPage.title}</h1>
        </div>

        {/* Two-column layout */}
        <div className="flex min-h-[calc(100vh-120px)]">

          {/* LEFT: Main content area */}
          <div className="flex-1 overflow-y-auto">
            {/* Subcategory links */}
            <div className="border-b border-border bg-card">
              {leftCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="flex items-center justify-between border-b border-border/50 px-5 py-4 text-sm font-medium text-foreground transition-colors last:border-0 hover:bg-muted hover:text-accent"
                >
                  <span>{cat.label}</span>
                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>

            {/* Popular Brands */}
            <div className="p-4">
              <h2 className="mb-4 text-center text-sm font-bold text-foreground">
                {t.categoriesPage.topBrands}
              </h2>
              <div className="grid grid-cols-3 place-items-center gap-1.5 sm:grid-cols-4 md:grid-cols-4 md:gap-2">
                {brands.map((brand) => (
                  <BrandLogo key={brand.id} brand={brand} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Category sidebar */}
          <div className="w-24 shrink-0 overflow-y-auto border-r border-border bg-muted/30">
            {rightCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex w-full flex-col items-center gap-1.5 border-b border-border/50 px-2 py-3 text-center transition-colors last:border-0 ${
                  activeCategory === cat.id
                    ? "bg-card text-accent"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${
                    activeCategory === cat.id
                      ? "bg-accent/10"
                      : "bg-background"
                  }`}
                >
                  {cat.icon}
                </div>
                <span className="text-[10px] font-medium leading-tight">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
