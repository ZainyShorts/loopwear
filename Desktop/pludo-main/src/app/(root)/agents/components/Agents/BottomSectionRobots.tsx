'use client'
import React from 'react';
import { agents } from './data';
import AgentCard from './AgentCards';
import { Search } from 'lucide-react';

const Agents = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">AI Agents Directory</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our specialized AI agents designed to handle specific business needs
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FA0787]"
              />
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map((agent, index) => (
            <AgentCard  key={index} {...agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agents;