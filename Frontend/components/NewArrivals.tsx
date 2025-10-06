"use client"

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
  
  return (
    <section
      id="new-arrivals"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          New Arrivals
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Discover our latest lehenga collection — designed with modern elegance
          and timeless craftsmanship.
        </p>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No new arrivals available at the moment.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* 👇 Only show first 8 products */}
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View More Button */}
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
