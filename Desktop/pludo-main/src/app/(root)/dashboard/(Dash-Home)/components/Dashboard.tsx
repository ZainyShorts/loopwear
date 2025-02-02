import { Users, MessageSquare, Clock, TrendingUp, LayoutDashboard } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { MetricCard } from './MetricCard'

export function DashboardHome() {
  return (
    <div className='pt-16 p-6 flex-1 w-full'>
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <LayoutDashboard className="text-indigo-400" />
        Dashboard Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<Users className="text-indigo-400" />}
          label="Total Agents"
          value="24"
          change="+12%"
          changeType="positive"
        />
        <MetricCard
          icon={<MessageSquare className="text-green-400" />}
          label="Queries Handled"
          value="3,456"
          change="+23%"
          changeType="positive"
        />
        <MetricCard
          icon={<Clock className="text-purple-400" />}
          label="Avg Response Time"
          value="1.2s"
          change="-18%"
          changeType="negative"
        />
        <MetricCard
          icon={<TrendingUp className="text-rose-400" />}
          label="Success Rate"
          value="98%"
          change="+5%"
          changeType="positive"
        />
      </div>

      {/* Activity and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <Card className="bg-white/10 border-zinc-500">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="text-zinc-400">Loading activities...</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 border-zinc-500">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Trends</h3>
            <div className="text-zinc-400">Loading chart...</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

