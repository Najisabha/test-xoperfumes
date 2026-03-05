"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function SitemapPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">{t.productPage.breadcrumbHome}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{t.footer.links.sitemap}</span>
        </nav>

        <h1 className="mb-8 font-serif text-3xl font-bold text-foreground">
          {t.footer.links.sitemap}
        </h1>

        <div className="grid gap-8 sm:grid-cols-2">
          <section>
            <h2 className="mb-4 font-semibold text-foreground">{t.nav.home}</h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-accent">{t.nav.home}</Link></li>
              <li><Link href="/boutique" className="text-muted-foreground hover:text-accent">{t.nav.boutique}</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-accent">{t.nav.categories}</Link></li>
              <li><Link href="/brands" className="text-muted-foreground hover:text-accent">{t.nav.brands}</Link></li>
              <li><Link href="/cart" className="text-muted-foreground hover:text-accent">{t.nav.cart}</Link></li>
              <li><Link href="/account" className="text-muted-foreground hover:text-accent">{t.nav.account}</Link></li>
            </ul>
          </section>
          <section>
            <h2 className="mb-4 font-semibold text-foreground">Shop</h2>
            <ul className="space-y-2">
              <li><Link href="/categories" className="text-muted-foreground hover:text-accent">{t.categoriesPage.title}</Link></li>
              <li><Link href="/brands" className="text-muted-foreground hover:text-accent">{t.brandsPage.title}</Link></li>
              <li><Link href="/search" className="text-muted-foreground hover:text-accent">{t.nav.searchPlaceholder}</Link></li>
            </ul>
          </section>
          <section>
            <h2 className="mb-4 font-semibold text-foreground">Info</h2>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-accent">{t.footer.links.aboutUs}</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-accent">{t.footer.links.contactUs}</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-accent">{t.footer.support.faq}</Link></li>
            </ul>
          </section>
          <section>
            <h2 className="mb-4 font-semibold text-foreground">Legal</h2>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-accent">{t.footer.links.privacyPolicy}</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-accent">{t.footer.links.termsConditions}</Link></li>
              <li><Link href="/refund" className="text-muted-foreground hover:text-accent">{t.footer.support.refundPolicy}</Link></li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
