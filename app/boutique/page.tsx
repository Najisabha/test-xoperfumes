"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { ProductRow } from "@/components/product-row"
import { useLanguage } from "@/lib/i18n/language-context"
import { ProductCard } from "@/components/product-card"

const productImages = [
  "/images/product-1.jpg",
  "/images/product-2.jpg",
  "/images/product-3.jpg",
  "/images/product-4.jpg",
  "/images/product-5.jpg",
]

function generateProducts(
  startId: number,
  names: string[],
  brands: string[],
  options?: { freeDelivery?: boolean; returnWithin30Days?: boolean }
) {
  return names.map((name, i) => ({
    id: startId + i,
    name,
    brand: brands[i % brands.length],
    price: Math.round((30 + Math.random() * 200) * 100) / 100,
    originalPrice:
      Math.random() > 0.5
        ? Math.round((200 + Math.random() * 200) * 100) / 100
        : undefined,
    image: productImages[i % productImages.length],
    rating: 3 + Math.round(Math.random() * 2),
    reviews: Math.floor(10 + Math.random() * 200),
    freeDelivery: options?.freeDelivery,
    returnWithin30Days: options?.returnWithin30Days,
  }))
}

const newArrivals = generateProducts(
  1,
  [
    "Libre Intense",
    "Idôle L'Intense",
    "Good Girl Legère",
    "Si Passione",
    "Black Opium Over Red",
    "Eros Flame",
  ],
  ["YSL", "Lancôme", "Carolina Herrera", "Armani", "YSL", "Versace"],
  { freeDelivery: true, returnWithin30Days: true }
)

const bestSellers = generateProducts(
  20,
  [
    "Sauvage Eau de Parfum",
    "Bleu de Chanel",
    "Acqua di Gio Profumo",
    "Eros Eau de Toilette",
    "La Vie Est Belle",
    "Black Opium",
  ],
  ["Dior", "Chanel", "Armani", "Versace", "Lancome", "YSL"]
)

const exclusiveProducts = generateProducts(
  40,
  [
    "XO Signature Oud",
    "Arabian Nights Limited",
    "Palestine Rose Edition",
    "Desert Bloom",
  ],
  ["XO Collection", "XO Collection", "XO Collection", "XO Collection"],
  { freeDelivery: true, returnWithin30Days: true }
)

export default function BoutiquePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main>
        <div className="border-b border-border bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              xoperfumes
            </span>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {t.boutique.title}
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {t.boutique.subtitle}
            </p>
          </div>
        </div>

        <div className="border-t border-border" />
        <ProductRow title={t.boutique.newArrivals} products={newArrivals} />

        <div className="border-t border-border" />
        <ProductRow title={t.boutique.bestSellers} products={bestSellers} />

        <div className="border-t border-border" />
        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-foreground md:text-2xl">
              {t.boutique.exclusive}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
            {exclusiveProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
