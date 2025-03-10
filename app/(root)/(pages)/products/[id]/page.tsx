"use client"

import TopBanner from "@/app/components/global/top-banner"
import { ProductDetails } from "./component/product-detail"
import { Toaster } from "@/components/ui/toaster"
import { SubHeader } from "@/app/components/global/sub-header"
import { ProductSlider } from "@/app/components/global/product-slider"
import FooterBanner from "@/app/components/global/footer-banner"
import { products } from "@/lib/data"

const productData = {
  title: "Three piece non-bridal festive wear",
  images: [
    "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200",
    "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200",
    "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200",
    "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200",
  ],
  price: 4000,
  size: "Medium",
  description:
    "Pure Chiffon short shirt with sharara and gotta patti dupatta, fit for slim ladies, so no need for pinning.",
}

export default function ProductPage() {
  
  const handleAddToCart = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleRentNow = async (formData: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Form data:", formData)
  }

  return (
    <div className="min-h-screen bg-[#FAF4EF] ">
      <TopBanner back={true} />
      <SubHeader showSearch={true}/>
      <ProductDetails {...productData} onAddToCart={handleAddToCart} onRentNow={handleRentNow} />
      <ProductSlider products={products}/>
      <FooterBanner/>
      <Toaster />
    </div>
  )
}
