import type { Product } from "./data"

const productImages = [
  "/images/product-1.jpg",
  "/images/product-2.jpg",
  "/images/product-3.jpg",
  "/images/product-4.jpg",
  "/images/product-5.jpg",
  "/images/perfume-placeholder-1.svg",
  "/images/perfume-placeholder-2.svg",
  "/images/perfume-placeholder-3.svg",
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, slug: "dior-sauvage-eau-de-parfum", name: "Sauvage Eau de Parfum", brand: "Dior", brandSlug: "dior", categorySlug: "men", price: 189, originalPrice: 280, image: "/images/product-1.jpg", rating: 4.8, reviews: 124, freeDelivery: true, returnWithin30Days: true },
  { id: 2, slug: "chanel-bleu-de-chanel", name: "Bleu de Chanel", brand: "Chanel", brandSlug: "chanel", categorySlug: "men", price: 145, originalPrice: 180, image: "/images/product-2.jpg", rating: 4, reviews: 15, freeDelivery: true, returnWithin30Days: true },
  { id: 3, slug: "armani-acqua-di-gio-profumo", name: "Acqua di Gio Profumo", brand: "Armani", brandSlug: "armani", categorySlug: "men", price: 165, originalPrice: 220, image: "/images/product-3.jpg", rating: 5, reviews: 110, freeDelivery: true },
  { id: 4, slug: "versace-eros-eau-de-toilette", name: "Eros Eau de Toilette", brand: "Versace", brandSlug: "versace", categorySlug: "men", price: 95, image: "/images/product-4.jpg", rating: 3, reviews: 180, freeDelivery: true },
  { id: 5, slug: "lancome-la-vie-est-belle", name: "La Vie Est Belle", brand: "Lancome", brandSlug: "lancome", categorySlug: "women", price: 178, originalPrice: 250, image: "/images/product-5.jpg", rating: 4, reviews: 30, freeDelivery: true, returnWithin30Days: true },
  { id: 6, slug: "ysl-black-opium", name: "Black Opium", brand: "YSL", brandSlug: "ysl", categorySlug: "women", price: 132, image: "/images/perfume-placeholder-1.svg", rating: 5, reviews: 140, freeDelivery: true },
  { id: 7, slug: "tom-ford-oud-wood-intense", name: "Oud Wood Intense", brand: "Tom Ford", brandSlug: "tom-ford", categorySlug: "unisex", price: 245, originalPrice: 320, image: "/images/perfume-placeholder-2.svg", rating: 4, reviews: 25, freeDelivery: true, returnWithin30Days: true },
  { id: 8, slug: "carolina-herrera-good-girl", name: "Good Girl", brand: "Carolina Herrera", brandSlug: "carolina-herrera", categorySlug: "women", price: 158, image: "/images/perfume-placeholder-3.svg", rating: 3, reviews: 195 },
  { id: 9, slug: "creed-aventus-for-her", name: "Aventus For Her", brand: "Creed", brandSlug: "creed", categorySlug: "women", price: 320, originalPrice: 400, image: "/images/product-1.jpg", rating: 4, reviews: 45, freeDelivery: true },
  { id: 10, slug: "tom-ford-tobacco-vanille", name: "Tobacco Vanille", brand: "Tom Ford", brandSlug: "tom-ford", categorySlug: "unisex", price: 285, originalPrice: 350, image: "/images/product-2.jpg", rating: 5, reviews: 88, freeDelivery: true },
  { id: 11, slug: "mfk-baccarat-rouge-540", name: "Baccarat Rouge 540", brand: "MFK", brandSlug: "mfk", categorySlug: "unisex", price: 265, originalPrice: 330, image: "/images/product-3.jpg", rating: 4, reviews: 72, freeDelivery: true },
  { id: 12, slug: "tom-ford-lost-cherry", name: "Lost Cherry", brand: "Tom Ford", brandSlug: "tom-ford", categorySlug: "women", price: 295, image: "/images/product-4.jpg", rating: 3, reviews: 55 },
  { id: 13, slug: "xo-collection-rose-gold-body-mist", name: "Rose Gold Body Mist", brand: "XO Collection", brandSlug: "xo-collection", categorySlug: "body-care", price: 45, image: "/images/product-5.jpg", rating: 4, reviews: 120, freeDelivery: true, returnWithin30Days: true },
  { id: 14, slug: "arabian-essence-amber-oud-deodorant", name: "Amber Oud Deodorant", brand: "Arabian Essence", brandSlug: "arabian-essence", categorySlug: "body-care", price: 35, image: "/images/perfume-placeholder-1.svg", rating: 5, reviews: 90, freeDelivery: true },
  { id: 15, slug: "xo-basics-classic-musk-edt", name: "Classic Musk EDT", brand: "XO Basics", brandSlug: "xo-basics", categorySlug: "men", price: 28, image: "/images/perfume-placeholder-2.svg", rating: 3, reviews: 200, returnWithin30Days: true },
  { id: 16, slug: "fresh-line-fresh-citrus-splash", name: "Fresh Citrus Splash", brand: "Fresh Line", brandSlug: "fresh-line", categorySlug: "unisex", price: 32, image: "/images/perfume-placeholder-3.svg", rating: 4, reviews: 65 },
  { id: 17, slug: "ysl-libre-intense", name: "Libre Intense", brand: "YSL", brandSlug: "ysl", categorySlug: "women", price: 195, image: "/images/product-1.jpg", rating: 5, reviews: 42, freeDelivery: true },
  { id: 18, slug: "viktor-rolf-flowerbomb-nectar", name: "Flowerbomb Nectar", brand: "Viktor&Rolf", brandSlug: "viktor-rolf", categorySlug: "women", price: 175, image: "/images/product-2.jpg", rating: 4, reviews: 78 },
  { id: 19, slug: "dior-jadore-infinissime", name: "J'adore Infinissime", brand: "Dior", brandSlug: "dior", categorySlug: "women", price: 165, image: "/images/product-3.jpg", rating: 3, reviews: 33, freeDelivery: true },
  { id: 20, slug: "armani-stronger-with-you", name: "Stronger With You", brand: "Armani", brandSlug: "armani", categorySlug: "men", price: 145, image: "/images/product-4.jpg", rating: 4, reviews: 156, freeDelivery: true },
]

const products: Product[] = [...INITIAL_PRODUCTS]
let nextId = Math.max(...INITIAL_PRODUCTS.map((p) => p.id), 0) + 1

export function getAllProducts(): Product[] {
  return [...products]
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((p) => p.brandSlug === brandSlug)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim()
  if (!q) return products
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
  )
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brandSlug === product.brandSlug || p.categorySlug === product.categorySlug)
    )
    .slice(0, limit)
}

export function addProduct(data: Omit<Product, "id" | "slug" | "brandSlug">): Product {
  const brandSlug = slugify(data.brand)
  const slug = slugify(`${data.brand}-${data.name}`)
  const product: Product = {
    ...data,
    id: nextId++,
    slug,
    brandSlug,
    image: data.image || productImages[(nextId - 1) % productImages.length],
  }
  products.push(product)
  return product
}

export function updateProduct(id: number, data: Partial<Omit<Product, "id">>): Product | undefined {
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return undefined
  const existing = products[idx]
  const slug = data.name !== undefined || data.brand !== undefined
    ? slugify(`${data.brand ?? existing.brand}-${data.name ?? existing.name}`)
    : existing.slug
  const brandSlug = data.brand !== undefined ? slugify(data.brand) : existing.brandSlug
  const updated: Product = {
    ...existing,
    ...data,
    id: existing.id,
    slug,
    brandSlug,
  }
  products[idx] = updated
  return updated
}

export function deleteProduct(id: number): boolean {
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return false
  products.splice(idx, 1)
  return true
}
