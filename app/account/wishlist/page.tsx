"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AccountWishlistPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-8 font-serif text-2xl font-bold text-foreground">{t.account.wishlist}</h1>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-16">
          <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            {t.account.wishlistEmpty}
          </h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            {t.account.wishlistEmptyDesc}
          </p>
          <Button asChild>
            <Link href="/">{t.cart.continueShopping}</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
