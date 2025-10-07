"use client"

import { Navbar } from "@/components/navbar"
import Slider from "react-slick"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { initialProducts } from "@/lib/initial-products" // ✅ Import initialProducts directly
import { useEffect, useState } from "react"
import type { Product } from "@/lib/types"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { NewArrivals } from "@/components/NewArrivals"
import { OurCollection } from "@/components/ourcollection"
import WhyUs from "@/components/whyus"
import { TrendingNow } from "@/components/trendingnow"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  const heroImages = [
    "/Lehnga_ size 1.jpg",
    "/kjhdfj.jpg",
    "/dfhvzskdj.jpg",
    "/hero-lehenga.jpg",
    "/jhdujszj.jpg",
  ]

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
    // ✅ Directly set initialProducts
    setProducts(initialProducts)
  }, [])

  const sliderSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full overflow-hidden">
          <Slider {...sliderSettings} className="absolute inset-0 z-0">
            {heroImages.map((src, i) => (
              <div key={i} className="relative w-full h-[90vh]">
                <Image
                  src={src}
                  alt={`Lehenga ${i + 1}`}
                  fill
                  priority={i === 0}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </Slider>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4 z-10" />
        </section>

        {/* Shop by Occasion */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Shop by Occasion
            </h2>
            <div className="flex gap-6 overflow-x-auto py-2 px-2 -mx-2 sm:justify-center sm:flex-wrap sm:overflow-visible scrollbar-none">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/product?category=${category.name}`}
                  className="flex-shrink-0 w-32 sm:w-28 flex flex-col items-center group relative transition-transform duration-300 hover:scale-105"
                >
                  <div className="w-28 h-28 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-gray-200 shadow-md bg-gray-50 relative">
                    {category.image ? (
                      <Image src={category.image} alt={category.name} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-700 font-semibold">All</div>
                    )}
                  </div>
                  <span className="mt-3 text-lg font-medium text-gray-800 text-center group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <NewArrivals products={products} />
        <OurCollection
          description="Explore our curated selection of lehengas for weddings, festivals, and special occasions."
          products={products}
          viewMoreLink="/product"
        />
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
              Women Suits Collection
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              Elegant and stylish suits designed for every occasion — from festive wear to casual elegance.
            </p>

            {products.filter((p) => p.category === "Suits").length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                  .filter((p) => p.category === "Suits")
                  .slice(0, 8)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No suits available.</p>
            )}

            <div className="flex justify-center mt-10">
              <Link
                href="/product?category=Suits"
                className="px-6 py-2 rounded-full bg-red-600 text-white font-medium hover:bg-pink-700 transition"
              >
                View All Suits
              </Link>
            </div>
          </div>
        </section>
        <WhyUs />
        <TrendingNow products={products} viewMoreLink="/product" />
      </main>
      <Footer />
    </>
  )
}
