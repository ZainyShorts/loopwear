'use client'

import { Switch } from "@/components/ui/switch"
import { ArrowRight } from 'lucide-react'
import { motion } from "framer-motion" 
import { integrationData } from "./integrationData"

interface IntegrationCardProps {
  icon: React.ReactNode
  name: string
  isConnected: boolean
  onToggle: () => void
  description: string
}

function IntegrationCard({ icon, name, isConnected, onToggle, description }: IntegrationCardProps) {
  return (
    <motion.div
      className="relative min-h-[300px] overflow-hidden rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 p-8 flex flex-col gap-4 group transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-6">
          <div className="text-white/90 w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500/50 to-pink-500/50 shadow-lg shadow-purple-500/20"> 
            {icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">{name}</h3>
            <p className="text-white/60 text-lg">
              {isConnected ? "Connected" : "Not connected"}
            </p>
          </div>
        </div>
        <Switch
          checked={isConnected}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-gradient-to-r from-purple-500 to-pink-500 h-8 w-16 p-2"
        />
      </div>

      <p className="text-white/70 text-lg leading-relaxed">
        {description}
      </p>

      <div className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors cursor-pointer group/link">
        <span className="text-sm font-medium">Learn more</span>
        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </motion.div>
  )
}

export default function Integrations() {
 

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-purple-900/50 to-pink-900/30">
      <div className="container mx-auto px-6 py-24">
        <motion.div 
          className="max-w-7xl mx-auto space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4 text-center">
            <motion.h1 
              className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Integrations
            </motion.h1>
            <motion.p 
              className="text-white/60 text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Connect your favorite platforms to enhance your experience and streamline your workflow
            </motion.p>
          </div>
          
          <motion.div 
            className="grid gap-8 lg:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {integrationData.map((integration, index) => (
              <motion.div
                key={integration.name} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <IntegrationCard
                  {...integration}
                  onToggle={() => console.log(`${integration.name}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

