"use client"

import { useState } from "react"
import { Star, ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import type { Product } from "@/lib/data"

const reviews = [
  { name: "Ahmed K.", rating: 5, date: "Feb 2025", textKey: "r1" as const },
  { name: "Sara M.", rating: 5, date: "Jan 2025", textKey: "r2" as const },
  { name: "Omar T.", rating: 4, date: "Dec 2024", textKey: "r3" as const },
]

const TAB_KEYS = ["specs", "notes", "about", "howToUse", "reviews", "faq"] as const
type TabKey = typeof TAB_KEYS[number]

const specKeys = ["brand", "fragranceName", "concentration", "size", "gender", "topNotes", "heartNotes", "baseNotes", "launchYear", "countryOrigin", "longevity", "sillage"] as const
const specValues = ["Dior", "Sauvage Eau de Parfum", "Eau de Parfum (EDP)", "100ml", "Men", "Bergamot, Pepper", "Lavender, Pink Pepper, Vetiver", "Ambroxan, Cedar, Sandalwood", "2018", "France", "8-10 hours", "Heavy"]

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 flex-shrink-0 text-xs text-muted-foreground">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-accent" style={{ width: `${value}%` }} />
      </div>
      <span className="w-8 text-right text-xs font-medium text-foreground">{(value / 20).toFixed(1)}</span>
    </div>
  )
}

export function ProductTabs({ product }: { product?: Product }) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<TabKey>("specs")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const tabLabels: Record<TabKey, string> = {
    specs: t.productPage.tabs.keySpecs,
    notes: t.productPage.tabs.notes,
    about: t.productPage.tabs.about,
    howToUse: t.productPage.tabs.howToUse,
    reviews: t.productPage.tabs.reviews,
    faq: t.productPage.tabs.faq,
  }

  const specs = specKeys.map((key, i) => ({
    label: t.productPage.tabs[key],
    value: product
      ? (key === "brand" ? product.brand : key === "fragranceName" ? product.name : specValues[i])
      : specValues[i],
  }))

  const faqs = [
    { q: t.productPage.faqs.q1, a: t.productPage.faqs.a1 },
    { q: t.productPage.faqs.q2, a: t.productPage.faqs.a2 },
    { q: t.productPage.faqs.q3, a: t.productPage.faqs.a3 },
    { q: t.productPage.faqs.q4, a: t.productPage.faqs.a4 },
  ]

  const howToUseSteps = [
    { step: "1", title: t.productPage.tabs.howToUseSteps.step1, desc: t.productPage.tabs.howToUseSteps.step1Desc },
    { step: "2", title: t.productPage.tabs.howToUseSteps.step2, desc: t.productPage.tabs.howToUseSteps.step2Desc },
    { step: "3", title: t.productPage.tabs.howToUseSteps.step3, desc: t.productPage.tabs.howToUseSteps.step3Desc },
    { step: "4", title: t.productPage.tabs.howToUseSteps.step4, desc: t.productPage.tabs.howToUseSteps.step4Desc },
  ]

  const notesSections = [
    { titleKey: "topNotes" as const, notes: ["Bergamot", "Pink Pepper", "Lavender"], color: "bg-blue-50 text-blue-700" },
    { titleKey: "heartNotes" as const, notes: ["Sichuan Pepper", "Lavender", "Vetiver", "Elemi"], color: "bg-purple-50 text-purple-700" },
    { titleKey: "baseNotes" as const, notes: ["Ambroxan", "Cedar", "Sandalwood", "Labdanum"], color: "bg-amber-50 text-amber-700" },
  ]

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Tab list */}
      <div className="flex overflow-x-auto border-b border-border">
        {TAB_KEYS.map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            className={`flex-shrink-0 px-5 py-3.5 text-sm font-medium transition-colors ${
              activeTab === tabKey
                ? "border-b-2 border-accent text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tabLabels[tabKey]}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5">
        {activeTab === "specs" && (
          <div className="overflow-hidden rounded-lg border border-border">
            {specs.map((row, i) => (
              <div
                key={specKeys[i]}
                className={`grid grid-cols-2 gap-4 px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-secondary/50" : "bg-card"
                }`}
              >
                <span className="font-medium text-muted-foreground">{row.label}</span>
                <span className="text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="grid gap-5 sm:grid-cols-3">
            {notesSections.map(({ titleKey, notes, color }) => (
              <div key={titleKey} className="rounded-xl border border-border p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">{t.productPage.tabs[titleKey]}</h3>
                <div className="flex flex-wrap gap-2">
                  {notes.map((n) => (
                    <span key={n} className={`rounded-full px-3 py-1 text-xs font-medium ${color}`}>{n}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            <p className="mb-3">
              Dior Sauvage Eau de Parfum is a bold, noble, and fresh fragrance. Renewed in its Eau de Parfum form, Sauvage is a juxtaposition of raw freshness and refined sophistication.
            </p>
            <p className="mb-3">
              Dior's master perfumer Francois Demachy worked with the French naturals supplier Charabot to source the finest Bergamot from Calabria, Italy — the Regent of Italian citrus. Combined with a powerful Ambroxan accord, this scent is both primitive and elegant.
            </p>
            <p>
              The bottle itself pays homage to wild, majestic landscapes — the broad sky, clear waters and desert winds — a visual language expressing the character of this radical, noble and savage scent.
            </p>
          </div>
        )}

        {activeTab === "howToUse" && (
          <div className="flex flex-col gap-4">
            {howToUseSteps.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {step}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{title}</h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="flex flex-col gap-6">
            {/* Summary */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex flex-col items-center gap-1">
                <span className="text-5xl font-bold text-foreground">4.8</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < 5 ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">124 {t.productPage.tabs.reviewsCount}</span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <RatingBar label={`5 ${t.productPage.tabs.stars}`} value={82} />
                <RatingBar label={`4 ${t.productPage.tabs.stars}`} value={62} />
                <RatingBar label={`3 ${t.productPage.tabs.stars}`} value={30} />
                <RatingBar label={`2 ${t.productPage.tabs.stars}`} value={10} />
                <RatingBar label={`1 ${t.productPage.tabs.stars}`} value={4} />
              </div>
            </div>
            {/* Individual reviews */}
            <div className="flex flex-col gap-4">
              {reviews.map((r) => (
                <div key={r.name} className="rounded-xl border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                        {r.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.productPage.reviewsText[r.textKey]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors hover:bg-muted/50"
                >
                  <span className="text-sm font-medium text-foreground">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="border-t border-border px-4 py-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border px-5 py-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">{t.productPage.tabs.disclaimerTitle}</strong> {t.productPage.tabs.disclaimerBody}
        </p>
      </div>
    </div>
  )
}
