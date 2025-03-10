"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react"

interface SignupFormProps {
  onToggleForm: () => void
}

export default function SignupForm({ onToggleForm }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-center mb-10">New To LoopWear?</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-full p-4 bg-[#f8efe0] rounded-md pr-12 text-gray-600 placeholder-gray-500 text-lg"
            required
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div className="relative">
          <input
            type="email"
            placeholder="Enter Your Gmail"
            className="w-full p-4 bg-[#f8efe0] rounded-md pr-12 text-gray-600 placeholder-gray-500 text-lg"
            required
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Mail className="h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            className="w-full p-4 bg-[#f8efe0] rounded-md pr-12 text-gray-600 placeholder-gray-500 text-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
            <span className="sr-only">Toggle password visibility</span>
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-4 bg-[#f8efe0] rounded-md pr-12 text-gray-600 placeholder-gray-500 text-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <Lock className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Toggle password visibility</span>
          </button>
        </div>

        <div className="flex items-center justify-between mt-10">
          <p className="text-base">
            Already have an account, just{" "}
            <button type="button" onClick={onToggleForm} className="font-bold text-black">
              Login
            </button>{" "}
            here
          </p>

          <button
            type="submit"
            className="bg-[#7ab3d1] text-black px-8 py-3 rounded-xl border-[1px] border-black hover:bg-[#6aa0be] transition-colors font-medium"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

