"use client"

import { Navbar } from "@/components/navbar"
import Slider from "react-slick"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getProducts } from "@/lib/storage"
import { useEffect, useState } from "react"
import type { Product } from "@/lib/types"
import { Sparkles } from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { NewArrivals } from "@/components/NewArrivals"
import { OurCollection } from "@/components/ourcollection"
import WhyUs from "@/components/whyus"
import { TrendingNow } from "@/components/trendingnow"


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setProducts(getProducts())

    const handleProductsUpdate = () => {
      setProducts(getProducts())
    }

    window.addEventListener("productsUpdated", handleProductsUpdate)
    return () => window.removeEventListener("productsUpdated", handleProductsUpdate)
  }, [])
  const heroImages = [
    "/Lehnga_ size 1.jpg",
    "/kjhdfj.jpg",
    "/dfhvzskdj.jpg",
    "/hero-lehenga.jpg",
    "/jhdujszj.jpg",
  ]
  const categories = [
    { name: "Bridal", image: "/Bridal/367717c8-f430-48ac-ba23-ce0040c66e01.jpeg", href: "/category/bridal" },
    { name: "Wedding", image: "/wedding/62bf0ac7-b7ce-4fef-92da-c57e74c0543e.jpeg", href: "/category/wedding" },
    { name: "Engagement", image: "/engagement/51ee17f3-fe13-4703-82d5-2409fde58802.jpeg", href: "/category/engagement" },
    { name: "Reception", image: "/reception/….jpeg", href: "/category/reception" },
    { name: "Sangeet", image: "/sangeet/568ca7db-8ba7-485e-abe3-8ff8a2279772.jpeg", href: "/category/sangeet" },
    { name: "Mehendi", image: "/sangeet/Made to Order_Measurement_Custom Order Lehenga….jpeg", href: "/category/mehendi" },
    { name: "Kurtis", image: "/kurtis/24dfbed1-4cf2-4e67-b50f-1eda24d22ac4.jpeg", href: "/category/kurtis" }, // extra
    { name: "Suits", image: "/kurtis/Slik Floral Embroidered V-Neck Straight Kurta with….jpeg", href: "/category/suits" },     // extra
  ];
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
                  className="object-cover w-full h-full "
                />
              </div>
            ))}
          </Slider>

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4 z-10">
            {/* <div className="max-w-3xl text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Exquisite Indian{" "}
              <span className="text-red-400 block">Wedding Lehengas</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
              Discover our curated collection of traditional and contemporary lehengas from India's finest designers.
              Perfect for weddings, engagements, and special celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8" asChild>
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Collection
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white/10" asChild>
                <Link href="/vendors">
                  <Users className="mr-2 h-5 w-5" />
                  Explore Designers
                </Link>
              </Button>
            </div>
          </div> */}
          </div>
        </section>
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Shop by Occasion
            </h2>

            <div className="flex flex-wrap justify-center gap-12">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="flex flex-col items-center group"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={112} // w-28 = 112px
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-lg font-medium text-gray-800 text-center">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <NewArrivals products={products} />
        <OurCollection
          description="Explore our curated selection of lehengas for weddings, festivals, and special occasions."
          products={products}
          viewMoreLink="/product"
        />
        <WhyUs />
        <TrendingNow products={products} viewMoreLink="/product" />
      </main>
      <Footer />
    </>
  )
}
