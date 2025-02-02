"use client"
import { Lock } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Agent } from './dummyData'
import { useState } from "react" 
import { useRouter } from 'next/navigation'

interface AgentCardProps {
  agent: Agent
}

export function Agentcard({ agent }: AgentCardProps) { 
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false); 
  const handleDetails = (agent : Agent) => {  
    router.push(`/dashboard/pludo-agents/${agent.name}`)
  }
  return (
    <Card  
    onClick={()=>handleDetails(agent)}
      className={cn(
        "group relative h-[420px] overflow-hidden rounded-3xl transition-all duration-500",
        agent.isLocked 
          ? "bg-white/10 opacity-60" 
          : "bg-slate-400",
        isHovered && !agent.isLocked && "shadow-xl shadow-violet-500/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      {!agent.isLocked && (
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)',
          }}
        />
      )}

      {/* Content Container */}
      <div className="relative z-20 flex h-full flex-col p-6">
        {/* Header */}
        <div className="mb-4 space-y-1">
          <h3 className={cn(
            "text-2xl font-bold tracking-tight",
            agent.isLocked ? "text-white/70" : "text-black"
          )}>
            {agent.name}
          </h3>
          <p className={cn(
            "text-sm font-medium",
            agent.isLocked ? "text-white/50" : "text-black/80"
          )}>
            {agent.role}
          </p>
        </div>

        {/* Image Container */}
        <div className="relative flex-1">
          <div className={cn(
            "absolute inset-0 rounded-xl transition-transform duration-500",
            isHovered && "scale-105"
          )}>
            <img
              src={agent.image}
              alt={agent.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Lock Overlay for Locked Agents */}
          {agent.isLocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full",
                "bg-black/30 backdrop-blur-sm",
                "ring-2 ring-white/10",
                "transition-all duration-300 group-hover:scale-110 group-hover:ring-white/20"
              )}>
                <Lock className="h-6 w-6 text-white/90" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {agent.isSpecial ? (
          <Button
            className={cn(
              "mt-4 overflow-hidden bg-white/10 backdrop-blur-sm",
              "transition-all duration-300 hover:bg-white/20",
              "group/button relative"
            )}
          >
            <span className="relative z-10 bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
              Unlock Pludo X
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-400/20 to-transparent transition-transform duration-300 group-hover/button:translate-x-0" />
          </Button>
        ) : (
          <div className={cn(
            "mt-4 h-1 w-full rounded-full transition-all duration-300",
            agent.isLocked 
              ? "bg-white/10" 
              : "bg-gradient-to-r from-violet-300 to-violet-400"
          )} />
        )}
      </div>

      {/* Animated Border Glow */}
      <div 
        className={cn(
          "absolute inset-0 -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-500",
          isHovered && !agent.isLocked && "opacity-100"
        )}
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(167, 139, 250, 0.1))',
        }}
      />
    </Card>
  )
}

