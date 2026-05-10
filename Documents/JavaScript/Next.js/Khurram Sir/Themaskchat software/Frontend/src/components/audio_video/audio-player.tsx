"use client"

import { useRef, useState } from "react"
import { Box, IconButton } from "@mui/material"

export const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause()
      else audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    
    <Box
  className="
    flex items-center gap-4 
    p-4 rounded-2xl 
    bg-gradient-to-br from-[#6C63FF] to-[#9F8CFF] 
    text-white shadow-xl
    backdrop-blur-xl
    w-[260px]          /* 🚀 Increase width */
    sm:w-[300px]       /* optional larger on big screens */
  "
>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      />


      {/* PLAY / PAUSE */}
      <IconButton
        size="small"
        onClick={handlePlayPause}
        className="
          !p-3 rounded-full 
          bg-white 
          shadow-[0_0_15px_rgba(255,255,255,0.6)]
          hover:scale-110 transition
          h-8
          w-12
        "
      >
        {isPlaying ? (
          <i className="tabler-player-pause text-[22px] text-indigo-600" />
        ) : (
          <i className="tabler-player-play text-[22px] text-indigo-600" />
        )}
      </IconButton>

      

      {/* TIMELINE */}
      <Box className="flex-1 flex flex-col gap-1">
        <Box className="flex justify-between text-[10px] opacity-80">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </Box>

        <Box className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <Box
            className="h-full bg-white/80 transition-all"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </Box>
      </Box>
    </Box>
   
  )
}
