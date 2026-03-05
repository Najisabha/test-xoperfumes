"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { Award, Shield, Heart } from "lucide-react"


export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Award,
      titleKey: "quality" as const,
      descKey: "qualityDesc" as const,
    },
    {
      icon: Shield,
      titleKey: "service" as const,
      descKey: "serviceDesc" as const,
    },
    {
      icon: Heart,
      titleKey: "trust" as const,
      descKey: "trustDesc" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main>
        <div className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              xoperfumes
            </span>
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              {t.about.title}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground md:text-2xl">
              {t.about.hero}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <section className="mb-16">
            <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
              {t.about.mission}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t.about.missionText}
            </p>
          </section>

          <section>
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              {t.about.values}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map(({ icon: Icon, titleKey, descKey }) => (
                <div
                  key={titleKey}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent/30 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {t.about[titleKey]}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.about[descKey]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
