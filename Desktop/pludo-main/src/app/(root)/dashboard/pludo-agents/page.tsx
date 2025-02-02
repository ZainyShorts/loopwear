import { pludoAgentsData } from "./components/dummyData"
import { Agentcard } from "./components/AgentCards"

export default function AgentSuit() {


  return (
    <div className="min-h-screen bg-gradient-to-r from-black bg-gray-950 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-violet-400 to-violet-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Choose Your Agent
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Unlock powerful AI agents to supercharge your workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
          {pludoAgentsData.map((agent) => (
            <Agentcard  
              key={agent.id}
              agent={agent}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

