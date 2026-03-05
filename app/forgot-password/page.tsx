"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/login"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.forgotPassword.backToLogin}
          </Link>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <Mail className="h-7 w-7 text-accent" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                {t.forgotPassword.title}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {t.forgotPassword.subtitle}
              </p>
            </div>

            {sent ? (
              <div className="rounded-xl bg-green-500/10 p-4 text-center">
                <p className="font-medium text-green-700 dark:text-green-400">
                  {t.forgotPassword.success}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {email}
                </p>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="/login">{t.forgotPassword.backToLogin}</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">{t.forgotPassword.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="mt-1.5 h-11"
                    required
                  />
                </div>
                <Button type="submit" className="h-12 w-full" size="lg">
                  {t.forgotPassword.sendReset}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
