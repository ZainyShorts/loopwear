"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ClothingCard } from "./clothing-card"

interface Product {
  id: number
  imageUrl: string
  title: string
  price: number
  action: "Rent" | "Buy"
}

interface ProductSliderProps {
  products: Product[]
}

export function ProductSlider({ products }: ProductSliderProps) {
  return (
    <div className="py-12 px-4 bg-[#FAF4EF]">
      <h2 className="text-4xl font-serif text-center mb-8">You May Also Like</h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-7xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <ClothingCard
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
                action={product.action}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 border-[#6E391D] text-[#6E391D] hover:bg-[#6E391D] hover:text-white" />
        <CarouselNext className="hidden md:flex -right-12 border-[#6E391D] text-[#6E391D] hover:bg-[#6E391D] hover:text-white" />
      </Carousel>
    </div>
  )
}

