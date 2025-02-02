'use client'

import { Card } from "@/components/ui/card"
import { Activity, Clock, Users, TrendingUp } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent 
} from "@/components/ui/chart" 
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import { data , performanceData } from "./analyticsData"


export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/50 to-pink-900/30">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 animate-fade-in">Analytics</h1>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Usage Card */}
          <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-300">
                  <Activity className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-green-400 text-sm font-medium">+12%</span>
              </div>
              <h3 className="text-sm font-medium text-purple-200/70">Total Usage</h3>
              <p className="text-2xl font-bold text-white mt-2">45,678</p>
            </div>
          </Card>

          {/* Success Rate Card */}
          <Card className="bg-black/20 backdrop-blur-xl border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-all duration-300">
                  <TrendingUp className="w-6 h-6 text-pink-400" />
                </div>
                <span className="text-green-400 text-sm font-medium">+2%</span>
              </div>
              <h3 className="text-sm font-medium text-pink-200/70">Success Rate</h3>
              <p className="text-2xl font-bold text-white mt-2">98.5%</p>
            </div>
          </Card>

          {/* Response Time Card */}
          <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-300">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-red-400 text-sm font-medium">-15%</span>
              </div>
              <h3 className="text-sm font-medium text-purple-200/70">Response Time</h3>
              <p className="text-2xl font-bold text-white mt-2">1.2s</p>
            </div>
          </Card>

          {/* Active Users Card */}
          <Card className="bg-black/20 backdrop-blur-xl border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-all duration-300">
                  <Users className="w-6 h-6 text-pink-400" />
                </div>
                <span className="text-green-400 text-sm font-medium">+8%</span>
              </div>
              <h3 className="text-sm font-medium text-pink-200/70">Active Users</h3>
              <p className="text-2xl font-bold text-white mt-2">1,234</p>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usage Over Time Chart */}
          <Card className="bg-black/20  backdrop-blur-xl border-purple-500/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Usage Over Time</h3>
            <ChartContainer
              className="h-[300px]  w-[95%]"
              config={{
                value: {
                  label: "Usage",
                  color: "#8b5cf6"
                } 
              }}
            >
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <ChartTooltip content={<ChartTooltipContent />} /> 
                <ChartLegend content={<ChartLegendContent/>} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-value)" }}
                />
              </LineChart>
            </ChartContainer>
          </Card>

          {/* Performance Metrics Chart */}
          <Card className="bg-black/20 backdrop-blur-xl border-pink-500/20 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Performance Metrics</h3>
            <ChartContainer
              className="h-[300px] w-[95%]"
              config={{
                success: {
                  label: "Success",
                  color: "#ec4899"
                },
                failure: {
                  label: "Failure",
                  color: "#be185d"
                }
              }}
            >
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                <YAxis stroke="rgba(255,255,255,0.3)" />
                <ChartTooltip content={<ChartTooltipContent />} /> 
                <ChartLegend content={<ChartLegendContent/>} />

                <Bar 
          dataKey="success" 
  fill="var(--color-success)" 
  radius={[4, 4, 0, 0]}  

/>

                <Bar dataKey="failure" fill="var(--color-failure)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </Card>
        </div>
      </div>
      <style jsx> 
        {`
        @keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}       
        `}
      </style>
    </div> 
  )
}

