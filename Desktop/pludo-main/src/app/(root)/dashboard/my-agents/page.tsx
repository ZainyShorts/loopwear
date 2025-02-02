import { Button } from "@/components/ui/button"
import { Agentcard } from "./components/AgentCard"
import { Plus } from 'lucide-react'

const agents = [
  {
    name: "Customer Support Bot",
    status: "active" as const, 
    Avatar : "/images/Avatars/Avatar14.png",
    queries: 1234,
    accuracy: 98,
  },
  {
    name: "Sales Assistant",
    status: "inactive" as const, 
    Avatar : "/images/Avatars/Avatar11.png",
    queries: 856,
    accuracy: 98,
  },
  {
    name: "Data Analyzer",
    status: "active" as const, 
    Avatar : "/images/Avatars/Avatar6.png",
    queries: 2145,
    accuracy: 99,
  },
]

export default function MyAgentsPage() {
  return (
    <div className="space-y-6 min-h-screen p-4 pt-20 bg-custom-gradient md:p-6 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My Agents</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Create New Agent
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {agents.map((agent) => (
          <Agentcard
            key={agent.name}
            name={agent.name}
            status={agent.status} 
            avatar = {agent.Avatar}
            queries={agent.queries}
            accuracy={agent.accuracy}
          />
        ))}
      </div>
    </div>
  )
}

