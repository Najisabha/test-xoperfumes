"use client"

import { useState } from "react"
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Store,
  LayoutGrid,
  Tag,
  Home,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n/language-context"
import { useCart } from "@/lib/cart-context"

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useLanguage()
  const { itemCount } = useCart()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchOpen(false)
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const navItems = [
    { label: t.nav.home, href: "/", icon: Home },
    { label: t.nav.boutique, href: "/boutique", icon: Store },
    { label: t.nav.categories, href: "/categories", icon: LayoutGrid },
    { label: t.nav.brands, href: "/brands", icon: Tag },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            xo<span className="text-accent">perfumes</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-accent"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search products"
              className="p-1.5 text-foreground transition-colors hover:text-accent"
            >
              <Search className="h-5 w-5" />
            </button>
            {searchOpen && (
              <form onSubmit={handleSearch} className="absolute right-0 top-full mt-2 w-72 rounded-md border border-border bg-popover p-3 shadow-lg sm:w-80">
                <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.nav.searchPlaceholder}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    autoFocus
                  />
                </div>
              </form>
            )}
          </div>

          {/* Wishlist */}
          <Link
            href="/account"
            className="relative p-1.5 text-foreground transition-colors hover:text-accent"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              0
            </span>
          </Link>

          {/* Cart — hidden on mobile */}
          <Link
            href="/cart"
            className="relative hidden p-1.5 text-foreground transition-colors hover:text-accent lg:block"
            aria-label="My Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              {itemCount}
            </span>
          </Link>

          {/* Login */}
          <Link
            href="/login"
            className="hidden items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 lg:flex"
          >
            <User className="h-4 w-4" />
            <span>{t.nav.login}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
