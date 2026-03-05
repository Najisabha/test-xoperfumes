"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"

const faqs = [
  { qKey: "q1" as const, aKey: "a1" as const },
  { qKey: "q2" as const, aKey: "a2" as const },
  { qKey: "q3" as const, aKey: "a3" as const },
  { qKey: "q4" as const, aKey: "a4" as const },
]

export default function FAQPage() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-3xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            {t.productPage.breadcrumbHome}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{t.footer.support.faq}</span>
        </nav>

        <h1 className="mb-8 font-serif text-3xl font-bold text-foreground">
          {t.footer.support.faq}
        </h1>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={faq.qKey}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/50"
              >
                <span className="font-medium text-foreground">
                  {t.productPage.faqs[faq.qKey]}
                </span>
                {openIndex === i ? (
                  <ChevronDown className="h-4 w-4 rotate-180 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="border-t border-border px-5 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t.productPage.faqs[faq.aKey]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
