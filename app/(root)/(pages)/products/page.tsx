"use client"

import { useState } from "react"
import TopBanner from "@/app/components/global/top-banner"
import { ClothingCard } from "../../../components/global/clothing-card"
import FooterBanner from "@/app/components/global/footer-banner"
import { Filter } from "lucide-react"
import { SubHeader } from "@/app/components/global/sub-header"
import RentersPolicy from "@/app/components/global/renter-policy"
import { Button } from "@/components/ui/button"
import { FilterSheet } from "@/app/components/global/filter-sheet"
import { RenterPolicyBanner } from "@/app/components/global/renter-policy-banner"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const search = useSearchParams()
  const type = search.get('type')
  const [showPolicy, setShowPolicy] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const products = [
    { id: 1, imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200", title: "Festive Orange Suit", price: 5000, action: "Buy" },
    { id: 2, imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200", title: "Casual Summer Dress", price: 3200, action: "Rent" },
    { id: 3, imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200", title: "Elegant Embroidered Kurta", price: 4500, action: "Buy" },
    { id: 4, imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200", title: "Party Wear Gown", price: 12000, action: "Rent" },
    { id: 5, imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200", title: "Lightweight Floral Dress", price: 2800, action: "Buy" },
    { id: 6, imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200", title: "Formal Evening Gown", price: 18000, action: "Rent" },
    { id: 7, imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200", title: "Classic Saree", price: 8000, action: "Buy" },
    { id: 8, imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200", title: "Printed Lawn Suit", price: 3500, action: "Rent" },
    { id: 9, imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200", title: "Casual Kurti", price: 2200, action: "Buy" },
    { id: 10, imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200", title: "Heavily Embroidered Dress", price: 15000, action: "Rent" },
  ]

  return (
    <main className="h-screen bg-[#F6E7DB]">
      <TopBanner back={true} />
      <SubHeader showSearch={true} />

      {showPolicy && type === "rent" && (
        <div className="w-full bg-[#F6E7DB]">
          <RentersPolicy onClose={() => setShowPolicy(false)} />
        </div>
      )}

      <h1 className="text-[#542D18] text-center text-3xl md:text-4xl font-semibold mt-6">Products</h1>
      
      <div className="flex justify-between items-center px-4 md:px-16 mt-6">
        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-lg md:text-xl hover:bg-transparent hover:text-[#542D18]"
          onClick={() => setShowFilters(true)}
        >
          <span className="text-black">Filters</span>
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      <FilterSheet open={showFilters} onOpenChange={setShowFilters} />

      <hr className="mx-auto my-4 w-11/12" />

      <div className="bg-[#F6E7DB] px-4 md:px-16 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.filter((p) => p.action.toLowerCase() === type).map((product) => (
            <ClothingCard
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              price={product.price}
              action={product.action}
            />
          ))}
        </div>
      </div>

      <RenterPolicyBanner />
      <FooterBanner />
    </main>
  )
}
