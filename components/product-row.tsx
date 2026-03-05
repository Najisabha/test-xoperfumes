"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "./product-card"

interface Product {
  id: number
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

interface ProductRowProps {
  title: string
  products: Product[]
}

export function ProductRow({ title, products }: ProductRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-foreground md:text-2xl text-balance">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="rounded-full border border-border bg-card p-1.5 text-foreground transition-colors hover:bg-muted"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded-full border border-border bg-card p-1.5 text-foreground transition-colors hover:bg-muted"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="w-44 flex-shrink-0 sm:w-52 md:w-56">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  )
}
