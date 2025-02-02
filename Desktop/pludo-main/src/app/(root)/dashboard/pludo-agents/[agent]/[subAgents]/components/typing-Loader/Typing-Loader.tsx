import { motion } from 'framer-motion'

export const TypingLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start"
    >
      <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl p-4 rounded-2xl border border-white/10">
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-white/40 rounded-full"
              animate={{
                y: ['0%', '-50%', '0%'],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

