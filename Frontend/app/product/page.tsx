import { Suspense } from "react"
import AllProductsPage from "@/components/AllProductsPage"

export default function ProductPage() {
  return (
    <Suspense fallback={<p>Loading products...</p>}>
      <AllProductsPage />
    </Suspense>
  )
}
