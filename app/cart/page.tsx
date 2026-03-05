"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const { t } = useLanguage()

  const shipping = subtotal >= 200 ? 0 : 25
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 font-serif text-2xl font-bold text-foreground md:text-3xl">
          {t.cart.title}
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-20">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              {t.cart.empty}
            </h2>
            <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
              {t.cart.emptyDesc}
            </p>
            <Button asChild>
              <Link href="/">{t.cart.continueShopping}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                            {item.brand}
                          </p>
                          <h3 className="font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          aria-label={t.cart.remove}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 overflow-hidden rounded-lg border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-muted"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-lg font-bold text-foreground">
                          {(item.price * item.quantity).toFixed(2)} ILS
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  {t.checkout.orderSummary}
                </h2>
                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t.cart.subtotal} ({itemCount} {t.cart.quantity})
                    </span>
                    <span className="font-medium">{subtotal.toFixed(2)} ILS</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.cart.shipping}</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">{t.trust.freeShipping}</span>
                      ) : (
                        `${shipping.toFixed(2)} ILS`
                      )}
                    </span>
                  </div>
                  {subtotal < 200 && (
                    <p className="text-xs text-muted-foreground">
                      {t.cart.freeShipping}
                    </p>
                  )}
                </div>
                <div className="flex justify-between py-4 text-lg font-bold">
                  <span>{t.cart.total}</span>
                  <span>{total.toFixed(2)} ILS</span>
                </div>
                <Button asChild className="h-12 w-full" size="lg">
                  <Link href="/checkout">{t.cart.checkout}</Link>
                </Button>
                <Button asChild variant="outline" className="mt-3 w-full">
                  <Link href="/">{t.cart.continueShopping}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
