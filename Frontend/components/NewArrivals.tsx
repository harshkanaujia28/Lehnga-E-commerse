"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ProductCard } from "./product-card"

interface Product {
  id: string | number
  name: string
  price: number
  image: string
  [key: string]: any
}

interface NewArrivalsProps {
  products: Product[]
}

export function NewArrivals({ products }: NewArrivalsProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  // ✅ Auto slide every 2 seconds
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const interval = setInterval(() => {
      slider.scrollBy({
        left: 260, // move 1 card size
        behavior: "smooth",
      })

      // Loop back to start
      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - 5
      ) {
        setTimeout(() => {
          slider.scrollTo({ left: 0, behavior: "smooth" })
        }, 600)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="new-arrivals"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          New Arrivals
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our latest lehenga collection — designed with modern elegance
          and timeless craftsmanship.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No new arrivals available at the moment.
        </div>
      ) : (
        <>
          {/* ✅ Auto Sliding | No scrollbar */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth select-none
                      [scrollbar-width:none] [-ms-overflow-style:none]"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Hide scrollbar (Chrome/Safari) */}
            <style>
              {`
                div::-webkit-scrollbar { display: none; }
              `}
            </style>

            {products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="snap-start min-w-[70%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {products.length > 8 && (
            <div className="text-center mt-10">
              <Link
                href="/product"
                className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium rounded-full hover:bg-pink-500 transition shadow-sm"
              >
                View More
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  )
}
