"use client"

import { useCallback } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { loadFull } from "tsparticles"
import type { Engine } from "tsparticles-engine"

const Particles = dynamic(() => import("react-tsparticles").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0118]" />,
})

export default function SpaceBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
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
              value: ["#ffffff", "#9d5cff", "#ff49db"],
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
                sync: false,
              },
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
                sync: false,
              },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: `linear-gradient(to right, ${i % 2 === 0 ? "#ff49db" : "#9d5cff"}, ${i % 2 === 0 ? "#9d5cff" : "#37a6ff"})`,
            boxShadow: `0 0 30px ${i % 2 === 0 ? "rgba(255,73,219,0.5)" : "rgba(157,92,255,0.5)"}`,
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
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

