"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AffiliatePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-2xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">{t.productPage.breadcrumbHome}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{t.footer.help.affiliate}</span>
        </nav>

        <div className="mb-8 flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
          <Users className="mb-4 h-16 w-16 text-accent" />
          <h1 className="mb-2 font-serif text-2xl font-bold text-foreground">
            {t.footer.help.affiliate}
          </h1>
          <p className="mb-6 text-muted-foreground">
            ادعم xoperfumes واكسب عمولة على كل عملية شراء تتم عبر رابطك. برنامج تابعين بسيط وشفاف.
          </p>
          <Button asChild>
            <Link href="/contact">انضم الآن</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
