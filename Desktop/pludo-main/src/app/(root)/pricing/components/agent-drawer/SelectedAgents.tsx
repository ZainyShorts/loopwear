import Image from "next/image"
import { X } from "lucide-react"
import type { Agent } from "./types"

interface SelectedAgentsProps {
  selectedAgents: Agent[]
  removeSelectedAgent: (agent: Agent) => void
}

export function SelectedAgents({ selectedAgents, removeSelectedAgent }: SelectedAgentsProps) {
  return (
    <div className="relative max-w-full sm:max-w-[calc(100%-200px)] md:max-w-[calc(100%-280px)] mx-auto overflow-hidden mb-32 sm:mb-0">
      <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 snap-x snap-mandatory"> 
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
        {selectedAgents.map((agent) => (
          <div key={agent.name} className="relative group flex-shrink-0 snap-center">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500 overflow-hidden">
                <Image
                  src={agent.avatar || "/placeholder.svg"}
                  alt={agent.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeSelectedAgent(agent)
                }}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 p-1 sm:p-1.5 rounded-full bg-gray-900 border border-gray-700 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-800"
              >
                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 hover:text-white" />
              </button>
            </div>
            <span className="flex justify-center items-center tracking-widest text-white  text-xs sm:text-sm mt-1">
              {agent.name}
            </span>
          </div> 
          
        ))}
      </div>
     
    </div>
  )
}

