"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

const brands = [
  { name: "Dior", slug: "dior" },
  { name: "Chanel", slug: "chanel" },
  { name: "Tom Ford", slug: "tom-ford" },
  { name: "Armani", slug: "armani" },
  { name: "Versace", slug: "versace" },
  { name: "Gucci", slug: "gucci" },
  { name: "Burberry", slug: "burberry" },
  { name: "Prada", slug: "prada" },
  { name: "YSL", slug: "ysl" },
  { name: "Dolce & Gabbana", slug: "dolce-gabbana" },
  { name: "Bvlgari", slug: "bvlgari" },
  { name: "Hugo Boss", slug: "hugo-boss" },
]

export function ShopByBrands() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-center font-serif text-xl font-bold text-foreground md:text-2xl text-balance">
        {t.shopByBrands}
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={`/brands/${brand.slug}`}
            className="flex items-center justify-center rounded-lg border border-border bg-card px-4 py-5 text-center text-sm font-semibold text-card-foreground transition-all hover:border-accent hover:shadow-md"
          >
            {brand.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
