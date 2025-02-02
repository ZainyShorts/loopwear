'use client'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger, 
  DropdownMenuLabel,  
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Menu, Users, CreditCard, BookOpen, Mail } from 'lucide-react'
import { useSession, useUser, useDescope } from '@descope/nextjs-sdk/client'
import { motion, AnimatePresence } from 'framer-motion'
import SideMenu from './SideMenu'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const sdk = useDescope()
  const { isAuthenticated } = useSession()
  const { user } = useUser()
  const router = useRouter()

  const handleLogout = useCallback((path:string) => {
    if(path === "/logout") return sdk.logout()

    else router.push(path)
  }, [sdk])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { name: 'Agents', icon: Users, href: '/agents' },
    { name: 'Pricing', icon: CreditCard, href: '/pricing' },
    { name: 'About', icon: BookOpen, href: '/about' },
    { name: 'Contact', icon: Mail, href: '/contact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-white/10 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Hamburger menu for mobile */}
            <motion.div 
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button variant="ghost" size="icon" onClick={() => setIsSideMenuOpen(true)}>
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-200' : 'text-white'}`} />
              </Button>
            </motion.div>

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link href="/" className={`text-xl font-bold text-center flex-grow md:flex-grow-0 ${isScrolled ? 'text-gray-200' : 'text-white'}`}>
                Pludo
              </Link>
            </motion.div>

            {/* Desktop menu items */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link 
                    href={item.href} 
                    className={`${isScrolled ? 'text-gray-200' : 'text-white'} hover:text-gray-300 transition-colors duration-200 flex items-center`}
                  >
                    {/* <item.icon className="h-5 w-5 mr-1" /> */}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center">
              {!isAuthenticated ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    asChild 
                    variant="outline"
                    className={`${isScrolled ? 'text-gray-200 bg-transparent border-gray-200' : 'bg-transparent text-white border-white'} transition-colors duration-200`}
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                </motion.div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Image
                        src={user?.picture || "/images/Avatars/Avatar2.png"}
                        alt='user'
                        width={40}
                        height={40}
                        className='rounded-full cursor-pointer'
                      />
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='cursor-pointer' onClick={()=>handleLogout('/dashboard')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={()=>handleLogout('/logout')}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isSideMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSideMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        onLogout={()=>handleLogout('/logout')}
      />
    </>
  )
}

