"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 


export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={`sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-white/90 border-b " : "bg-transparent"}`}
    >
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <nav
            className={`flex ${isScrolled ? "text-gray-800" : "text-white dark:text-muted-foreground"} items-center space-x-4`}
          >
            <Button className={`hover:bg-gray-100 ${isScrolled ? "hover:bg-transparent hover:text-black text-gray-800" : "text-white hover:text-black"}`} variant="ghost">
              Data
            </Button>
            <Button className={`hover:bg-gray-100 ${isScrolled ? "hover:bg-transparent hover:text-black text-gray-800" : "text-white hover:text-black"}`} variant="ghost">
              Automations
            </Button>
            <Button className={`hover:bg-gray-100 ${isScrolled ? "hover:bg-transparent hover:text-black text-gray-800" : "text-white hover:text-black"}`} variant="ghost">
              Interfaces
            </Button>
            <Button className={`hover:bg-gray-100 ${isScrolled ? "hover:bg-transparent hover:text-black text-gray-800" : "text-white hover:text-black"}`} variant="ghost">
              Forms
            </Button>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage
                  src="https://c4.wallpaperflare.com/wallpaper/900/199/830/anime-animated-wallpaper-preview.jpg"
                  alt="Profile"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/logout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

