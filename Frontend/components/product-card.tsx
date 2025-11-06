"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Eye, Star } from "lucide-react"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/format"
import { addToCart } from "@/lib/storage"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    addToCart(product, 1)
    setTimeout(() => setIsAdding(false), 1000)
  }

  // Dummy review data for demo
  const averageRating = product.rating?.average || 4.2
  const reviewCount = product.rating?.count || 12

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.category && (
          <span className="absolute top-3 left-3 bg-white/70 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between h-32">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif text-sm font-semibold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-gray-500 text-sm ml-2">({reviewCount})</span>
        </div>

        <p className="text-xl font-bold text-red-600 mb-4">{formatPrice(product.price)}</p>

        {/* <div className="flex gap-2 flex-wrap">
          Add to Cart button
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-500 transition-colors disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">{isAdding ? "Added!" : "Add"}</span>
          </button>
        </div> */}
      </div>
    </div>
  )
}
