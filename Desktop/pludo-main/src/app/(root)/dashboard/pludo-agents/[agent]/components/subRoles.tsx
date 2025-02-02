"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { agentsWithSubAgents } from "./agentData"
import type { AgentWithSubAgents, SubAgent } from "./agentData"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

type Params = {
  agent?: string
}

interface Prop {
  name?: string
}

const SubRoles: React.FC<Prop> = ({ name }) => {
  const [details, setDetails] = useState<AgentWithSubAgents>()
  const router = useRouter()
  const params = useParams<Params>()
  const [agent, setAgent] = useState<string>("Not Defined")

  useEffect(() => {
    setAgent(params?.agent || "Not Defined")
  }, [params])

  useEffect(() => {
    if (!name) return
    const matchedAgent = agentsWithSubAgents.find((agent) => agent.name === name)
    if (matchedAgent) {
      setDetails(matchedAgent)
    }
  }, [name])

  const handleChat = (id: string) => {
    if (!id) {
      return
    } else {
      router.push(`/dashboard/pludo-agents/${agent}/${id}`)
    }
  }

  const truncateDescription = (description: string) => {
    const words = description.split(" ")
    return words.slice(0, 6).join(" ") + (words.length > 6 ? "..." : "")
  }

  return (
    <div className="h-[500px] bg-gradient-to-br from-black to-purple-900 text-white p-6 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white to-purple-400 text-transparent bg-clip-text">
          {details?.role || "Role Details"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {details?.subAgents.map((role: SubAgent, index: number) => (
            <div
              key={index}
              className="group py-8 relative bg-white/5 rounded-xl p-6 
                        backdrop-blur-md border border-white/10 shadow-lg transform transition-all duration-300 
                        hover:scale-105 hover:shadow-violet-500/20 hover:border-white/20 overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-cyan-500/10 
                            rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    {role.icon && (
                      <role.icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                    )}
                    <h3
                      className="text-xl font-semibold tracking-tight bg-gradient-to-r from-white to-gray-300 
                                 bg-clip-text text-transparent"
                    >
                      {role.name}
                    </h3>
                  </div>
                  <p
                    className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 
                              transition-colors duration-300 mb-4"
                  >
                    {truncateDescription(role.description)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30 
                             text-white hover:text-white transition-all duration-300"
                  onClick={() => handleChat(role.id)}
                >
                  Start Chat
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubRoles

