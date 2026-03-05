"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const sections = [
  {
    titleKey: "service" as const,
    textKey: "serviceText" as const,
  },
  {
    titleKey: "orders" as const,
    textKey: "ordersText" as const,
  },
  {
    titleKey: "returns" as const,
    textKey: "returnsText" as const,
  },
  {
    titleKey: "liability" as const,
    textKey: "liabilityText" as const,
  },
] as const

export default function TermsPage() {
  const { t } = useLanguage()

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
          <span className="text-foreground">{t.terms.title}</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            {t.terms.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.terms.lastUpdated}: {t.terms.lastUpdatedDate}
          </p>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t.terms.intro}
          </p>

          <div className="mt-10 space-y-8">
            {sections.map(({ titleKey, textKey }) => (
              <section key={titleKey}>
                <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
                  {t.terms.sections[titleKey]}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {t.terms.sections[textKey]}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
