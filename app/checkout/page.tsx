"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CheckoutPage() {
  const { items, subtotal, itemCount, clearCart } = useCart()
  const { t } = useLanguage()
  const router = useRouter()
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod")

  const shipping = subtotal >= 200 ? 0 : 25
  const total = subtotal + shipping

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    clearCart()
    router.push("/checkout/success")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-24 lg:pb-0">
        <TopBar />
        <Navbar />
        <MobileBottomNav />
        <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20">
          <p className="mb-4 text-muted-foreground">{t.cart.empty}</p>
          <Button asChild>
            <Link href="/">{t.cart.continueShopping}</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            {t.productPage.breadcrumbHome}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/cart" className="transition-colors hover:text-foreground">
            {t.cart.title}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{t.checkout.title}</span>
        </nav>

        <h1 className="mb-8 font-serif text-2xl font-bold text-foreground md:text-3xl">
          {t.checkout.title}
        </h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  {t.checkout.billingInfo}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="fullName">{t.checkout.fullName}</Label>
                    <Input
                      id="fullName"
                      className="mt-1.5"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t.checkout.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-1.5"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t.checkout.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="mt-1.5"
                      placeholder="0599123456"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">{t.checkout.address}</Label>
                    <Input
                      id="address"
                      className="mt-1.5"
                      placeholder="Street, Building, Floor"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">{t.checkout.city}</Label>
                    <Input
                      id="city"
                      className="mt-1.5"
                      placeholder="Ramallah"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    {t.checkout.shippingInfo}
                  </h2>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={sameAsBilling}
                      onChange={(e) => setSameAsBilling(e.target.checked)}
                      className="rounded border-border"
                    />
                    {t.checkout.sameAsBilling}
                  </label>
                </div>
                {!sameAsBilling && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="shipAddress">Address</Label>
                      <Input
                        id="shipAddress"
                        className="mt-1.5"
                        placeholder="Street, Building, Floor"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipCity">City</Label>
                      <Input
                        id="shipCity"
                        className="mt-1.5"
                        placeholder="City"
                      />
                    </div>
                  </div>
                )}
                {sameAsBilling && (
                  <p className="text-sm text-muted-foreground">
                    {t.checkout.sameAsBilling}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  {t.checkout.paymentMethod}
                </h2>
                <div className="space-y-3">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      paymentMethod === "cod"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="sr-only"
                    />
                    <span className="text-2xl">💵</span>
                    <div>
                      <p className="font-medium">{t.checkout.cashOnDelivery}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.trust.cashOnDeliveryDesc}
                      </p>
                    </div>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      paymentMethod === "card"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="sr-only"
                    />
                    <span className="text-2xl">💳</span>
                    <p className="font-medium">{t.checkout.cardPayment}</p>
                  </label>
                </div>
                <div className="mt-4">
                  <Label htmlFor="notes">{t.checkout.notes}</Label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="mt-1.5 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-accent"
                    placeholder="Special instructions..."
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  {t.checkout.orderSummary}
                </h2>
                <div className="max-h-64 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b border-border pb-3 last:border-0"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.size} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">
                        {(item.price * item.quantity).toFixed(2)} ILS
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.cart.subtotal}</span>
                    <span>{subtotal.toFixed(2)} ILS</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.cart.shipping}</span>
                    <span>
                      {shipping === 0 ? t.trust.freeShipping : `${shipping} ILS`}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-lg font-bold">
                  <span>{t.cart.total}</span>
                  <span>{total.toFixed(2)} ILS</span>
                </div>
                <Button type="submit" className="mt-4 h-12 w-full" size="lg">
                  {t.checkout.placeOrder}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
