"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight, Truck } from "lucide-react"

export default function DeliveryPage() {
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
          <span className="text-foreground">{t.footer.support.deliveryInfo}</span>
        </nav>

        <h1 className="mb-6 font-serif text-3xl font-bold text-foreground">
          {t.footer.support.deliveryInfo}
        </h1>

        <div className="space-y-6 text-muted-foreground">
          <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
            <Truck className="h-8 w-8 shrink-0 text-accent" />
            <div>
              <h2 className="mb-2 font-semibold text-foreground">{t.trust.freeShipping}</h2>
              <p>{t.trust.freeShippingDesc}</p>
            </div>
          </div>
          <p>{t.productPage.faqs.a3}</p>
          <p>نقوم بالتوصيل إلى جميع مناطق فلسطين والأردن. للطلبات الكبيرة أو المؤسسية يرجى التواصل معنا.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
