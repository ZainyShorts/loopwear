'use client'
import { useState } from "react"
import Link from "next/link"
import { FaTwitter, FaFacebookF, FaInstagram, FaCcVisa, FaCcMastercard } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast, { Toaster } from "react-hot-toast"

interface Props {
  theme?: string
}

export default function Footer({ theme }: Props) {
  const [email, setEmail] = useState("")
  const isLightTheme = theme === "light"

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log("Subscribed with email:", email)
    toast.success("Thank you for subscribing!")
    setEmail("")
  }

  return (
    <footer className={`w-full py-8 md:py-12 lg:py-16 ${isLightTheme ? "bg-white" : ""}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className={`flex items-center space-x-3 font-bold text-2xl ${isLightTheme ? "text-gray-900" : "text-white"}`}
            >
              Pludo
            </Link>
            <div className={`mt-4 ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>
              <p>Copyright © {new Date().getFullYear()}</p>
              <p>PlayOS, Inc.</p>
              <p>All rights reserved</p>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-4">
            <h3 className={`text-base font-bold ${isLightTheme ? "text-gray-900" : "text-gray-300"}`}>Product</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className={`${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"} transition-colors`}
              >
                Pludo
              </Link>
              <Link
                href="/agents"
                className={`${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"} transition-colors`}
              >
                Agents
              </Link>
              <Link
                href="/pricing"
                className={`${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"} transition-colors`}
              >
                Pricing
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className={`text-base font-bold ${isLightTheme ? "text-gray-900" : "text-gray-300"}`}>Company</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className={`${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"} transition-colors`}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={`${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"} transition-colors`}
              >
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className={`text-base font-bold ${isLightTheme ? "text-gray-900" : "text-gray-300"}`}>Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/privacy"
                className={`${isLightTheme ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"} transition-colors`}
              >
                Privacy Policy
              </Link>
              
            </nav>
          </div>

          {/* Subscribe Section */}
          <div className="flex flex-col gap-4">
            <h3 className={`text-base font-bold ${isLightTheme ? "text-gray-900" : "text-gray-300"}`}>
              Subscribe to Our Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${isLightTheme ? "bg-gray-100" : " text-white"}`}
                required
              />
              <Button
                type="submit"
                className={`w-full border-[1px] ${isLightTheme ? "  hover:bg-white" : "text-gray-900 bg-white hover:bg-white/80"}  transition-colors`}
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>Payment Methods:</span>
            <FaCcVisa size={32} className={`${isLightTheme ? "text-gray-600" : "text-gray-300"}`} />
            <FaCcMastercard size={32} className={`${isLightTheme ? "text-gray-600" : "text-gray-300"}`} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <h3 className={`text-base font-bold ${isLightTheme ? "text-gray-900" : "text-gray-300"}`}>Follow Us</h3>
            <nav className="flex gap-4">
              <Link
                href="#"
                className={`${isLightTheme ? "text-gray-400 hover:text-gray-600" : "text-gray-500 hover:text-gray-300"}`}
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="#"
                className={`${isLightTheme ? "text-gray-400 hover:text-gray-600" : "text-gray-500 hover:text-gray-300"}`}
              >
                <FaFacebookF size={20} />
              </Link>
              <Link
                href="#"
                className={`${isLightTheme ? "text-gray-400 hover:text-gray-600" : "text-gray-500 hover:text-gray-300"}`}
              >
                <FaInstagram size={20} />
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <Toaster />
    </footer>
  )
}