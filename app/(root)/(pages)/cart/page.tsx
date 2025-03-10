import { SubHeader } from '@/app/components/global/sub-header'
import TopBanner from '@/app/components/global/top-banner'
import React from 'react'
import CartTable from './component/cart-table'
import FooterBanner from '@/app/components/global/footer-banner'
import { ProductSlider } from '@/app/components/global/product-slider'
import { RenterPolicyBanner } from '@/app/components/global/renter-policy-banner'

const page = () => {
    const products = [
        {
          id: 1,
          imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200",
          title: "Festive Orange Suit",
          price: 5000,
          action: "Lend" as const,
        },
        {
          id: 2,
          imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200",
          title: "Casual Summer Dress",
          price: 3200,
          action: "Rent" as const,
        },
        {
          id: 3,
          imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200",
          title: "Elegant Embroidered Kurta",
          price: 4500,
          action: "Lend" as const,
        },
        {
          id: 4,
          imageUrl: "https://zuriador.com/cdn/shop/files/zuria-dor-dusty-beige-bridal-dress-2.jpg?v=1724221215&width=1200",
          title: "Party Wear Gown",
          price: 12000,
          action: "Rent" as const,
        }
    ]
  return (
    <div className='bg-[#FAF4EF] h-full'>
        <TopBanner back={true} />
        <SubHeader showSearch={true}/>
        <div className='flex justify-center items-center my-8'>
        <CartTable/>
        </div>
        <ProductSlider products={products} />
        <RenterPolicyBanner/>
        <FooterBanner/>
    </div>
  )
}

export default page