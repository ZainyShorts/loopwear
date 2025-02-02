"use client"

import React from "react"
import { useParams } from "next/navigation"
import { agentsWithSubAgents } from "../components/agentData"
import { ChatInterface } from "./components/ChatInterface/ChatInterface"
import { CompactAgentSidebar } from "./components/Sidebar/chatSideBar"

type Params = {
  subAgents?: string
  agent?: string
}

const Page = () => {
  const params = useParams<Params>()
  const subAgents = params?.subAgents || "No SubAgent Found"
  const mainagent = params?.agent || "No Agent Found"
  const [Main_Agent, setMainAgent] = React.useState<string>()
  const [mainAgentName, setMainAgentName] = React.useState<string>("")
  const [agent, setAgent] = React.useState<string>(""); 
  const [role,setRole] = React.useState<string>('');

  React.useEffect(() => {
    try {
      if (mainagent) {
        function formatAgentRole(role: string | undefined): string {
          if (!role) return ""
          return role.replace(/\s+/g, "_").toUpperCase()
        }
        const MainAgent = agentsWithSubAgents.find((Agent) => Agent.name === mainagent)
        setMainAgent(MainAgent?.image)
        const mainAgentRole = MainAgent?.role 
        setRole(mainAgentRole as string);
        const formattedRole = formatAgentRole(mainAgentRole)
        setMainAgentName(formattedRole)
        const SubAgent = MainAgent?.subAgents.find((Subagent) => Subagent.id === subAgents)
        setAgent(SubAgent?.name as string)
      }
    } catch (e) {
      console.log(e)
    }
  }, [mainagent, subAgents])

  return (
    <div className="flex h-screen bg-gradient-to-b from-purple-950 via-gray-950 to-black">
      {/* Assume there's a main sidebar here */}

      <CompactAgentSidebar botName={role} botAvatar={Main_Agent || ""} mainAgent={agent} />

      <main className="flex-1 flex justify-center p-2 items-center overflow-hidden">
        <ChatInterface botName={agent} botAvatar={Main_Agent} mainAgent={mainAgentName} />
      </main>
    </div>
  )
}

export default Page

