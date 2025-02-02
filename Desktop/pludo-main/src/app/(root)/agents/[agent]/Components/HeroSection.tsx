'use client'

import React, { useEffect, useState } from "react"
import { FastAverageColor } from 'fast-average-color'
import { AgentData } from "./data"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface HeroSectionProps {
  Name: string
}

interface Agent {
  name: string
  role: string
  subtitle: string
  avatar: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ Name }) => {
  const [data, setData] = useState<Agent | null>(null)
  const [bgColor, setBgColor] = useState<string>()
  const [textColor, setTextColor] = useState<string>("")

  useEffect(() => {
    const agent = AgentData.find((agent) => agent.name === Name)
    if (agent) {
      setData(agent)
      const fac = new FastAverageColor()
      fac.getColorAsync(agent.avatar)
        .then(color => {
          const [r, g, b] = color.value
          setBgColor(`linear-gradient(180deg, 
            rgba(0,0,0,1) 0%,
            rgba(10,10,10,0.95) 15%,
            rgba(${r * 0.5},${g * 0.5},${b * 0.5},0.95) 45%,
            rgba(${r * 0.7},${g * 0.7},${b * 0.7},0.85) 100%)`)
          setTextColor(`rgb(${r}, ${g}, ${b})`)
        })
        .catch((e) => console.error('Error processing color:', e))
    }
  }, [Name])

  if (!data) return null 
  const handlePurchase = (price : number) =>{ 
    
  }

  return (
    <>
      <div className="relative min-h-screen pt-24 overflow-hidden" style={{ background: bgColor }}>
        <div
          className="absolute inset-0 text-[25vw] font-bold text-white/10 select-none flex items-center justify-center"
          style={{ zIndex: 1 }}
        >
          {data.name}
        </div>

        <div className="container relative mx-auto px-4 py-8" style={{ zIndex: 2 }}>
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-xl font-medium text-white/90">
              {data.name} <span className="text-white/60">({data.role})</span>
            </h2>
            <Link href={'/pricing'}>
            <Button  variant="secondary" className="rounded-full px-6 py-2 bg-white/10 hover:bg-white/20 text-white border-none">
              Buy now →
            </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
                {data.subtitle}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
                {data.role}
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl"></div>
              <Image
  width={600}
  height={600}
  src={data.avatar}
  alt={data.name}
  quality={100}
  sizes="(max-width: 600px) 100vw, 600px"
  className="w-full h-auto max-w-[600px] mx-auto transform translate-y-8 object-contain"
/>
            </div>
          </div>
        </div>
      </div>

      <section className="py-36">
        <div className="container mx-auto px-4 w-full lg:w-[70%] lg:h-[50vh] flex items-center flex-col justify-center text-center">
          <h3 className="text-4xl lg:text-6xl p-2 font-bold" style={{ color: textColor }}>
            Meet {data.name}
          </h3>
          <p className="text-2xl lg:text-4xl font-semibold p-4 mt-4 text-black">
            The revolutionary AI sales manager designed to boost your sales team&apos;s effectiveness. Milli brings high-level strategy and meticulous execution to every interaction, every time.
          </p>
        </div>
      </section>
    </>
  )
}

export default HeroSection
