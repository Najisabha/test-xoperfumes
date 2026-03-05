"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AccountOrdersPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">{t.productPage.breadcrumbHome}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/account" className="transition-colors hover:text-foreground">{t.account.title}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{t.account.orders}</span>
        </nav>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-16">
          <Package className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold text-foreground">{t.account.noOrders}</h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">{t.account.loginRequired}</p>
          <Button asChild>
            <Link href="/">{t.cart.continueShopping}</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
