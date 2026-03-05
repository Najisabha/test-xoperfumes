"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight, MapPin } from "lucide-react"

const stores = [
  { city: "رام الله", address: "وسط البلد، بجانب البنك العربي", phone: "02-2951234" },
  { city: "نابلس", address: "شارع فيصل، الطابق الأول", phone: "09-2345678" },
  { city: "عمّان", address: "شارع الجامعة، مجمع العبدلي", phone: "06-5678901" },
]

export default function StoreLocatorPage() {
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
          <span className="text-foreground">{t.footer.support.storeLocator}</span>
        </nav>

        <h1 className="mb-8 font-serif text-3xl font-bold text-foreground">
          {t.footer.support.storeLocator}
        </h1>

        <div className="space-y-6">
          {stores.map((store) => (
            <div
              key={store.city}
              className="flex gap-4 rounded-xl border border-border bg-card p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">{store.city}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{store.address}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.contact.phone}: {store.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
