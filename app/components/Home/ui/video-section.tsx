"use client"

import { useState } from "react"
import { Play, Pause } from "lucide-react"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  const videoId = "Aj0rFiTMjkw" // Extracted from YouTube URL

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-[#f9f3eb]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Video Side */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-xl">
            {isPlaying ? (
              <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&mute=1&controls=0&loop=1&playlist=${videoId}`}
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            
            
            ) : (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group w-full h-full"
              >
                <Play className="w-16 h-16 text-white" />
                <span className="sr-only">Play video</span>
              </button>
            )}
          </div>

          {/* Text Content Side */}
          <div className="text-center md:text-left space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif">We got you!</h2>
            <p className="text-xl md:text-2xl text-[#462920] font-serif leading-relaxed">
              No Budget? No Problem — Rent the Look with our seamless renting process and Rock the Style
            </p>
            <div>
              <button className="bg-[#6d4534] text-white px-8 py-3 rounded hover:bg-[#5a3a2c] transition-colors text-lg">
                Rent Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
