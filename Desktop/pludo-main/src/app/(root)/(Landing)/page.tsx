'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Navbar from '../../components/Navbar/Navbar'
import Robots from './components/RobotsSection/Robots'
import Footer from '@/app/components/Footer/Footer'
import Features from './components/Features/Features'
import Integrations from './components/Integrations/Integration'

const Particles = dynamic(() => import('react-tsparticles').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0118]" />,
})

import { loadFull } from "tsparticles"
import type { Engine } from "tsparticles-engine"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0118]">
      <Navbar />

      {/* Space Background with Stars */}
      <div className="absolute inset-0 bg-[#0a0118]">
        {/* Deep Space Nebula Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#150829] to-[#0a0118] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#1a0b2e]/10 to-transparent" />
        
        {/* Animated Star Field */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: true },
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: ["#ffffff", "#9d5cff", "#ff49db"]
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.05,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 0.3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 2000,
                },
                value: 100,
              },
              opacity: {
                value: 0.8,
                random: true,
                anim: {
                  enable: true,
                  speed: 0.5,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  size_min: 0.1,
                  sync: false
                }
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-5">
          {/* Hero Section */}
          <div className="min-h-screen flex flex-col items-center justify-center relative">
            {/* Space Station Image */}
            <div className="absolute inset-0 opacity-20">
              <Image
                src="/placeholder.svg?height=1080&width=1920"
                alt="Deep Space"
                layout="fill"
                objectFit="cover"
                className="mix-blend-screen"
                priority
              />
            </div>

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center space-y-12 relative z-10 max-w-5xl mx-auto px-4"
            >
              {/* Title with Enhanced Gradient */}
              <motion.h1 
                className="text-7xl md:text-8xl lg:text-9xl font-bold lg:pt-24 tracking-tighter"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className='flex flex-wrap items-center justify-center'>

                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#ff49db] via-[#9d5cff] to-[#37a6ff] animate-gradient-x">
                  Pludo AI
                </span>

                <Image
                src="/images/Avatars/6.png"
                alt="Deep Space"
                // layout="fill"
                width={150}
                height={150}
                objectFit="contain"
                // className="mix-blend-screen "
                priority
                />
                </div>
              </motion.h1>

              
              {/* Subtitle with Glow Effect */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-light"
              >
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  Explore the Beauty of the Metaverse World
                </span>
              </motion.p>

              {/* Enhanced Button Group */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255,73,219,0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-gradient-to-r from-[#ff49db] to-[#9d5cff] rounded-full text-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50 min-w-[250px] backdrop-blur-sm text-white"
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(157,92,255,0.3)",
                    backgroundColor: "rgba(157,92,255,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-transparent border-2 border-[#9d5cff] rounded-full text-2xl font-semibold transition-all duration-300 min-w-[250px] backdrop-blur-sm text-purple-300 hover:bg-[#9d5cff]/10"
                >
                  Learn More
                </motion.button>
              </motion.div>

              {/* Floating Space Elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${i % 2 === 0 ? '#ff49db' : '#9d5cff'}, ${i % 2 === 0 ? '#9d5cff' : '#37a6ff'})`,
                      boxShadow: `0 0 30px ${i % 2 === 0 ? 'rgba(255,73,219,0.5)' : 'rgba(157,92,255,0.5)'}`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.random() * 30 - 15, 0],
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Rest of the sections with enhanced dark space theme */}
        <div className="relative z-10">
          <Robots />
          <Features />
          <Integrations />
          <Footer />
        </div>
      </div>
    </main>
  )
}

