import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
}

export function MetricCard({ 
  icon, 
  label, 
  value, 
  change, 
  changeType 
}: MetricCardProps) {
  return (
    <Card className="bg-white/10 border-zinc-600 ">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-white/5">{icon}</div>
          <span className={`text-sm ${
            changeType === 'positive' ? 'text-green-500' : 'text-red-500'
          }`}>
            {change}
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          <p className="text-sm text-zinc-400">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

