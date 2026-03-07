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

import * as productsStore from "./admin-products-store"

export function getAllProducts(): Product[] {
  return productsStore.getAllProducts()
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsStore.getProductBySlug(slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return productsStore.getProductsByCategory(categorySlug)
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return productsStore.getProductsByBrand(brandSlug)
}

export function searchProducts(query: string): Product[] {
  return productsStore.searchProducts(query)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return productsStore.getRelatedProducts(product, limit)
}

export function getBestSellers(): Product[] {
  return productsStore.getAllProducts().slice(0, 8)
}

export function getEverythingYouNeed(): Product[] {
  return productsStore.getAllProducts().slice(8, 16)
}

export function getBudgetPicks(): Product[] {
  return productsStore.getAllProducts().slice(12, 20)
}

export function getMostViewed(): Product[] {
  return productsStore.getAllProducts().slice(4, 12)
}

export const bestSellers = getBestSellers()
export const everythingYouNeed = getEverythingYouNeed()
export const budgetPicks = getBudgetPicks()
export const mostViewed = getMostViewed()
