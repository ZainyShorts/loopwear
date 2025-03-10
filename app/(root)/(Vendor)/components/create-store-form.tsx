"use client"

import * as React from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  storeName: z.string().min(2, "Store name is required"),
  storeDescription: z.string().min(10, "Store description is required"),
  storeLogo: z.any().optional(),
  storeAddress: z.string().optional(),
  ownerName: z.string().min(2, "Owner name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  accountDetails: z.string().min(1, "Account details are required"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})

export function CreateStoreForm() {
  const [logoFile, setLogoFile] = React.useState<File | null>(null)
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreeToTerms: false,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      console.log("Form data:", data)
      toast({
        title: "Success",
        description: "Store created successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create store. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F6E7DB] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-12">
          <Image src="/logo.png" alt="Loop Wear" width={240} height={100} className="mx-auto" />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 relative">
          {/* Create Store Button */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <Button className="bg-[#632C0F] hover:bg-[#4A2108] px-8 py-6 text-lg rounded-xl font-medium">
              Create Store
            </Button>
          </div>

          {/* Welcome Text */}
          <div className="text-center mt-8 mb-12">
            <h2 className="text-xl mb-4">Welcome, Fill the following fields</h2>
            <div className="h-px bg-gray-200 max-w-2xl mx-auto"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Store Name */}
              <div className="space-y-2">
                <label className="text-gray-600 block mb-1">Store Name</label>
                <Input
                  placeholder="Enter Store Name"
                  {...register("storeName")}
                  className="rounded-xl border-gray-200"
                />
              </div>

              {/* Store Description */}
              <div className="space-y-2">
                <label className="text-gray-600 block mb-1">Store Description</label>
                <Input
                  placeholder="Enter Store Details"
                  {...register("storeDescription")}
                  className="rounded-xl border-gray-200"
                />
              </div>

              {/* Store Logo */}
              <div className="space-y-2">
                <label className="text-gray-600 block mb-1">Store Logo</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="PNG, JPG File"
                    readOnly
                    value={logoFile?.name || ""}
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
                    ref={fileInputRef}
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>

              {/* Store Address */}
              <div className="space-y-2">
                <label className="text-gray-600 block mb-1">Store Address</label>
                <Input placeholder="Optional" {...register("storeAddress")} className="rounded-xl border-gray-200" />
              </div>

              {/* Owner Name */}
              <div className="space-y-2">
                <label className="text-gray-600 block mb-1">Owner Name</label>
                <Input placeholder="Enter Name" {...register("ownerName")} className="rounded-xl border-gray-200" />
              </div>

              {/* Gmail Address */}
              <div className="space-y-2">
                <label className="text-gray-600 block mb-1">Gmail Address</label>
                <Input
                  type="email"
                  placeholder="Enter Gmail"
                  {...register("email")}
                  className="rounded-xl border-gray-200"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-gray-600 block mb-1">Phone no</label>
                <Input placeholder="Contact Number" {...register("phone")} className="rounded-xl border-gray-200" />
              </div>

              {/* Account Details */}
              <div className="space-y-2">
                <label className="text-gray-600 block mb-1">Account details</label>
                <select
                  {...register("accountDetails")}
                  className="w-full rounded-xl border-gray-200 border p-2 focus:outline-none focus:ring-2 focus:ring-[#632C0F] focus:border-transparent"
                >
                  <option value="">Select Bank details</option>
                  <option value="bank1">Bank Account 1</option>
                  <option value="bank2">Bank Account 2</option>
                  <option value="bank3">Bank Account 3</option>
                </select>
              </div>
            </div>

            {/* Terms and Checkbox */}
            <div className="flex items-start gap-2 mt-8">
              <input
                type="checkbox"
                id="terms"
                className="mt-1"
                onChange={(e) => setValue("agreeToTerms", e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the terms and conditions in Lender&apos;s Policy
              </label>
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
  )
}

