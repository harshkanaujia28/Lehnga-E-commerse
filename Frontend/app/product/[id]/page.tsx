"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getProductById, addToCart } from "@/lib/storage"
import { formatPrice } from "@/lib/format"
import { useEffect, useState } from "react"
import type { Product } from "@/lib/types"
import Image from "next/image"
import { ShoppingCart, ArrowLeft, Tag, Palette, Star } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { TrendingNow } from "@/components/trendingnow"

interface Review {
  id: number
  name: string
  rating: number
  comment: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const availableSizes = ["XS", "S", "M", "L", "XL"]

  useEffect(() => {
    const id = params.id as string
    const foundProduct = getProductById(id)
    if (foundProduct) {
      setProduct(foundProduct)
    }

    // Mock reviews
    setReviews([
      { id: 1, name: "Priya S.", rating: 5, comment: "Absolutely gorgeous lehenga! Fit was perfect." },
      { id: 2, name: "Ananya K.", rating: 4, comment: "Beautiful embroidery and color. Loved it!" },
      { id: 3, name: "Rohit M.", rating: 5, comment: "Bought this for my sister’s wedding. Stunning quality!" },
    ])
  }, [params.id])

  const handleAddToCart = () => {
    if (!product || !selectedSize) return
    setIsAdding(true)
    addToCart({ ...product, selectedSize }, quantity)
    setTimeout(() => {
      setIsAdding(false)
      router.push("/cart")
    }, 1000)
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold mb-4">Product Not Found</h1>
            <Link href="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {product.category && (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Tag className="w-4 h-4" />
                {product.category}
              </span>
            )}

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {product.title}
            </h1>

            {product.color && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Palette className="w-4 h-4" />
                <span>Color: {product.color}</span>
              </div>
            )}

            <p className="text-3xl font-bold text-primary mb-6">{formatPrice(product.price)}</p>

            <div className="prose prose-sm max-w-none mb-6">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selector (buttons) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">Select Size</label>
              <div className="flex gap-2 flex-wrap">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-white text-foreground border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding || !selectedSize}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium text-lg rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <ShoppingCart className="w-5 h-5" />
              {isAdding ? "Adding to Cart..." : "Add to Cart"}
            </button>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-serif text-lg font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Handcrafted with premium materials</li>
                <li>• Includes blouse and dupatta</li>
                <li>• Custom sizing available</li>
                <li>• Dry clean only</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 border border-border rounded-lg bg-white shadow-sm">
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-foreground mr-2">{review.name}</span>
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <TrendingNow products={products} viewMoreLink="/product" />
      <Footer />
    </>
  )
}
