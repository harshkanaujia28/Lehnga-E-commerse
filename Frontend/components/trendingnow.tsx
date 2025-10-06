"use client"

import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

interface TrendingNowProps {
  products: Product[]
  viewMoreLink?: string
}

export function TrendingNow({ products, viewMoreLink }: TrendingNowProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trending Now
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our most loved lehengas — perfect for weddings, festive occasions, and celebrations.
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No trending products available.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(13, 21).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View More Button */}
            {viewMoreLink && products.length > 8 && (
              <div className="text-center mt-10">
                <Link
                  href={viewMoreLink}
                  className="inline-block px-6 py-2.5 bg-pink-600 text-white font-medium rounded-full hover:bg-pink-500 transition shadow-sm"
                >
                  View More
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
