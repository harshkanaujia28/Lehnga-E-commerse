"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Your Perfect Wedding Moment",
    subtitle:
      "Celebrate your special day in timeless bridal elegance.",
    image: "/5e74bc82-c32a-430e-aafc-fe802e6e14ce.png",
    cta: "Explore Collection",
    tag: "THE BRIDAL EDIT",
  },
  {
    id: 2,
    title: "Elegance in Every Detail",
    subtitle:
      "Discover dreamy designs crafted for unforgettable celebrations.",
    image: "/7032f3ba-0401-45b2-9596-fad88fcd9c5c.png",
    cta: "Discover More",
    tag: "BLUSH COLLECTION",
  },
  {
    id: 3,
    title: "Make an Entrance",
    subtitle:
      "Rich colours, intricate embroidery, and extraordinary style.",
    image: "/3828ff2b-83ac-4f77-89fc-eebc871eedfa.png",
    cta: "Shop Collection",
    tag: "EVENING ELEGANCE",
  },
  {
    id: 4,
    title: "Gracefully Yours",
    subtitle:
      "Where timeless beauty meets contemporary bridal fashion.",
    image: "/99325f3d-2a92-4374-858b-7707c7013752.png",
    cta: "Explore Styles",
    tag: "TIMELESS CLASSICS",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Automatic Slider
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  // Next Slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  // Previous Slide
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    )
    setIsAutoPlay(false)
  }

  // Select Slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const slide = slides[currentSlide]

  return (
    <section
      className="relative w-full h-[600px] sm:h-[680px] md:h-[740px] lg:h-[780px] overflow-hidden bg-black"
      aria-label="Bridal collection highlights"
    >
      {/* Background Image */}
      <div
        key={slide.id}
        className="absolute inset-0 bg-cover bg-center animate-fade-in"
        style={{
          backgroundImage: `url('${slide.image}')`,
          backgroundPosition: "center center",
        }}
        role="img"
        aria-label={slide.title}
      />

      {/* Left Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

      {/* Bottom Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">

        <div
          key={`content-${slide.id}`}
          className="w-full max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 animate-fade-in-up"
          aria-live="polite"
        >
          <div className="max-w-[550px] text-left text-white">

            {/* Tag */}
            <p className="text-accent text-xs sm:text-sm uppercase tracking-[0.3em] mb-5 font-sans font-semibold">
              {slide.tag}
            </p>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-serif font-bold mb-6 leading-[1.12] text-white drop-shadow-lg">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-white/95 mb-9 font-sans leading-relaxed max-w-[480px] drop-shadow-md">
              {slide.subtitle}
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("all-lehengas")
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              className="bg-accent hover:bg-opacity-90 text-accent-foreground px-8 py-4 rounded-lg font-serif font-semibold inline-flex items-center gap-3 transition-all hover:scale-105 duration-300 shadow-lg"
            >
              {slide.cta}
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>
        </div>
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2.5 md:p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2.5 md:p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">

        {slides.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "bg-accent w-9 h-2.5"
                : "bg-white/60 hover:bg-white w-2.5 h-2.5"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === currentSlide ? "true" : undefined}
          />
        ))}

      </div>
    </section>
  )
}
