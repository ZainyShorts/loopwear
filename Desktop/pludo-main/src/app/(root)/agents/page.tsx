'use client'
import React from 'react'
import TopHelpersComponent from './components/TopPart/TopHelpersComponent'  
import Agents from './components/Agents/BottomSectionRobots' 
import { useEffect , useState } from 'react'
import Navbar from '@/app/components/Navbar/Navbar'  
import { useCallback } from 'react' 
import { loadFull } from "tsparticles"
import Footer from '@/app/components/Footer/Footer'  
import dynamic from 'next/dynamic'
import type { Engine } from "tsparticles-engine"


const Particles = dynamic(() => import('react-tsparticles').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0118]" />,
})
 
const help = () => { 
    const [mounted, setMounted] = useState(false)
  
    useEffect(() => {
      setMounted(true)
    }, [])
  
    const particlesInit = useCallback(async (engine: Engine) => {
      await loadFull(engine)
    }, [])
  
    if (!mounted) return null
  return (
    <>
    <Navbar/>  
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
    <div className='bg-custom-gradient'>
        <TopHelpersComponent/> 
        <Agents/>
    <Footer/>
    </div>
    </>
  )
}

export default help