"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getOrders } from "@/lib/storage"
import { formatPrice, formatDate } from "@/lib/format"
import { useEffect, useState } from "react"
import type { Order } from "@/lib/types"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Package, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      const orders = getOrders()
      const foundOrder = orders.find((o) => o.id === orderId)
      setOrder(foundOrder || null)
    }
    setLoading(false)
  }, [orderId])

  return (
    <>
      <Navbar />
      {loading ? (
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </main>
      ) : !order ? (
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold mb-4">Order Not Found</h1>
            <Link href="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Thank you for your order. We've received your order and will begin processing it shortly. You'll receive a
              confirmation email soon.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-primary" />
              <h2 className="font-serif text-2xl font-semibold">Order Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-semibold">{formatDate(order.date)}</p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="border-t border-border pt-6 mb-6">
              <h3 className="font-serif text-lg font-semibold mb-4">Delivery Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{order.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{order.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Address</p>
                    <p className="font-medium">{order.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-border pt-6">
              <h3 className="font-serif text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-20 h-24 flex-shrink-0 rounded overflow-hidden bg-muted">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{item.product.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">Quantity: {item.quantity}</p>
                      <p className="font-semibold text-primary">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t border-border pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="font-serif text-xl font-semibold">Total Amount</span>
                <span className="font-bold text-2xl text-primary">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      )}
      <Footer />
    </>
  )
}
