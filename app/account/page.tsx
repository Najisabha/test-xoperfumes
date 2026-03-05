"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const accountLinks = [
  { href: "/account/orders", icon: Package, labelKey: "orders" as const },
  { href: "/account/wishlist", icon: Heart, labelKey: "wishlist" as const },
  { href: "/account/addresses", icon: MapPin, labelKey: "addresses" as const },
  { href: "/account/profile", icon: User, labelKey: "profile" as const },
]

export default function AccountPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            {t.account.title}
          </h1>
          <p className="mt-1 text-muted-foreground">{t.account.loginRequired}</p>
          <Button asChild className="mt-4">
            <Link href="/login">{t.nav.login}</Link>
          </Button>
        </div>

        <div className="space-y-2">
          {accountLinks.map(({ href, icon: Icon, labelKey }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-accent/50 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <span className="font-medium text-foreground">
                  {t.account[labelKey]}
                </span>
              </div>
              <ChevronLeft className="h-5 w-5 -rotate-180 text-muted-foreground" />
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center">
            <h3 className="mb-2 font-semibold text-foreground">
              {t.account.noOrders}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t.account.loginRequired}
            </p>
            <Button variant="outline" asChild>
              <Link href="/">{t.cart.continueShopping}</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 py-3 text-destructive transition-colors hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            {t.account.logout}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
