import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { MiniModal } from "./mini-modal"
import { useState } from "react"
import Link from "next/link"

interface ClothingCardProps {
  imageUrl: string
  title: string
  price: number
  action: "Buy" | "Rent" // Only one tag at a time
  alt?: string
}

export function ClothingCard({ imageUrl, title, price, action, alt }: ClothingCardProps) {
  const [showModal, setShowModal] = useState(true)
  return (
    <>
    {/* <MiniModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="Dress added to the Product list"
        actionLabel="View List"
        onAction={() => {
          // Handle view list action
          console.log("Viewing list")
        }}
      /> */}

    <Card className="overflow-hidde  w-96 shadow-sm rounded-2xl">
        <Link href={'/products/123'}>

      <div className="relative">
        {/* Single badge that can be either "Lend" or "Rent" */}
        <Badge className="absolute right-3 top-3 z-10 bg-white text-black hover:bg-white/90">
          {action}
        </Badge>

        <div className="relative rounded-t-2xl h-[500px] w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={alt || title}
            fill
            className="object-cover"
            priority
            />
        </div>
      </div>

      <CardContent className="p-4 text-center">
        <h3 className="text-base font-medium">{title}</h3>
      </CardContent>

      <CardFooter className="flex justify-center pb-4 pt-0">
        <div className=" bg-zinc-800 rounded-xl px-4 py-2 text-white">
          PKR {price}
        </div>
      </CardFooter>
      </Link>

    </Card>
  </>
  )
}
