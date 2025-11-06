"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Your Perfect Wedding Moment",
    subtitle: "Exquisite bridal collection curated for the modern Indian bride",
    image: "/hero-banner-2.jpg",
    cta: "Explore Collection",
  },
  {
    id: 2,
    title: "Timeless Elegance",
    subtitle: "Handcrafted lehengas with intricate embroidery and premium fabrics",
    image: "/kjhdfj.jpg",
    cta: "Shop Lehengas",
  },
  {
    id: 3,
    title: "Make Your Grand Entrance",
    subtitle: "Premium bridal wear for every wedding celebration",
    image: "/Lehnga_ size 1.jpg",
    cta: "View All",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  const slide = slides[currentSlide]

  return (
    <div className="relative w-full h-screen md:h-[600px] overflow-hidden bg-black">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${slide.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1,
        }}
      >
        {/* Red to Maroon Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-secondary/60 to-primary/50"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="text-center text-white max-w-2xl animate-fade-in-up">
          <p className="text-accent text-xs md:text-sm uppercase tracking-widest mb-4 font-sans font-semibold">
            New Arrivals
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-text-pretty">{slide.title}</h1>
          <p className="text-base md:text-lg text-gray-100 mb-8 font-sans leading-relaxed">{slide.subtitle}</p>
          <button className="bg-accent hover:bg-opacity-90 text-accent-foreground px-8 py-3 rounded-lg font-serif font-semibold flex items-center gap-2 mx-auto transition-all hover:scale-105 duration-300">
            {slide.cta}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentSlide(idx)
              setIsAutoPlay(false)
            }}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide ? "bg-accent w-8 h-2" : "bg-white/50 hover:bg-white/70 w-2 h-2"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
