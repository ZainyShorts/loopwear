'use client'

import React, { useEffect, useState } from 'react'
import { FastAverageColor } from 'fast-average-color'
import { agentsWithSubAgents } from './agentData' 
import { AgentWithSubAgents } from './agentData'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Prop {
  name?: string
}

const AgentDetails: React.FC<Prop> = ({ name }) => {
  const [details, setDetails] = useState<AgentWithSubAgents>()
  const [bgStartColor, setBgStartColor] = useState<string>('rgb(30, 30, 30)')
  
  useEffect(() => {
    if (!name) return

    const matchedAgent = agentsWithSubAgents.find(agent => agent.name === name)
    if (matchedAgent) {
      setDetails(matchedAgent)
      
      const fac = new FastAverageColor()
      fac.getColorAsync(matchedAgent.image)
        .then(color => {
          const [r, g, b] = color.value.slice(0, 3)
          const brighterColor = `rgb(${Math.min(r + 30, 255)}, ${Math.min(g + 30, 255)}, ${Math.min(b + 30, 255)})`
          setBgStartColor(brighterColor)
        })
        .catch(e => {
          console.log(e)
          setBgStartColor('rgb(60, 60, 60)') 
        })
    } else {
      
    }
  }, [name])

  if (!details?.name) return null

  return (
    <main className="min-h-screen overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(180deg, ${bgStartColor} 0%, rgba(0, 0, 0, 0.8) 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center md:text-left space-y-8 max-w-2xl"
          >
            <h1 className="text-7xl md:text-8xl xl:text-9xl font-black text-white drop-shadow-lg">
              {details.name}
            </h1>
            <p className="text-gray-200 text-xl md:text-2xl leading-relaxed tracking-wide drop-shadow">
              Discover the extraordinary capabilities and unique traits that define this remarkable agent.
            </p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-72 h-72 md:w-[36rem] md:h-[36rem] group perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/40 rounded-3xl transform -rotate-6 scale-95 transition-all duration-500 group-hover:rotate-12 group-hover:scale-105 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent rounded-3xl transform rotate-6 scale-95 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-105" />
            
            <div className="relative w-full h-full rounded-3xl overflow-hidden transform transition-all duration-700 group-hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <Image 
                src={details.image || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture.PNG-ot4zH3SOVYKwvREYdebPAbajhLahkJ.png"}
                alt="Agent profile"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
                sizes="(max-width: 708px) 288px, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60 mix-blend-multiply" />
      </motion.div>
    </main>
  )
}

export default AgentDetails

