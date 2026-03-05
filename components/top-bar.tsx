"use client"

import { useState } from "react"
import { Globe, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import type { Locale } from "@/lib/i18n/translations"

const countries = [
  { code: "PS", nameAr: "فلسطين", nameEn: "Palestine", currency: "ILS", currencyNameAr: "شيكل إسرائيلي", currencyNameEn: "Israeli Shekel" },
  { code: "JO", nameAr: "الأردن", nameEn: "Jordan", currency: "JOD", currencyNameAr: "دينار أردني", currencyNameEn: "Jordanian Dinar" },
]

const languages: { code: Locale; name: string }[] = [
  { code: "ar", name: "العربية" },
  { code: "en", name: "English" },
]

export function TopBar() {
  const { locale, setLocale, t } = useLanguage()
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [showCountryMenu, setShowCountryMenu] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const { theme, setTheme } = useTheme()

  const countryName = locale === "ar" ? selectedCountry.nameAr : selectedCountry.nameEn
  const currencyName = locale === "ar" ? selectedCountry.currencyNameAr : selectedCountry.currencyNameEn

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu)
                setShowCountryMenu(false)
              }}
              className="flex items-center gap-1 transition-opacity hover:opacity-80"
              aria-label="Select language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{languages.find((l) => l.code === locale)?.name}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showLangMenu && (
              <div className="absolute left-0 top-full z-50 mt-1 min-w-[120px] rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code)
                      setShowLangMenu(false)
                    }}
                    className={`block w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-muted ${
                      locale === lang.code ? "font-semibold text-accent" : ""
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Country / Currency Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCountryMenu(!showCountryMenu)
                setShowLangMenu(false)
              }}
              className="flex items-center gap-1 transition-opacity hover:opacity-80"
              aria-label="Select country and currency"
            >
              <span>{countryName}</span>
              <span className="opacity-70">|</span>
              <span>{selectedCountry.currency}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showCountryMenu && (
              <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country)
                      setShowCountryMenu(false)
                    }}
                    className="block w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-muted"
                  >
                    <span className="font-medium">
                      {locale === "ar" ? country.nameAr : country.nameEn}
                    </span>
                    <span className="ml-2 opacity-70">
                      ({locale === "ar" ? country.currencyNameAr : country.currencyNameEn})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
          aria-label="Toggle dark mode"
        >
          <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="hidden sm:inline">
            {theme === "dark" ? t.topbar.lightMode : t.topbar.darkMode}
          </span>
        </button>
      </div>
    </div>
  )
}
