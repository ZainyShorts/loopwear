"use client"

import Image from "next/image"
import { LogOut, Search, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface SubHeaderProps {
  onLogout?: () => void
  showSearch?: boolean
}

export function SubHeader({ onLogout, showSearch = false }: SubHeaderProps) {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-[#FAF4EF]">
      <div className="flex justify-center items-center">
        <div className="font-serif italic text-2xl md:text-3xl">Loop</div>
        <Image src="/logo.png" alt="Loop Wear Logo" width={240} height={50} className="h-16 w-32" />
        <div className="font-serif italic text-2xl md:text-3xl">Wear</div>
      </div>

      {showSearch && (
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search product here"
              className="w-full pl-4 pr-10 py-2 rounded-full border-[1px]  border-[#B0ABAB] bg-[#D9D9D996]"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link href={'/cart'} className="text-[#6E391D] hover:text-[#542D18] transition-colors" aria-label="Shopping cart">
          <ShoppingCart className="h-6 w-6" />
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#6E391D] text-[#6E391D] hover:bg-[#6E391D] hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">logout</span>
          <LogOut size={16} />
        </button>
      </div>
    </header>
  )
}

