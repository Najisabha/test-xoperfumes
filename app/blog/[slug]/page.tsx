"use client"

import { useParams } from "next/navigation"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"

const posts: Record<string, { titleAr: string; titleEn: string; date: string; bodyAr: string; bodyEn: string }> = {
  "new-arrivals-2025": {
    titleAr: "أحدث العطور لعام 2025",
    titleEn: "New Arrivals 2025",
    date: "مارس 2025",
    bodyAr: "اكتشف تشكيلة العطور الجديدة لهذا العام من أشهر الماركات العالمية. نقدم لكم أفضل العروض والتوصيل السريع.",
    bodyEn: "Discover the new fragrance collection for this year from the world's top brands. We offer the best deals and fast delivery.",
  },
  "how-to-choose-perfume": {
    titleAr: "كيف تختار العطر المناسب",
    titleEn: "How to Choose Your Perfume",
    date: "فبراير 2025",
    bodyAr: "اختيار العطر يعتمد على نوع البشرة، الفصل، والمناسبة. نصائح من خبرائنا لمساعدتك في إيجاد عطرك المثالي.",
    bodyEn: "Choosing a fragrance depends on skin type, season, and occasion. Tips from our experts to help you find your perfect scent.",
  },
  "oud-guide": {
    titleAr: "دليل العود للمبتدئين",
    titleEn: "Oud Guide for Beginners",
    date: "يناير 2025",
    bodyAr: "العود من أغلى المكونات في صناعة العطور. تعرّف على أنواعه وكيفية اختيار عطر عود يناسبك.",
    bodyEn: "Oud is one of the most precious ingredients in perfumery. Learn about its types and how to choose an oud fragrance that suits you.",
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const { t, locale } = useLanguage()

  const post = posts[slug]
  if (!post) notFound()

  const isAr = locale === "ar"
  const title = isAr ? post.titleAr : post.titleEn
  const body = isAr ? post.bodyAr : post.bodyEn

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-3xl px-4 py-12">
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">{t.productPage.breadcrumbHome}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/blog" className="transition-colors hover:text-foreground">{t.footer.links.blog}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{title}</span>
        </nav>

        <article>
          <h1 className="mb-4 font-serif text-3xl font-bold text-foreground">{title}</h1>
          <p className="mb-6 text-sm text-muted-foreground">{post.date}</p>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
            <p>{body}</p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
