"use client"

import { User, ShoppingBag, Grid3x3, Home, Tag, Store } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/i18n/language-context"
import { useCart } from "@/lib/cart-context"

export function MobileBottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { itemCount } = useCart()

  const navItems = [
    { href: "/", icon: Home, label: t.nav.home, fillActive: true },
    { href: "/boutique", icon: Store, label: t.nav.boutique },
    { href: "/categories", icon: Grid3x3, label: t.nav.categories },
    { href: "/brands", icon: Tag, label: t.nav.brands },
    { href: "/cart", icon: ShoppingBag, label: t.nav.cart, badge: itemCount },
    { href: "/account", icon: User, label: t.nav.account },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-around px-1 py-2">
        {navItems.map(({ href, icon: Icon, label, badge, fillActive }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-0.5 rounded-lg px-1.5 py-1.5 transition-colors ${
                isActive ? "text-accent" : "text-foreground hover:text-accent"
              }`}
              aria-label={label}
            >
              <Icon
                className={`h-5 w-5 ${isActive && fillActive ? "fill-current" : ""}`}
              />
              {typeof badge === "number" && badge > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {badge}
                </span>
              )}
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
