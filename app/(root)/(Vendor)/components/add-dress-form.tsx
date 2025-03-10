"use client"

import * as React from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"
import { NotificationModal } from "@/app/components/Modal/NotificationModal"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_FILES = 4

const formSchema = z.object({
  dressType: z.string().min(1, "Please select a dress type"),
  dressBrand: z.string().min(1, "Please select a dress brand"),
  dressPrice: z.string().min(1, "Price is required"),
  dressSize: z.string().min(1, "Please select a size"),
  dressListing: z.string().min(1, "Please select a listing category"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
  dressDetails: z.string().min(10, "Please provide dress details"),
  dressImages: z
    .any()
    .refine((files) => files?.length <= MAX_FILES, `You can only upload up to ${MAX_FILES} images`)
    .refine(
      (files: any) => Array.from(files || []).every((file: any) => file.size <= MAX_FILE_SIZE),
      `Each file size should be less than 5MB`,
    ),
})

export function AddDressForm() {
  const [loading, setLoading] = React.useState(false)
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > MAX_FILES) {
      // Show error message
      return
    }
    setSelectedFiles(files)
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      console.log("Form data:", { ...data, images: selectedFiles })
      // Instead of toast, show modal
      setIsModalOpen(true)
    } catch (error) {
      console.error("Failed to add dress", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        heading="Success"
        text="Dress added to the Product list"
      />

      <div className="min-h-screen bg-[#F6E7DB] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-12">
            <Image src="/logo.png" alt="Loop Wear" width={240} height={100} className="mx-auto" />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 relative">
            {/* Add Dress Button */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <Button className="bg-[#632C0F] hover:bg-[#4A2108] px-8 py-6 text-lg rounded-xl font-medium">
                Add Dress
              </Button>
            </div>

            {/* Welcome Text */}
            <div className="text-center mt-8 mb-12">
              <h2 className="text-xl mb-4">Welcome, Fill the following fields</h2>
              <div className="h-px bg-gray-200 max-w-2xl mx-auto"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Dress Type */}
                <div className="space-y-2">
                  <label className="text-gray-600 block mb-1">Dress Type</label>
                  <select
                    {...register("dressType")}
                    className="w-full rounded-xl border-gray-200 border p-2 focus:outline-none focus:ring-2 focus:ring-[#632C0F] focus:border-transparent"
                  >
                    <option value="">Select Dress Type</option>
                    <option value="bridal">Bridal</option>
                    <option value="party">Party Wear</option>
                    <option value="casual">Casual</option>
                  </select>
                </div>

                {/* Dress Brand */}
                <div className="space-y-2">
                  <label className="text-gray-600 block mb-1">Dress Brand</label>
                  <select
                    {...register("dressBrand")}
                    className="w-full rounded-xl border-gray-200 border p-2 focus:outline-none focus:ring-2 focus:ring-[#632C0F] focus:border-transparent"
                  >
                    <option value="">Select Dress Brand</option>
                    <option value="brand1">Brand 1</option>
                    <option value="brand2">Brand 2</option>
                    <option value="brand3">Brand 3</option>
                  </select>
                </div>

                {/* Dress Price */}
                <div className="space-y-2">
                  <label className="text-gray-600 block mb-1">Dress Price</label>
                  <Input placeholder="In PKR" {...register("dressPrice")} className="rounded-xl border-gray-200" />
                </div>

                {/* Dress Size */}
                <div className="space-y-2">
                  <label className="text-gray-600 block mb-1">Dress Size</label>
                  <select
                    {...register("dressSize")}
                    className="w-full rounded-xl border-gray-200 border p-2 focus:outline-none focus:ring-2 focus:ring-[#632C0F] focus:border-transparent"
                  >
                    <option value="">Select Size</option>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                  </select>
                </div>

                {/* Dress Listing */}
                <div className="space-y-2">
                  <label className="text-gray-600 block mb-1">Dress Listing</label>
                  <select
                    {...register("dressListing")}
                    className="w-full rounded-xl border-gray-200 border p-2 focus:outline-none focus:ring-2 focus:ring-[#632C0F] focus:border-transparent"
                  >
                    <option value="">Select Dress listing category</option>
                    <option value="rent">For Rent</option>
                    <option value="sale">For Sale</option>
                  </select>
                </div>

                {/* Date of Purchase */}
                <div className="space-y-2">
                  <label className="text-gray-600 block mb-1">Date of Purchase</label>
                  <div className="relative">
                    <Input type="date" {...register("purchaseDate")} className="rounded-xl border-gray-200" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
                  </div>
                </div>

                {/* Dress Details */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-gray-600 block mb-1">Dress Details</label>
                  <Textarea
                    placeholder="Add dress details necessary to mention. Like, material of dress, stitching, fitting, need for adjustments or not etc."
                    {...register("dressDetails")}
                    className="rounded-xl border-gray-200 min-h-[120px]"
                  />
                </div>

                {/* Dress Images */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-gray-600 block mb-1">Dress Images</label>
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={selectedFiles.map((f) => f.name).join(", ") || "Max of 4 images"}
                      className="rounded-xl border-gray-200 flex-1"
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#90caf9] hover:bg-[#64b5f6] text-black rounded-xl px-6"
                    >
                      Upload
                    </Button>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      {...register("dressImages")}
                    />
                  </div>
                  <p className="text-sm text-gray-500">Maximum file upload size 5MB.</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-8">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#632C0F] hover:bg-[#4A2108] px-8 py-6 text-lg rounded-xl font-medium"
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

