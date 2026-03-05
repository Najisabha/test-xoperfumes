"use client"

import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const posts = [
  { slug: "new-arrivals-2025", titleAr: "أحدث العطور لعام 2025", titleEn: "New Arrivals 2025", date: "مارس 2025" },
  { slug: "how-to-choose-perfume", titleAr: "كيف تختار العطر المناسب", titleEn: "How to Choose Your Perfume", date: "فبراير 2025" },
  { slug: "oud-guide", titleAr: "دليل العود للمبتدئين", titleEn: "Oud Guide for Beginners", date: "يناير 2025" },
]

export default function BlogPage() {
  const { t, locale } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">{t.productPage.breadcrumbHome}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{t.footer.links.blog}</span>
        </nav>

        <h1 className="mb-8 font-serif text-3xl font-bold text-foreground">
          {t.footer.links.blog}
        </h1>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-md"
            >
              <h2 className="mb-2 font-semibold text-foreground">
                {locale === "ar" ? post.titleAr : post.titleEn}
              </h2>
              <p className="text-sm text-muted-foreground">{post.date}</p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
