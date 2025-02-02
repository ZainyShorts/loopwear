'use client'
import React from 'react'
import ContactPageForm from './component/ContactForm'
import Navbar from '@/app/components/Navbar/Navbar'
import Footer from '@/app/components/Footer/Footer' 
import { useEffect , useState } from 'react'
import { useCallback } from 'react' 
import { loadFull } from "tsparticles"
import dynamic from 'next/dynamic'
import type { Engine } from "tsparticles-engine"


const Particles = dynamic(() => import('react-tsparticles').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0118]" />,
})

const page = () => { 
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
    <div className='bg-custom-gradient'>
        <ContactPageForm/>
    <Footer/>
    </div>
    </>
  )
}

export default page