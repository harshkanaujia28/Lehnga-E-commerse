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

interface OurCollectionProps {
  description: string      // Description of the collection
  products: Product[]      // Array of products
  viewMoreLink?: string    // Optional link for "View More"
}

export function OurCollection({
  description,
  products,
  viewMoreLink = "/collections",
}: OurCollectionProps) {
  return (
    <section
      id="our-collection"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Our Collection
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          {description}
        </p>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No products available in this collection.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(4, 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View More Button */}
          {products.length > 4 && (
            <div className="text-center mt-10">
              <Link
                href={viewMoreLink}
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
