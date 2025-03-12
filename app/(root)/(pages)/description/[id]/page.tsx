"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import TopBanner from "@/app/components/global/top-banner"
import { ProductDetails } from "./component/product-detail"
import { Toaster } from "@/components/ui/toaster"
import { SubHeader } from "@/app/components/global/sub-header"
import { ProductSlider } from "@/app/components/global/product-slider"
import FooterBanner from "@/app/components/global/footer-banner"
import { products } from "@/lib/data"

// Define the Product type
interface Product {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
  category: string
  images?: string[]
  size?: string
}

export default function ProductDescriptionPage() {
  const params = useParams()
  const id = params?.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProductById() {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOOP_SERVER}/product/${id}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`)
        }

        const data = await response.json()
        console.log('product data', data)
        setProduct(data || null)
      } catch (error) {
        console.error("Error fetching product:", error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProductById()
    }
  }, [id])

  const handleAddToCart = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleRentNow = async (formData: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Form data:", formData)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF4EF]">
        <TopBanner back={true} />
        <SubHeader showSearch={true} />
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="aspect-square bg-[#E5D6CA] animate-pulse rounded-lg"></div>
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-[#E5D6CA] animate-pulse rounded-md"></div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="h-8 w-3/4 bg-[#E5D6CA] animate-pulse rounded-md mb-4"></div>
              <div className="h-6 w-1/4 bg-[#E5D6CA] animate-pulse rounded-md mb-6"></div>
              <div className="h-4 w-full bg-[#E5D6CA] animate-pulse rounded-md mb-2"></div>
              <div className="h-4 w-full bg-[#E5D6CA] animate-pulse rounded-md mb-8"></div>
              <div className="h-10 w-full bg-[#E5D6CA] animate-pulse rounded-md mb-4"></div>
              <div className="h-10 w-full bg-[#E5D6CA] animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF4EF]">
        <TopBanner back={true} />
        <SubHeader showSearch={true} />
        <div className="max-w-7xl mx-auto p-8 text-center">
          <h2 className="text-2xl text-[#462920] mb-4">Product not found</h2>
          <p className="text-[#6B4D3E]">The product you're looking for doesn't exist or has been removed.</p>
        </div>
        <FooterBanner />
      </div>
    )
  }

  // Transform the product data to match the expected format for ProductDetails
  const productData = {
    title: product.name,
    images: product.images || [product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl],
    price: product.price,
    size: product.size || "Medium",
    description: product.description,
  }

  return (
    <div className="min-h-screen bg-[#FAF4EF]">
      <TopBanner back={true} />
      <SubHeader showSearch={true} />
      <ProductDetails {...productData} onAddToCart={handleAddToCart} onRentNow={handleRentNow} />
      <ProductSlider products={products} />
      <FooterBanner />
      <Toaster />
    </div>
  )
}
