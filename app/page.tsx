"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { HeroSlider } from "@/components/hero-slider"
import { Categories } from "@/components/categories"
import { ProductRow } from "@/components/product-row"
import { ShopByBrands } from "@/components/shop-by-brands"
import { TrustBadges } from "@/components/trust-badges"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { bestSellers, everythingYouNeed, budgetPicks, mostViewed } from "@/lib/data"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />
      <main>
        <HeroSlider />
        <Categories />
        <div className="border-t border-border" />
        <ProductRow title={t.products.bestSellers} products={bestSellers} />
        <div className="border-t border-border" />
        <ProductRow title={t.products.everythingYouNeed} products={everythingYouNeed} />
        <div className="border-t border-border" />
        <ShopByBrands />
        <div className="border-t border-border" />
        <ProductRow title={t.products.budgetPicks} products={budgetPicks} />
        <div className="border-t border-border" />
        <ProductRow title={t.products.mostViewed} products={mostViewed} />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  )
}
