"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter, Linkedin, Send } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function Footer() {
  const [email, setEmail] = useState("")
  const { t } = useLanguage()

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter & Social */}
      <div className="border-b border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <h3 className="mb-1 text-sm font-semibold">{t.footer.newsletterTitle}</h3>
            <p className="text-xs text-primary-foreground/70">{t.footer.newsletterSubtitle}</p>
          </div>
          <div className="flex w-full max-w-md items-center gap-2">
            <div className="flex flex-1 items-center rounded-md bg-primary-foreground/10 px-3">
              <Mail className="h-4 w-4 text-primary-foreground/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.emailPlaceholder}
                className="w-full bg-transparent px-2 py-2.5 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/40"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90">
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">{t.footer.subscribe}</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-primary-foreground/70">{t.footer.followUs}</span>
            <div className="flex items-center gap-2">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-primary-foreground/20"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <span className="text-lg font-bold">
                xo<span className="text-accent">perfumes</span>
              </span>
            </div>
            <p className="mb-3 text-xs text-primary-foreground/70 leading-relaxed">
              {t.footer.aboutDesc}
            </p>
            <div className="flex flex-col gap-2 text-xs text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <span>sales@test.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                <span>+970599123456</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>{t.footer.location}</span>
              </div>
            </div>
          </div>

          {/* xoperfumes links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">xoperfumes</h4>
            <ul className="flex flex-col gap-2 text-xs text-primary-foreground/70">
              <li>
                <Link href="/about" className="transition-colors hover:text-primary-foreground">
                  {t.footer.links.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-primary-foreground">
                  {t.footer.links.contactUs}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-primary-foreground">
                  {t.footer.links.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/cash-back" className="transition-colors hover:text-primary-foreground">
                  {t.footer.links.cashBackPolicy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-primary-foreground">
                  {t.footer.links.termsConditions}
                </Link>
              </li>
              <li>
                <Link href="/international-delivery" className="transition-colors hover:text-primary-foreground">
                  {t.footer.links.internationalDeliveries}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-primary-foreground">
                  {t.footer.links.blog}
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="transition-colors hover:text-primary-foreground">
                  {t.footer.links.sitemap}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">{t.footer.support.title}</h4>
            <ul className="flex flex-col gap-2 text-xs text-primary-foreground/70">
              <li>
                <Link href="/delivery" className="transition-colors hover:text-primary-foreground">
                  {t.footer.support.deliveryInfo}
                </Link>
              </li>
              <li>
                <Link href="/refund" className="transition-colors hover:text-primary-foreground">
                  {t.footer.support.refundPolicy}
                </Link>
              </li>
              <li>
                <Link href="/store-locator" className="transition-colors hover:text-primary-foreground">
                  {t.footer.support.storeLocator}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-primary-foreground">
                  {t.footer.support.faq}
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-primary-foreground">
                  {t.footer.support.remoteAreas}
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-primary-foreground">
                  {t.footer.support.clickCollect}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t.footer.help.title}</h4>
            <ul className="flex flex-col gap-2 text-xs text-primary-foreground/70">
              <li>
                <Link href="/seller-registration" className="transition-colors hover:text-primary-foreground">
                  {t.footer.help.sellerReg}
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="transition-colors hover:text-primary-foreground">
                  {t.footer.help.affiliate}
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & App */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t.footer.account.title}</h4>
            <ul className="mb-5 flex flex-col gap-2 text-xs text-primary-foreground/70">
              <li>
                <Link href="/account" className="transition-colors hover:text-primary-foreground">
                  {t.footer.account.wishlist}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="transition-colors hover:text-primary-foreground">
                  {t.footer.account.myBag}
                </Link>
              </li>
              <li>
                <Link href="/account" className="transition-colors hover:text-primary-foreground">
                  {t.footer.account.myOrder}
                </Link>
              </li>
            </ul>
            <h4 className="mb-2 text-sm font-semibold">{t.footer.account.downloadApp}</h4>
            <p className="text-[11px] text-primary-foreground/70 leading-relaxed">
              {t.footer.account.downloadDesc}
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                href="#"
                className="rounded-md bg-primary-foreground/10 px-3 py-2 text-[10px] font-medium transition-colors hover:bg-primary-foreground/20"
              >
                {t.footer.account.appStore}
              </Link>
              <Link
                href="#"
                className="rounded-md bg-primary-foreground/10 px-3 py-2 text-[10px] font-medium transition-colors hover:bg-primary-foreground/20"
              >
                {t.footer.account.googlePlay}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <p className="text-[11px] text-primary-foreground/50">
            {t.footer.poweredBy}
          </p>
          <p className="text-[11px] text-primary-foreground/50">
            {t.footer.allRights}
          </p>
        </div>
      </div>
    </footer>
  )
}
