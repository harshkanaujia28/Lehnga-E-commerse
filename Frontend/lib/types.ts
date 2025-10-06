export interface Product {
  id: string
  title: string
  price: number
  image: string
  description: string
  category?: string
  color?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  phone: string
  email: string
  address: string
  items: CartItem[]
  total: number
  date: string
}

export interface AdminCredentials {
  username: string
  password: string
}
