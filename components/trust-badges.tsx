"use client"

import { Truck, Banknote, RotateCcw, Headphones } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function TrustBadges() {
  const { t } = useLanguage()

  const badges = [
    {
      icon: Truck,
      title: t.trust.freeShipping,
      description: t.trust.freeShippingDesc,
    },
    {
      icon: Banknote,
      title: t.trust.cashOnDelivery,
      description: t.trust.cashOnDeliveryDesc,
    },
    {
      icon: RotateCcw,
      title: t.trust.moneyBack,
      description: t.trust.moneyBackDesc,
    },
    {
      icon: Headphones,
      title: t.trust.support,
      description: t.trust.supportDesc,
    },
  ]

  return (
    <section className="border-y border-border bg-secondary py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {badges.map((badge) => (
          <div key={badge.title} className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <badge.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{badge.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
