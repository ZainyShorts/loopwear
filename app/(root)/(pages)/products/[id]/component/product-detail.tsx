"use client"

import * as React from "react"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

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
  const { toast } = useToast()
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
      toast({
        title: "Success",
        description: "Item added to cart",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await onRentNow?.(data)
      toast({
        title: "Success",
        description: "Your rental request has been submitted",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit rental request",
        variant: "destructive",
      })
    }
  }

  function rentNow(){
    router.push('/checkout')
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-medium text-center mb-8">{title}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Section - Image Gallery */}
        <div className="space-y-4">
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

          <div className="flex gap-2 overflow-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative h-20 w-20 rounded-lg overflow-hidden transition-all duration-200",
                  selectedImage === index && " scale-95",
                )}
              >
                <Image src={image || "/placeholder.svg"} alt={`${title} ${index + 1}`} fill className="object-cover rounded-xl" />
              </button>
            ))}
          </div>

          <div className="space-y-4 p-4 bg-[#FAF4EF] rounded-xl">
            <div className="flex gap-4 text-lg">
              <span className="font-medium">Rent:</span>
              <span>PKR {price.toLocaleString()}</span>
            </div>
            <div className="flex gap-4 text-lg">
              <span className="font-medium">Size:</span>
              <span>{size}</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Dress Description:</h3>
              <p className="text-gray-600 italic">{description}</p>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Contact Information</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter First Name"
                  className={cn("w-full rounded-xl ", errors.firstName && "border-red-500")}
                  {...register("firstName")}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter Last Name"
                  className={cn("w-full rounded-xl ", errors.lastName && "border-red-500")}
                  {...register("lastName")}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  className={cn("w-full rounded-xl ", errors.email && "border-red-500")}
                  {...register("email")}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Select City</Label>
                <Select onValueChange={(value) => register("city").onChange({ target: { value } })}>
                  <SelectTrigger id="city" className={cn(errors.city && "border-red-500")}>
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
                {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Enter Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your Home Address"
                  className={cn("w-full rounded-xl ", errors.address && "border-red-500")}
                  {...register("address")}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter Contact Number"
                  className={cn("w-full rounded-xl ", errors.phone && "border-red-500")}
                  {...register("phone")}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    placeholder="DD/MM/YYYY"
                    className={cn("w-full rounded-xl ", errors.date && "border-red-500")}
                    {...register("date")}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
                </div>
                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-[#6E391D] rounded-xl hover:bg-[#542D18]"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add to cart"}
              </Button>
              <Button onClick={rentNow} type="submit" className="flex-1 bg-[#6E391D] rounded-xl hover:bg-[#542D18]" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Rent Now"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

