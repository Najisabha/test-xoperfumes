"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  const slides = [
    {
      id: 1,
      image: "/images/hero-1.jpg",
      title: t.hero.slide1Title,
      subtitle: t.hero.slide1Subtitle,
      cta: t.hero.slide1Cta,
    },
    {
      id: 2,
      image: "/images/hero-2.jpg",
      title: t.hero.slide2Title,
      subtitle: t.hero.slide2Subtitle,
      cta: t.hero.slide2Cta,
    },
    {
      id: 3,
      image: "/images/hero-3.jpg",
      title: t.hero.slide3Title,
      subtitle: t.hero.slide3Subtitle,
      cta: t.hero.slide3Cta,
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative h-[30vh] min-h-[240px] overflow-hidden sm:h-[40vh] md:h-[50vh] lg:h-[60vh]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-4 text-center">
              <h2 className="mb-2 font-serif text-2xl font-bold text-primary-foreground drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl text-balance">
                {slide.title}
              </h2>
              <p className="mb-4 text-sm text-primary-foreground/90 drop-shadow-md sm:text-base md:text-lg">
                {slide.subtitle}
              </p>
              <button className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:px-8 sm:py-3">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-card/60 p-2 text-card-foreground backdrop-blur-sm transition-colors hover:bg-card/80"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-card/60 p-2 text-card-foreground backdrop-blur-sm transition-colors hover:bg-card/80"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-6 bg-accent"
                : "w-2 bg-primary-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
