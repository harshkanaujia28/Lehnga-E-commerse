"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Eye } from "lucide-react"
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

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
      <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.category && (
          <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full">
            {product.category}
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-xl font-bold text-primary mb-4">{formatPrice(product.price)}</p>

        <div className="flex gap-2 flex-wrap">
          {/* View Details: hidden on small screens */}
          <Link
            href={`/product/${product.id}`}
            className="hidden sm:flex flex-1 items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">View Details</span>
          </Link>

          {/* Add to Cart: always visible */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">{isAdding ? "Added!" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
