"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail } from "lucide-react"

interface LoginFormProps {
  onToggleForm: () => void
}

export default function LoginForm({ onToggleForm }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-center mb-10">Log in</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your Gmail"
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

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-[#7ab3d1] text-black px-8 py-3 rounded-xl border-[1px] border-black hover:bg-[#6aa0be] transition-colors font-medium"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  )
}

