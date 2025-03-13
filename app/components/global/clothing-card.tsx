import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface ClothingCardProps {
  imageUrl: string
  title: string
  price: number
  action: "Buy" | "Rent" | "Lend"
  alt?: string
}

export function ClothingCard({ imageUrl, title, price, action, alt }: ClothingCardProps) {
  return (
    <Card className="overflow-hidden max-w-sm w-full shadow-sm rounded-2xl">
      <Link href={'/products/123'}>
        <div className="relative">
          {/* Single badge that can be either "Lend" or "Rent" */}
          <Badge className="absolute right-3 top-3 z-10 bg-white text-black hover:bg-white/90">
            {action}
          </Badge>

          <div className="relative rounded-t-2xl h-80 md:h-96 w-full overflow-hidden">
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
          <h3 className="text-sm md:text-base font-medium">{title}</h3>
        </CardContent>

        <CardFooter className="flex justify-center pb-4 pt-0">
          <div className="bg-zinc-800 rounded-xl px-4 py-2 text-white text-sm md:text-base">
            PKR {price}
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
