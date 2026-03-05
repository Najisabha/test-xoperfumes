"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star, Zap, Truck, RotateCcw } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"

interface ProductCardProps {
  slug?: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  freeDelivery?: boolean
  returnWithin30Days?: boolean
}

export function ProductCard({
  slug,
  name,
  brand,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  freeDelivery,
  returnWithin30Days,
}: ProductCardProps) {
  const productUrl = slug ? `/product/${slug}` : "/product"
  const [liked, setLiked] = useState(false)
  const { t } = useLanguage()

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:border-border hover:shadow-xl">
      {/* Image */}
      <Link
        href={productUrl}
        className="relative block aspect-square overflow-hidden bg-gradient-to-b from-secondary/50 to-secondary"
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 176px, 224px"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        {originalPrice && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-accent-foreground shadow-sm">
            -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
          </span>
        )}
        <div className="absolute right-2.5 top-2.5">
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
            className="rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-white"
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-foreground/80"}`}
            />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={productUrl} className="transition-colors hover:text-accent">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {brand}
          </p>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-foreground">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 transition-colors ${
                  i < Math.round(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/25"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">({reviews})</span>
        </div>
        {(freeDelivery || returnWithin30Days) && (
          <div className="flex flex-wrap gap-1.5">
            {freeDelivery && (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                <Truck className="h-3 w-3 shrink-0" />
                {t.products.freeDelivery}
              </span>
            )}
            {returnWithin30Days && (
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-1 text-[10px] font-medium text-blue-700 dark:text-blue-400">
                <RotateCcw className="h-3 w-3 shrink-0" />
                {t.products.returnDays}
              </span>
            )}
          </div>
        )}
        <div className="mt-1 flex items-baseline gap-2 border-t border-border/50 pt-3">
          <span className="text-base font-bold text-foreground">
            {price.toFixed(2)} ILS
          </span>
          {originalPrice && (
            <span className="text-xs font-medium text-muted-foreground line-through">
              {originalPrice.toFixed(2)} ILS
            </span>
          )}
        </div>
        <div className="mt-2 flex gap-2">
          <button
            onClick={(e) => e.preventDefault()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-border bg-transparent px-2 py-2.5 text-xs font-semibold text-foreground transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {t.products.addToCart}
          </button>
          <Link
            href={productUrl}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-2 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            <Zap className="h-3.5 w-3.5" />
            {t.products.buyNow}
          </Link>
        </div>
      </div>
    </article>
  )
}
