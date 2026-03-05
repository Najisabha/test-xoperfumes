"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function CashBackPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-3xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">{t.productPage.breadcrumbHome}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{t.footer.links.cashBackPolicy}</span>
        </nav>

        <h1 className="mb-6 font-serif text-3xl font-bold text-foreground">
          {t.footer.links.cashBackPolicy}
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted-foreground">
          <p>نقدم برنامج استرداد نقدي على مشتريات مؤهلة. يتم احتساب النسبة وفق الشروط والأحكام. للاستفسار يرجى التواصل مع خدمة العملاء.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
