"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { translations, type Locale } from "./translations"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof translations.ar
  dir: "rtl" | "ltr"
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar")

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null
    if (saved === "ar" || saved === "en") {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  const t = translations[locale]
  const dir = locale === "ar" ? "rtl" : "ltr"

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
      document.documentElement.dir = dir
    }
  }, [locale, dir])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      <div dir={dir} lang={locale} style={{ direction: dir }}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider")
  return ctx
}
