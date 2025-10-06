"use client"

import { useState } from "react"
import { initialProducts } from "@/lib/initial-products"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedColor, setSelectedColor] = useState<string>("All")
  const [sortOption, setSortOption] = useState<string>("None")
  const [minPrice, setMinPrice] = useState<number | "">("")
  const [maxPrice, setMaxPrice] = useState<number | "">("")
  const [showNew, setShowNew] = useState<boolean>(false)
  const [products] = useState<Product[]>(initialProducts)

  // Get unique categories and colors
  const categories = Array.from(new Set(products.map((p) => p.category))).sort()
  const colors = Array.from(new Set(products.map((p) => p.color))).sort()

  // Filtered products
  let filteredProducts = products.filter((p, idx) => {
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory
    const colorMatch = selectedColor === "All" || p.color === selectedColor
    const minMatch = minPrice === "" || p.price >= minPrice
    const maxMatch = maxPrice === "" || p.price <= maxPrice
    const newMatch = !showNew || idx >= products.length - 5 // last 5 as new arrivals
    return categoryMatch && colorMatch && minMatch && maxMatch && newMatch
  })

  // Sorting
  if (sortOption === "PriceLowHigh") filteredProducts.sort((a, b) => a.price - b.price)
  if (sortOption === "PriceHighLow") filteredProducts.sort((a, b) => b.price - a.price)

  return (
    <>
      <Navbar />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8">
            All Products
          </h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row flex-wrap items-center justify-between mb-8 gap-4">
            {/* Category */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="All">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="All">All</option>
                {colors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Min Price:</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="0"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-20"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Max Price:</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="100000"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-20"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Sort:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="None">None</option>
                <option value="PriceLowHigh">Price: Low → High</option>
                <option value="PriceHighLow">Price: High → Low</option>
              </select>
            </div>

            {/* New Arrivals */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">New Arrivals:</label>
              <input
                type="checkbox"
                checked={showNew}
                onChange={(e) => setShowNew(e.target.checked)}
                className="h-5 w-5 text-pink-500 focus:ring-2 focus:ring-pink-500 border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
