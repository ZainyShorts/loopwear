import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AgentData } from "@/app/(root)/agents/[agent]/Components/data"
import type { Agent } from "./types"

interface AgentListProps {
  planType: string
  selectedAgents: Agent[]
  toggleAgentSelection: (agent: Agent) => void
}

export function AgentList({ planType, selectedAgents, toggleAgentSelection }: AgentListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const scrollTo = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 200
    const currentScroll = container.scrollLeft
    const maxScroll = container.scrollWidth - container.clientWidth
    const targetScroll =
      direction === "left"
        ? Math.max(0, currentScroll - scrollAmount)
        : Math.min(maxScroll, currentScroll + scrollAmount)

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    })
  }

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScrollButtons()
    container.addEventListener("scroll", checkScrollButtons)
    window.addEventListener("resize", checkScrollButtons)

    return () => {
      container.removeEventListener("scroll", checkScrollButtons)
      window.removeEventListener("resize", checkScrollButtons)
    }
  }, [])

  return (
    <div className="relative w-full max-w-[95%] sm:max-w-[90%] mx-auto px-2 sm:px-4">
      <button
        onClick={() => scrollTo("left")}
        className={`absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 group shadow-lg ${
          canScrollLeft ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="Previous agents"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white transition-colors" />
      </button>

      <button
        onClick={() => scrollTo("right")}
        className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 group shadow-lg ${
          canScrollRight ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="Next agents"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white transition-colors" />
      </button>

      <div className="relative w-full flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory py-4 sm:py-8"
        > 
        <style jsx >{`
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`}</style>
          {AgentData.map((agent) => (
            <div
              key={agent.name}
              onClick={() => toggleAgentSelection(agent)}
              className={`flex-none w-[120px] sm:w-[160px] md:w-[180px] pb-4 flex flex-col items-center gap-3 sm:gap-4 group snap-center cursor-pointer transition-transform duration-300 hover:scale-105 ${
                selectedAgents.some((a) => a.name === agent.name) ? "scale-105" : ""
              }`}
            >
              <div className="relative">
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm ${
                    selectedAgents.some((a) => a.name === agent.name) ? "opacity-50" : ""
                  }`}
                />
                <div className="relative">
                  <div
                    className={`relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-2 transition-all duration-300 ${
                      selectedAgents.some((a) => a.name === agent.name)
                        ? "border-purple-500 shadow-lg shadow-purple-500/20"
                        : "border-gray-700 group-hover:border-gray-500"
                    }`}
                  >
                    <Image
                      src={agent.avatar || "/placeholder.svg"}
                      alt={agent.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110 rounded-full"
                    />
                  </div>
                </div>
                {selectedAgents.some((a) => a.name === agent.name) && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-purple-500/90 to-blue-500/90 backdrop-blur-sm border border-white/10 shadow-lg transform transition-all duration-300 scale-100 animate-in fade-in zoom-in">
                    <span className="text-[10px] sm:text-xs font-medium text-white tracking-wider">Selected</span>
                  </div>
                )}
              </div>
              <div className="text-center space-y-0.5 sm:space-y-1">
                <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
                  {agent.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {agent.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> 
    
  ) 
  
}
;

