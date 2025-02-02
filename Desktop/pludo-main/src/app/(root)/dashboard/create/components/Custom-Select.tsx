import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface CustomSelectProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  label: string
}

export const CustomSelect = ({ options, value, onChange, label }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <label className="block text-lg font-medium text-purple-300 mb-2">{label}</label>
      <motion.div
        className="w-full bg-purple-900 bg-opacity-50 border border-purple-500 rounded-xl px-4 py-3 text-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.3)' }}
      >
        <span>{value || 'Select an option'}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute z-10 w-full mt-1 bg-purple-900 bg-opacity-90 border border-purple-500 rounded-xl shadow-lg max-h-60 overflow-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <motion.li
                key={option}
                className="px-4 py-2 cursor-pointer hover:bg-purple-700 transition duration-200"
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
              >
                {option}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}