"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useEffect } from "react"

export default function CheckoutSuccessPage() {
  const { t } = useLanguage()
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-20">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          تم تأكيد طلبك بنجاح
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          سنتواصل معك قريباً لتأكيد تفاصيل التوصيل. رقم الطلب: #XO-{Date.now().toString().slice(-8)}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/account">{t.account.orders}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">{t.cart.continueShopping}</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
