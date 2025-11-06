"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { initialProducts } from "@/lib/initial-products"
import { NewArrivals } from "@/components/NewArrivals"
import { OurCollection } from "@/components/ourcollection"
import WhyUs from "@/components/whyus"
import { TrendingNow } from "@/components/trendingnow"
import { TestimonialsSection } from "@/components/testimonials-section"
import HeroSlider from "@/components/hero-slider"
import { ShopByPricing } from "@/components/ShopByPricing"
import type { Product } from "@/lib/types"
import { Truck, RefreshCcw, CreditCard, Clock } from "lucide-react"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  const categories = [
    { name: "All", image: "/Bridal/0bd77faf-fb9f-4966-9c81-2041ba25a1a9.jpeg" },
    { name: "Bridal", image: "/Bridal/367717c8-f430-48ac-ba23-ce0040c66e01.jpeg" },
    { name: "Wedding", image: "/wedding/62bf0ac7-b7ce-4fef-92da-c57e74c0543e.jpeg" },
    { name: "Engagement", image: "/engagement/51ee17f3-fe13-4703-82d5-2409fde58802.jpeg" },
    { name: "Reception", image: "/reception/….jpeg" },
    { name: "Sangeet", image: "/sangeet/568ca7db-8ba7-485e-abe3-8ff8a2279772.jpeg" },
    { name: "Mehendi", image: "/sangeet/Made to Order_Measurement_Custom Order Lehenga….jpeg" },
    { name: "Kurtis", image: "/kurtis/24dfbed1-4cf2-4e67-b50f-1eda24d22ac4.jpeg" },
    { name: "Suits", image: "/kurtis/Slik Floral Embroidered V-Neck Straight Kurta with….jpeg" },
  ]

  useEffect(() => {
    setProducts(initialProducts)
  }, [])

  const shippingFeatures = [
    { icon: <Truck className="w-5 h-5" />, text: "Free Shipping" },
    { icon: <CreditCard className="w-5 h-5" />, text: "COD Available" },
    { icon: <RefreshCcw className="w-5 h-5" />, text: "Easy Returns" },
    { icon: <Clock className="w-5 h-5" />, text: "Express Delivery" },
  ]

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSlider />

        {/* Shop by Occasion */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-10 text-center">
              Shop by Occasion
            </h2>
            <div className="flex gap-5 overflow-x-auto px-2 -mx-2 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 scrollbar-none">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/product?category=${category.name}`}
                  className="flex-shrink-0 w-52 h-32 sm:w-auto sm:h-40 rounded-xl relative group overflow-hidden transition-all duration-500"
                >
                  {/* Category Image */}
                  <div className="absolute inset-0">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100 text-gray-700 font-semibold">
                        {category.name}
                      </div>
                    )}
                  </div>

                  {/* Gold Hover Border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-yellow-500 transition-all duration-500" />

                  {/* Title Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white text-lg sm:text-xl font-semibold tracking-wide">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Product & Collection Sections */}
        <NewArrivals products={products} />
        <OurCollection
          description="Explore our curated selection of lehengas for weddings, festivals, and special occasions."
          products={products}
          viewMoreLink="/product"
        />

        {/* Why Choose Us */}
        <WhyUs />

        {/* Shop by Pricing */}
        <ShopByPricing />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Trending Products */}
        <TrendingNow products={products} viewMoreLink="/product" />
      </main>
      <Footer />
    </>
  )
}
