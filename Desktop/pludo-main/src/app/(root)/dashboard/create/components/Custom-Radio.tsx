import { motion } from 'framer-motion'

interface CustomRadioProps {
  name: string
  value: string
  label: string
  checked: boolean
  onChange: (value: string) => void
}

export const CustomRadio = ({ name, value, label, checked, onChange }: CustomRadioProps) => (
  <label className="flex items-center cursor-pointer group">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
      className="sr-only"
    />
    <motion.div
      className={`w-6 h-6 mr-2 border-2 rounded-full flex items-center justify-center ${
        checked ? 'border-pink-500 bg-pink-500' : 'border-purple-500'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {checked && (
        <motion.div
          className="w-3 h-3 bg-white rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
    <span className={`${checked ? 'text-pink-400' : 'text-purple-300'} group-hover:text-pink-400 transition duration-300`}>
      {label}
    </span>
  </label>
)