import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GradientButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export const GradientButton = ({ children, onClick, type = 'button', className = '' }: GradientButtonProps) => (
  <motion.button
    type={type}
    onClick={onClick}
    className={`bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300 ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
)