"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  Heart,
  ShoppingBag,
  Bell,
  ChevronDown,
  ChevronUp,
  Star,
  Truck,
  MapPin,
  Tag,
  Check,
  Share2,
} from "lucide-react"
import type { Product } from "@/lib/data"

const sizes = ["30ml", "50ml", "100ml", "150ml"]

export function ProductInfoPanel({ product }: { product?: Product }) {
  const { t } = useLanguage()
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState("100ml")
  const [country, setCountry] = useState("palestine")
  const [state, setState] = useState("ramallah")
  const [couponOpen, setCouponOpen] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [liked, setLiked] = useState(false)

  const price = product?.price ?? 189.0
  const originalPrice = product?.originalPrice ?? 280.0
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <div className="flex flex-col gap-5">
      {/* Brand & Title */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">{product?.brand ?? "DIOR"}</span>
          <button
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
        <h1 className="text-2xl font-bold leading-tight text-foreground">
          {product?.name ?? "Sauvage Eau de Parfum"}
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {product?.description ?? "A powerful yet fresh fragrance built on the contrasts between a raw ruggedness and refined freshness. Bergamot and Spice on a Woody base."}
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < 4 ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">{product?.rating?.toFixed(1) ?? "4.8"}</span>
        <span className="text-sm text-muted-foreground">({product?.reviews ?? 124} reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-foreground">{price.toFixed(2)} ILS</span>
        <span className="text-lg text-muted-foreground line-through">{originalPrice.toFixed(2)} ILS</span>
        <span className="rounded-md bg-accent px-2.5 py-1 text-sm font-bold text-accent-foreground">
          -{discount}%
        </span>
      </div>

      {/* Size Selector */}
      <div>
        <p className="mb-2 text-sm font-semibold text-foreground">
          {t.productPage.info.size}: <span className="font-normal text-muted-foreground">{selectedSize}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                selectedSize === s
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground hover:border-accent/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <p className="mb-2 text-sm font-semibold text-foreground">{t.productPage.info.quantity}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center overflow-hidden rounded-lg border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3.5 py-2.5 text-lg font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-40"
              disabled={qty <= 1}
            >
              −
            </button>
            <span className="w-12 text-center text-sm font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-3.5 py-2.5 text-lg font-medium text-foreground transition-colors hover:bg-muted"
            >
              +
            </button>
          </div>
          <span className="text-sm text-muted-foreground">{t.productPage.info.inStock}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <ShoppingBag className="h-5 w-5" />
          {t.productPage.info.addToCart}
        </button>
        <button
          onClick={() => setLiked(!liked)}
          className={`rounded-xl border-2 p-3.5 transition-all ${
            liked ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground hover:border-accent/50"
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-accent" : ""}`} />
        </button>
      </div>

      {/* Notify Me */}
      <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent">
        <Bell className="h-4 w-4" />
        {t.productPage.info.notifyMe}
      </button>

      {/* Delivery */}
      <div className="rounded-xl border border-border bg-secondary/40 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Truck className="h-5 w-5 text-accent" />
          <span className="text-sm font-semibold text-foreground">{t.productPage.info.deliveryOptions}</span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <MapPin className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none"
            >
              <option value="palestine">{t.topbar.palestine}</option>
              <option value="jordan">{t.topbar.jordan}</option>
            </select>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none"
            >
              <option value="ramallah">{t.productPage.cities.ramallah}</option>
              <option value="nablus">{t.productPage.cities.nablus}</option>
              <option value="hebron">{t.productPage.cities.hebron}</option>
              <option value="jenin">{t.productPage.cities.jenin}</option>
              <option value="amman">{t.productPage.cities.amman}</option>
              <option value="zarqa">{t.productPage.cities.zarqa}</option>
            </select>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2">
          <Check className="h-4 w-4 text-accent" />
          <p className="text-sm text-foreground">
            {t.productPage.info.estimatedDelivery} <span className="font-semibold">{t.productPage.info.businessDays}</span>
          </p>
        </div>
      </div>

      {/* Coupon */}
      <div className="rounded-xl border border-border">
        <button
          onClick={() => setCouponOpen(!couponOpen)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/50"
        >
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-accent" />
            {t.productPage.info.applyCoupon}
          </div>
          {couponOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {couponOpen && (
          <div className="border-t border-border px-4 pb-4 pt-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder={t.productPage.info.enterCoupon}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
              />
              <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90">
                {t.productPage.info.apply}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Seller Info */}
      <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          XO
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{t.productPage.info.soldBy}</p>
          <p className="text-sm font-semibold text-foreground">xoperfumes Official Store</p>
        </div>
        <span className="ml-auto flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
          <Check className="h-3 w-3" />
          {t.productPage.info.verified}
        </span>
      </div>
    </div>
  )
}
