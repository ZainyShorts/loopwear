"use client"

import * as React from "react"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { NotificationModal } from "@/app/components/Modal/NotificationModal"

// Add custom CSS for hiding scrollbars
const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "Please select a city"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  date: z.string().min(1, "Please select a date"),
})

interface ProductDetailsProps {
  title: string
  images: string[]
  price: number
  size: string
  description: string
  onAddToCart?: () => Promise<void>
  onRentNow?: (data: z.infer<typeof formSchema>) => Promise<void>
}

export function ProductDetails({
  title,
  images,
  price,
  size,
  description,
  onAddToCart,
  onRentNow,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [isZoomed, setIsZoomed] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleImageClick = () => {
    setIsZoomed(!isZoomed)
  }

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      await onAddToCart?.()
      setIsModalOpen(true)
    } catch (error) {
      console.error("Failed to add item to cart", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await onRentNow?.(data)
      setIsModalOpen(true)
    } catch (error) {
      console.error("Failed to submit rental request", error)
    }
  }

  function rentNow() {
    router.push("/checkout")
  }

  return (
    <>
      <style jsx global>
        {scrollbarHideStyle}
      </style>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        text="view cart"
        heading="Product Added to cart Successfully"
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-4 sm:mt-6 lg:mt-8 bg-white rounded-xl shadow-sm">
        <h1 className="text-xl sm:text-2xl font-medium text-center mb-4 sm:mb-8">{title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
          {/* Left Section - Image Gallery */}
          <div className="space-y-3 sm:space-y-4 lg:col-span-3">
            <div
              className={cn(
                "relative aspect-[3/4] w-full overflow-hidden rounded-lg cursor-zoom-in transition-all duration-300",
                isZoomed && "cursor-zoom-out",
              )}
              onClick={handleImageClick}
            >
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={title}
                fill
                className={cn("object-cover transition-transform duration-300", isZoomed && "scale-150")}
                priority
              />
            </div>

            <div className="flex gap-2 sm:gap-3 overflow-auto pb-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200",
                    selectedImage === index && "scale-95 ring-2 ring-[#6E391D]",
                  )}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${title} ${index + 1}`}
                    fill
                    className="object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>

            <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 lg:p-6 bg-[#FAF4EF] rounded-xl">
              <div className="flex gap-4 text-base sm:text-lg">
                <span className="font-medium min-w-[60px]">Rent:</span>
                <span>PKR {price?.toLocaleString()}</span>
              </div>
              <div className="flex gap-4 text-base sm:text-lg">
                <span className="font-medium min-w-[60px]">Size:</span>
                <span>{size}</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Dress Description:</h3>
                <p className="text-gray-600 italic text-sm sm:text-base">{description}</p>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-semibold">Contact Information</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 lg:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter First Name"
                    className={cn("w-full rounded-xl h-11 sm:h-10", errors.firstName && "border-red-500")}
                    {...register("firstName")}
                  />
                  {errors.firstName && <p className="text-xs sm:text-sm text-red-500">{errors.firstName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter Last Name"
                    className={cn("w-full rounded-xl h-11 sm:h-10", errors.lastName && "border-red-500")}
                    {...register("lastName")}
                  />
                  {errors.lastName && <p className="text-xs sm:text-sm text-red-500">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  className={cn("w-full rounded-xl h-11 sm:h-10", errors.email && "border-red-500")}
                  {...register("email")}
                />
                {errors.email && <p className="text-xs sm:text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">Select City</Label>
                  <Select onValueChange={(value) => register("city").onChange({ target: { value } })}>
                    <SelectTrigger id="city" className={cn("h-11 sm:h-10", errors.city && "border-red-500")}>
                      <SelectValue placeholder="Select Your City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="karachi">Karachi</SelectItem>
                      <SelectItem value="lahore">Lahore</SelectItem>
                      <SelectItem value="islamabad">Islamabad</SelectItem>
                      <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                      <SelectItem value="faisalabad">Faisalabad</SelectItem>
                      <SelectItem value="multan">Multan</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.city && <p className="text-xs sm:text-sm text-red-500">{errors.city.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter Contact Number"
                    className={cn("w-full rounded-xl h-11 sm:h-10", errors.phone && "border-red-500")}
                    {...register("phone")}
                  />
                  {errors.phone && <p className="text-xs sm:text-sm text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Enter Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your Home Address"
                  className={cn("w-full rounded-xl h-11 sm:h-10", errors.address && "border-red-500")}
                  {...register("address")}
                />
                {errors.address && <p className="text-xs sm:text-sm text-red-500">{errors.address.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    placeholder="DD/MM/YYYY"
                    className={cn("w-full rounded-xl h-11 sm:h-10", errors.date && "border-red-500")}
                    {...register("date")}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                {errors.date && <p className="text-xs sm:text-sm text-red-500">{errors.date.message}</p>}
              </div>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full xs:flex-1 bg-[#6E391D] rounded-xl hover:bg-[#542D18] h-12 sm:h-auto text-sm sm:text-base"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add to cart"}
                </Button>
                <Button
                  onClick={rentNow}
                  type="submit"
                  className="w-full xs:flex-1 bg-[#6E391D] rounded-xl hover:bg-[#542D18] h-12 sm:h-auto text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Rent Now"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

