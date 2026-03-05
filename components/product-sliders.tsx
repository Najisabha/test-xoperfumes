"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import type { Product } from "@/lib/data"

const FALLBACK_PRODUCTS: (Product & { originalPrice?: number })[] = [
  { id: 1, slug: "bleu-chanel", name: "Bleu de Chanel EDP", brand: "Chanel", brandSlug: "chanel", categorySlug: "men", price: 220, originalPrice: 320, image: "/images/product-1.jpg", rating: 4.9, reviews: 88 },
  { id: 2, slug: "oud-wood", name: "Oud Wood Intense", brand: "Tom Ford", brandSlug: "tom-ford", categorySlug: "unisex", price: 395, originalPrice: 520, image: "/images/product-2.jpg", rating: 4.7, reviews: 54 },
]

function MiniProductCard({ product }: { product: Product & { originalPrice?: number } }) {
  const { t } = useLanguage()
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0
  return (
    <Link href={`/product/${product.slug}`} className="group relative flex w-44 flex-shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md sm:w-52">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image src={product.image} alt={product.name} fill className="object-contain p-3 transition-transform duration-300 group-hover:scale-105" />
        <span className="absolute left-2 top-2 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground">
          -{discount}%
        </span>
        <button className="absolute right-2 top-2 rounded-full bg-card/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-card">
          <Heart className="h-3.5 w-3.5 text-foreground" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">{product.brand}</p>
        <h3 className="line-clamp-2 text-xs font-medium leading-snug text-foreground">{product.name}</h3>
        <div className="flex items-center gap-0.5 py-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-2.5 w-2.5 ${i < Math.round(product.rating) ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
          ))}
          <span className="ml-1 text-[10px] text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-foreground">{product.price} ILS</span>
          <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
        </div>
        <span className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <ShoppingBag className="h-3.5 w-3.5" />
          {t.productPage.addToCart}
        </span>
      </div>
    </Link>
  )
}

function ProductSlider({ title, products }: { title: string; products: (Product & { originalPrice?: number })[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: "left" | "right") => {
    if (ref.current) ref.current.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" })
  }
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="rounded-full border border-border p-1.5 text-foreground transition-colors hover:bg-muted"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded-full border border-border p-1.5 text-foreground transition-colors hover:bg-muted"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={ref} className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {products.map((p) => (
          <MiniProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

export function ProductSliders({ relatedProducts }: { relatedProducts?: Product[] }) {
  const { t } = useLanguage()
  const products = relatedProducts?.length ? relatedProducts : FALLBACK_PRODUCTS
  return (
    <div className="flex flex-col gap-10">
      <ProductSlider title={t.productPage.relatedProducts} products={products} />
      <ProductSlider title={t.productPage.frequentlyPurchased} products={products} />
      <ProductSlider title={t.productPage.customersAlsoBought} products={products} />
    </div>
  )
}

export function ProductUSP() {
  const { t } = useLanguage()
  const USP_ITEMS = [
    { icon: Truck, title: t.productPage.usp.freeDelivery, desc: t.productPage.usp.freeDeliveryDesc },
    { icon: RotateCcw, title: t.productPage.usp.easyReturns, desc: t.productPage.usp.easyReturnsDesc },
    { icon: ShieldCheck, title: t.productPage.usp.authentic, desc: t.productPage.usp.authenticDesc },
    { icon: Headphones, title: t.productPage.usp.support, desc: t.productPage.usp.supportDesc },
  ]
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {USP_ITEMS.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center transition-shadow hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      ))}
    </div>
  )
}
