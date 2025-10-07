"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu, X, User, Sparkles, Crown, Star } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(count)
    }
    updateCartCount()
    window.addEventListener("storage", updateCartCount)
    window.addEventListener("cartUpdated", updateCartCount)
    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", updateCartCount)
    }
  }, [])

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/product?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      {/* 🔸Top Offer Bar */}
      <div className="bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 text-white text-center py-2 text-xs sm:text-sm font-medium">
        <div className="flex items-center justify-center space-x-4">
          <span className="flex items-center"><Sparkles className="w-4 h-4 mr-1" /> Free Shipping Above ₹2000</span>
          <span className="hidden sm:flex items-center"><Crown className="w-4 h-4 mr-1" /> Use Code: FREESHIP</span>
          <span className="flex items-center"><Star className="w-4 h-4 mr-1" /> 24/7 Customer Support</span>
        </div>
      </div>

      {/* 🔹Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Lehenga Emporium" width={36} height={36} className="rounded-md object-cover" />
          <span className="font-serif text-lg font-semibold text-gray-800">Lehenga Emporium</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-700 text-sm font-medium hover:text-pink-600 transition">Home</Link>
          <Link href="/product" className="text-gray-700 text-sm font-medium hover:text-pink-600 transition">All Lehengas</Link>
          <Link
            href="/product?category=Suits"
            className="text-gray-700 text-sm font-medium hover:text-pink-600 transition"
          >
            Women Suits
          </Link>


          <form onSubmit={handleSearch} className="relative w-64">
            <input
              type="text"
              placeholder="Search lehengas, designer, party wear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-1.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </form>

          <Link href="/cart" className="relative text-gray-700 hover:text-pink-600 transition">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              <User className="w-4 h-4 text-gray-700" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50">Profile</Link>
                <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50">Admin Panel</Link>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-3 px-4 flex flex-col gap-3 shadow-md">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </form>
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-pink-600 transition">Home</Link>
          <Link href="/product" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-pink-600 transition">All Lehengas</Link>
           <Link href="/product?category=Suits"className="text-gray-700 text-sm font-medium hover:text-pink-600 transition">Women Suits </Link>
          <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition">
            <ShoppingCart className="w-5 h-5" /> Cart ({cartCount})
          </Link>
        </div>
      )}
    </nav>
  )
}
