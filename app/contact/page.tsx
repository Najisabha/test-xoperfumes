"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            {t.contact.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{t.contact.subtitle}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              {t.contact.info}
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {t.contact.phone}
                  </p>
                  <a
                    href="tel:+970599123456"
                    className="font-medium text-foreground hover:text-accent"
                  >
                    +970 59 912 3456
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {t.contact.email}
                  </p>
                  <a
                    href="mailto:sales@xoperfumes.com"
                    className="font-medium text-foreground hover:text-accent"
                  >
                    sales@xoperfumes.com
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {t.contact.address}
                  </p>
                  <p className="font-medium text-foreground">
                    {t.footer.location}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {t.contact.hours}
                  </p>
                  <p className="font-medium text-foreground">
                    {t.contact.hoursValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              {t.contact.send}
            </h2>
            {submitted ? (
              <div className="rounded-xl bg-green-500/10 p-6 text-center">
                <p className="font-medium text-green-700 dark:text-green-400">
                  {t.contact.successTitle}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.contact.successDesc}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSubmitted(false)}
                >
                  {t.contact.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">{t.contact.name}</Label>
                  <Input
                    id="name"
                    className="mt-1.5"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t.contact.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-1.5"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">{t.contact.message}</Label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1.5 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-accent"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t.contact.send}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
