import type { Product, CartItem, Order } from "./types"
import { initialProducts } from "./initial-products"

// Product Management
export function getProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts

  const stored = localStorage.getItem("products")
  if (!stored) {
    localStorage.setItem("products", JSON.stringify(initialProducts))
    return initialProducts
  }
  return JSON.parse(stored)
}

export function getProductById(id: string): Product | undefined {
  const products = getProducts()
  return products.find((p) => p.id === id)
}

export function addProduct(product: Product): void {
  const products = getProducts()
  products.push(product)
  localStorage.setItem("products", JSON.stringify(products))
  window.dispatchEvent(new Event("productsUpdated"))
}

export function updateProduct(id: string, updatedProduct: Product): void {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index !== -1) {
    products[index] = updatedProduct
    localStorage.setItem("products", JSON.stringify(products))
    window.dispatchEvent(new Event("productsUpdated"))
  }
}

export function deleteProduct(id: string): void {
  const products = getProducts()
  const filtered = products.filter((p) => p.id !== id)
  localStorage.setItem("products", JSON.stringify(filtered))
  window.dispatchEvent(new Event("productsUpdated"))
}

// Cart Management
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("cart")
  return stored ? JSON.parse(stored) : []
}

export function addToCart(product: Product, quantity = 1): void {
  const cart = getCart()
  const existingItem = cart.find((item) => item.product.id === product.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ product, quantity })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  window.dispatchEvent(new Event("cartUpdated"))
}

export function updateCartItemQuantity(productId: string, quantity: number): void {
  const cart = getCart()
  const item = cart.find((item) => item.product.id === productId)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = quantity
      localStorage.setItem("cart", JSON.stringify(cart))
      window.dispatchEvent(new Event("cartUpdated"))
    }
  }
}

export function removeFromCart(productId: string): void {
  const cart = getCart()
  const filtered = cart.filter((item) => item.product.id !== productId)
  localStorage.setItem("cart", JSON.stringify(filtered))
  window.dispatchEvent(new Event("cartUpdated"))
}

export function clearCart(): void {
  localStorage.setItem("cart", JSON.stringify([]))
  window.dispatchEvent(new Event("cartUpdated"))
}

export function getCartTotal(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
}

// Order Management
export function getOrders(): Order[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("orders")
  return stored ? JSON.parse(stored) : []
}

export function createOrder(customerName: string, phone: string, email: string, address: string): Order {
  const cart = getCart()
  const order: Order = {
    id: `ORD-${Date.now()}`,
    customerName,
    phone,
    email,
    address,
    items: cart,
    total: getCartTotal(),
    date: new Date().toISOString(),
  }

  const orders = getOrders()
  orders.push(order)
  localStorage.setItem("orders", JSON.stringify(orders))

  clearCart()
  window.dispatchEvent(new Event("ordersUpdated"))

  return order
}

// Admin Authentication
export function checkAdminAuth(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("adminAuth") === "true"
}

export function adminLogin(username: string, password: string): boolean {
  // Default credentials: admin / admin123
  if (username === "admin" && password === "admin123") {
    localStorage.setItem("adminAuth", "true")
    return true
  }
  return false
}

export function adminLogout(): void {
  localStorage.removeItem("adminAuth")
}
