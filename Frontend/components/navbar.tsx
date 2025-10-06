"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X, User,Sparkles,Crown,Star } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")

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
    console.log("Searching for:", searchQuery)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
       <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white text-center py-2 text-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center space-x-6">
            <span className="flex items-center">
              <Sparkles className="h-4 w-4 mr-1" />
              Free Shipping on Orders Above ₹2000
            </span>
            <span className="hidden md:flex items-center">
              <Crown className="h-4 w-4 mr-1" />
              Use Code: FREESHIP
            </span>
            <span className="flex items-center">
              <Star className="h-4 w-4 mr-1" />
              24/7 Customer Support
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-md" />
            <span className="font-serif text-lg font-semibold text-gray-800 tracking-tight">
              Lehenga Emporium
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 text-sm font-medium hover:text-pink-600 transition"
            >
              Home
            </Link>

            <Link
              href="/product"
              className="px-4 py-1.5  text-gray-700 text-sm font-medium rounded-full  transition"
            >
              All Lehengas
            </Link>
            {/* <Link
              href="/kurti"
              className="px-4 py-1.5  text-gray-700 text-sm font-medium rounded-full  transition"
            >
              Suits
            </Link> */}

            {/* Search Box */}
            <form
              onSubmit={handleSearch}
              className="relative w-64"
            >
              <input
                type="text"
                placeholder="Search lehengas, designer, party wear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-1.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
              />
            </form>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-pink-600 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <User className="w-4 h-4 text-gray-700" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md overflow-hidden z-50">
                  <Link
                    href="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                  >
                    Admin Panel
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                  >
                    Profile
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 flex flex-col gap-4">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </form>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-pink-600 transition"
            >
              Home
            </Link>

            <Link
              href="/all-lehengas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-full text-center hover:bg-pink-500 transition"
            >
              All Lehengas
            </Link>

            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition"
            >
              <ShoppingCart className="w-5 h-5" /> Cart
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-pink-600 transition"
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
