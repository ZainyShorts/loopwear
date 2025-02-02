import { motion } from 'framer-motion'
import Link from 'next/link'
import { X, Users, CreditCard, BookOpen, Mail, LogIn, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  onLogout: () => void
}

export default function SideMenu({ isOpen, onClose, isAuthenticated, onLogout }: SideMenuProps) {
  const menuVariants = {
    closed: { x: "-100%" },
    open: { x: 0 }
  }

  const menuItems = [
    { name: 'Agents', icon: Users, href: '/agents' },
    { name: 'Pricing', icon: CreditCard, href: '/pricing' },
    { name: 'Blog', icon: BookOpen, href: '/blog' },
    { name: 'Contact', icon: Mail, href: '/contact' },
  ]

  const textVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    hover: { x: 5, color: "#f9a8d4" }
  }

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 w-72 h-full bg-gradient-to-r from-black to-purple-900
 z-50 p-6 shadow-lg"
    >
      <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4 text-white hover:text-pink-300 transition-colors bg-transparent duration-200">
        <X className="h-6 w-6" />
      </Button>
      <nav className="mt-16 space-y-1">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="group"
          >
            <Link 
              href={item.href}
              className="flex items-center text-white text-lg font-medium hover:text-pink-300 transition-colors duration-200 py-3 px-2"
              onClick={onClose}
            >
              <item.icon className="h-6 w-6 mr-3  text-gray-400 group-hover:text-pink-300 transition-colors duration-200" />
              <motion.span variants={textVariants} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                {item.name}
              </motion.span>
            </Link>
            {index < menuItems.length - 1 && (
              <motion.div 
                className="h-px bg-gray-700 bg-opacity-30 mx-2" 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            )}
          </motion.div>
        ))}
        {isAuthenticated ? (
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="group"
          >
            <button 
              onClick={() => { onLogout(); onClose(); }}
              className="flex items-center w-full text-left text-white text-lg font-medium hover:text-pink-300 transition-colors duration-200 py-3 px-2"
            >
              <LogOut className="h-6 w-6 mr-3 text-gray-400 group-hover:text-pink-300 transition-colors duration-200" />
              <motion.span variants={textVariants} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                Logout
              </motion.span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="group"
          >
            <Link
              href="/login"
              className="flex items-center text-white text-lg font-medium hover:text-pink-300 transition-colors duration-200 py-3 px-2"
              onClick={onClose}
            >
              <LogIn className="h-6 w-6 mr-3 text-gray-400 group-hover:text-pink-300 transition-colors duration-200" />
              <motion.span variants={textVariants} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                Login
              </motion.span>
            </Link>
          </motion.div>
        )}
      </nav>
    </motion.div>
  )
}
