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

export interface Product {
  id: number
  slug: string
  name: string
  brand: string
  brandSlug: string
  categorySlug: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  freeDelivery?: boolean
  returnWithin30Days?: boolean
  description?: string
}

export interface Category {
  slug: string
  nameKey: string
  nameEn: string
  image: string
}

export interface Brand {
  slug: string
  name: string
  logo: string
  productCount: number
}

function createProduct(
  id: number,
  name: string,
  brand: string,
  category: string,
  options?: Partial<Product>
): Product {
  return {
    id,
    slug: slugify(`${brand}-${name}`),
    name,
    brand,
    brandSlug: slugify(brand),
    categorySlug: category,
    price: options?.price ?? Math.round((30 + Math.random() * 200) * 100) / 100,
    originalPrice: options?.originalPrice,
    image: options?.image ?? productImages[id % productImages.length],
    rating: options?.rating ?? 3 + Math.round(Math.random() * 2),
    reviews: options?.reviews ?? Math.floor(10 + Math.random() * 200),
    freeDelivery: options?.freeDelivery,
    returnWithin30Days: options?.returnWithin30Days,
    description: options?.description,
  }
}

export const CATEGORIES: Category[] = [
  { slug: "women", nameKey: "women", nameEn: "Women", image: "/images/cat-women.jpg" },
  { slug: "men", nameKey: "men", nameEn: "Men", image: "/images/cat-men.jpg" },
  { slug: "unisex", nameKey: "unisex", nameEn: "Unisex", image: "/images/cat-unisex.jpg" },
  { slug: "oud", nameKey: "oud", nameEn: "Oud", image: "/images/cat-oud.jpg" },
  { slug: "body-care", nameKey: "bodyCare", nameEn: "Body Care", image: "/images/cat-bodycare.jpg" },
  { slug: "gift-sets", nameKey: "giftSets", nameEn: "Gift Sets", image: "/images/cat-gifts.jpg" },
]

export const BRANDS: Brand[] = [
  { slug: "dior", name: "Dior", logo: "/images/product-1.jpg", productCount: 45 },
  { slug: "chanel", name: "Chanel", logo: "/images/product-2.jpg", productCount: 38 },
  { slug: "tom-ford", name: "Tom Ford", logo: "/images/product-3.jpg", productCount: 52 },
  { slug: "gucci", name: "Gucci", logo: "/images/product-4.jpg", productCount: 29 },
  { slug: "versace", name: "Versace", logo: "/images/product-5.jpg", productCount: 41 },
  { slug: "armani", name: "Armani", logo: "/images/cat-women.jpg", productCount: 67 },
  { slug: "ysl", name: "YSL", logo: "/images/cat-men.jpg", productCount: 34 },
  { slug: "prada", name: "Prada", logo: "/images/cat-unisex.jpg", productCount: 22 },
  { slug: "burberry", name: "Burberry", logo: "/images/cat-oud.jpg", productCount: 28 },
  { slug: "bvlgari", name: "Bvlgari", logo: "/images/cat-bodycare.jpg", productCount: 56 },
  { slug: "hugo-boss", name: "Hugo Boss", logo: "/images/cat-gifts.jpg", productCount: 31 },
  { slug: "dolce-gabbana", name: "Dolce & Gabbana", logo: "/images/product-detail-main.jpg", productCount: 44 },
  { slug: "kayali", name: "KAYALI", logo: "/images/product-1.jpg", productCount: 18 },
  { slug: "laverne", name: "LAVERNE", logo: "/images/product-2.jpg", productCount: 12 },
  { slug: "assaf", name: "ASSAF", logo: "/images/product-3.jpg", productCount: 8 },
  { slug: "victorias-secret", name: "Victoria's Secret", logo: "/images/product-4.jpg", productCount: 25 },
  { slug: "rare-beauty", name: "Rare Beauty", logo: "/images/cat-women.jpg", productCount: 15 },
  { slug: "charlotte-tilbury", name: "Charlotte Tilbury", logo: "/images/cat-gifts.jpg", productCount: 22 },
]

const ALL_PRODUCTS: Product[] = [
  createProduct(1, "Sauvage Eau de Parfum", "Dior", "men", {
    price: 189,
    originalPrice: 280,
    freeDelivery: true,
    returnWithin30Days: true,
    rating: 4.8,
    reviews: 124,
  }),
  createProduct(2, "Bleu de Chanel", "Chanel", "men", {
    price: 145,
    originalPrice: 180,
    freeDelivery: true,
    returnWithin30Days: true,
  }),
  createProduct(3, "Acqua di Gio Profumo", "Armani", "men", {
    price: 165,
    originalPrice: 220,
    freeDelivery: true,
  }),
  createProduct(4, "Eros Eau de Toilette", "Versace", "men", { price: 95, freeDelivery: true }),
  createProduct(5, "La Vie Est Belle", "Lancome", "women", {
    price: 178,
    originalPrice: 250,
    freeDelivery: true,
    returnWithin30Days: true,
  }),
  createProduct(6, "Black Opium", "YSL", "women", { price: 132, freeDelivery: true }),
  createProduct(7, "Oud Wood Intense", "Tom Ford", "unisex", {
    price: 245,
    originalPrice: 320,
    freeDelivery: true,
    returnWithin30Days: true,
  }),
  createProduct(8, "Good Girl", "Carolina Herrera", "women", { price: 158 }),
  createProduct(9, "Aventus For Her", "Creed", "women", {
    price: 320,
    originalPrice: 400,
    freeDelivery: true,
  }),
  createProduct(10, "Tobacco Vanille", "Tom Ford", "unisex", {
    price: 285,
    originalPrice: 350,
    freeDelivery: true,
  }),
  createProduct(11, "Baccarat Rouge 540", "MFK", "unisex", {
    price: 265,
    originalPrice: 330,
    freeDelivery: true,
  }),
  createProduct(12, "Lost Cherry", "Tom Ford", "women", { price: 295 }),
  createProduct(13, "Rose Gold Body Mist", "XO Collection", "body-care", {
    price: 45,
    freeDelivery: true,
    returnWithin30Days: true,
  }),
  createProduct(14, "Amber Oud Deodorant", "Arabian Essence", "body-care", {
    price: 35,
    freeDelivery: true,
  }),
  createProduct(15, "Classic Musk EDT", "XO Basics", "men", { price: 28, returnWithin30Days: true }),
  createProduct(16, "Fresh Citrus Splash", "Fresh Line", "unisex", { price: 32 }),
  createProduct(17, "Libre Intense", "YSL", "women", { price: 195 }),
  createProduct(18, "Flowerbomb Nectar", "Viktor&Rolf", "women", { price: 175 }),
  createProduct(19, "J'adore Infinissime", "Dior", "women", { price: 165 }),
  createProduct(20, "Stronger With You", "Armani", "men", { price: 145 }),
]

export function getAllProducts(): Product[] {
  return ALL_PRODUCTS
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return ALL_PRODUCTS.filter((p) => p.categorySlug === categorySlug)
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return ALL_PRODUCTS.filter((p) => p.brandSlug === brandSlug)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim()
  if (!q) return ALL_PRODUCTS
  return ALL_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
  )
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.brandSlug === product.brandSlug || p.categorySlug === product.categorySlug)
  ).slice(0, limit)
}

export const bestSellers = ALL_PRODUCTS.slice(0, 8)
export const everythingYouNeed = ALL_PRODUCTS.slice(8, 16)
export const budgetPicks = ALL_PRODUCTS.slice(12, 20)
export const mostViewed = ALL_PRODUCTS.slice(4, 12)
