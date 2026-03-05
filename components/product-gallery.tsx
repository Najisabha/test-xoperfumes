"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react"
import type { Product } from "@/lib/data"

const defaultImages = [
  "/images/product-detail-main.jpg",
  "/images/product-detail-2.jpg",
  "/images/product-detail-3.jpg",
  "/images/product-detail-4.jpg",
]

export function ProductGallery({ product }: { product?: Product }) {
  const images = product ? [product.image, ...defaultImages.slice(1)] : defaultImages
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div
          className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-secondary"
          onClick={() => setZoomed(true)}
        >
          <Image
            src={images[active]}
            alt="Product image"
            fill
            className="object-contain p-4 transition-transform duration-300"
            priority
          />
          <span className="absolute right-3 top-3 rounded-full bg-card/80 p-1.5 text-muted-foreground backdrop-blur-sm">
            <ZoomIn className="h-4 w-4" />
          </span>
          {/* Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-card"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-card"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-secondary transition-all ${
                active === i ? "border-accent" : "border-border hover:border-muted-foreground"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src} alt={`Thumb ${i + 1}`} fill className="object-contain p-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setZoomed(false)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close zoom"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-[80vmin] w-[80vmin]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[active]}
              alt="Zoomed product"
              fill
              className="object-contain"
            />
          </div>
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  )
}
