"use client"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Menu, Users, UserCheck, UserX, BarChart3, FileText, Loader2 } from "lucide-react"
import TopBanner from "@/app/components/global/top-banner"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { logo } from "@/lib/data"

export default function AdminDashboard() {
  const router = useRouter()

  function navigate(path: string) {
    router.push(path)
  }

  // Sample data for the chart
  const salesData = [1, 6, 5, 6, 3, 8, 3, 6, 3, 4, 4, 4]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Sample statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    suspendedStores: 0,
    completedOrders: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://213.210.37.77:3016/stats/counts")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-[#F6E7DB]">
      <TopBanner />

      {/* Header with Logo and Navigation */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center overflow-hidden border border-[#6b3419]/20">
            <Image
              src={logo || "/placeholder.svg"}
              alt="LoopWear logo"
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-serif tracking-tight">LoopWear</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-[#6b3419] text-[#6b3419] rounded-full hover:bg-[#6b3419] hover:text-white transition-colors"
          >
            logout
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-[#6b3419]/10 bg-white">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 p-0 rounded-md border border-[#6b3419]/20 shadow-lg bg-white"
            >
              <div className="py-3 px-4 border-b border-[#6b3419]/10">
                <p className="font-medium text-[#6b3419]">Admin</p>
              </div>
              <DropdownMenuItem
                onClick={() => navigate("/admin/users")}
                className="py-3 px-4 flex items-center gap-2 cursor-pointer hover:bg-[#6b3419]/10 hover:text-[#6b3419] focus:bg-[#6b3419]/10 focus:text-[#6b3419]"
              >
                <FileText className="h-4 w-4 text-[#6b3419]" />
                <span>View Users</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/admin/stores")}
                className="py-3 px-4 flex items-center gap-2 cursor-pointer hover:bg-[#6b3419]/10 hover:text-[#6b3419] focus:bg-[#6b3419]/10 focus:text-[#6b3419]"
              >
                <FileText className="h-4 w-4 text-[#6b3419]" />
                <span>View Stores</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Admin Welcome Banner */}
      <div className="w-full bg-[#6b3419] text-white py-10 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif">Welcome To Admin Dashboard</h2>
        </div>
      </div>

      {/* Admin Dashboard Stats */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Users */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition-transform hover:scale-105">
            <div className="w-24 h-24 mb-4 bg-[#E8C5B0] rounded-full flex items-center justify-center">
              {loading ? (
                <Loader2 className="h-12 w-12 text-[#6b3419] animate-spin" />
              ) : (
                <Users className="h-12 w-12 text-[#6b3419]" />
              )}
            </div>
            <h3 className="text-xl font-serif text-center mb-2 text-[#6b3419]">Total Users</h3>
            <p className="text-center text-2xl font-bold text-gray-700">{stats.totalUsers}</p>
          </div>

          {/* Total Sellers */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition-transform hover:scale-105">
            <div className="w-24 h-24 mb-4 bg-[#E8C5B0] rounded-full flex items-center justify-center">
              {loading ? (
                <Loader2 className="h-12 w-12 text-[#6b3419] animate-spin" />
              ) : (
                <UserCheck className="h-12 w-12 text-[#6b3419]" />
              )}
            </div>
            <h3 className="text-xl font-serif text-center mb-2 text-[#6b3419]">Total Stores</h3>
            <p className="text-center text-2xl font-bold text-gray-700">{stats.totalStores}</p>
          </div>

          {/* Suspended Sellers */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition-transform hover:scale-105">
            <div className="w-24 h-24 mb-4 bg-[#E8C5B0] rounded-full flex items-center justify-center">
              {loading ? (
                <Loader2 className="h-12 w-12 text-[#6b3419] animate-spin" />
              ) : (
                <UserX className="h-12 w-12 text-[#6b3419]" />
              )}
            </div>
            <h3 className="text-xl font-serif text-center mb-2 text-[#6b3419]">Suspended Stores</h3>
            <p className="text-center text-2xl font-bold text-gray-700">{stats.suspendedStores}</p>
          </div>

          {/* Sales Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition-transform hover:scale-105">
            <div className="w-24 h-24 mb-4 bg-[#E8C5B0] rounded-full flex items-center justify-center">
              {loading ? (
                <Loader2 className="h-12 w-12 text-[#6b3419] animate-spin" />
              ) : (
                <BarChart3 className="h-12 w-12 text-[#6b3419]" />
              )}
            </div>
            <h3 className="text-xl font-serif text-center mb-2 text-[#6b3419]">Completed Orders</h3>
            <p className="text-center text-2xl font-bold text-gray-700">{stats.completedOrders}</p>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-serif mb-6 text-center text-[#6b3419]">Sales Summary</h3>

          <div className="w-full h-80 relative">
            {/* Chart Container */}
            <div className="w-full h-full flex flex-col">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
                  <div key={num}>{num}</div>
                ))}
              </div>

              {/* Chart area */}
              <div className="ml-8 h-full flex items-end border-l border-b border-gray-300 relative">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((line) => (
                  <div
                    key={line}
                    className="absolute w-full border-t border-gray-200"
                    style={{ bottom: `${line * 10}%` }}
                  />
                ))}

                {/* Chart line */}
                <svg className="absolute inset-0 overflow-visible" preserveAspectRatio="none">
                  <polyline
                    points={salesData
                      .map((value, index) => `${index * (100 / (salesData.length - 1))}% ${100 - (value / 9) * 100}%`)
                      .join(" ")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                  {salesData.map((value, index) => (
                    <circle
                      key={index}
                      cx={`${index * (100 / (salesData.length - 1))}%`}
                      cy={`${100 - (value / 9) * 100}%`}
                      r="4"
                      fill="#3b82f6"
                    />
                  ))}
                </svg>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 w-full flex justify-between translate-y-full pt-2">
                  {months.map((month, index) => (
                    <div key={index} className="text-xs text-gray-500">
                      {month}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center mt-10 text-gray-700">Sales over the year</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-[#6b3419]/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif mb-4 text-[#6b3419]">Quick Actions</h3>
          <p className="mb-6 max-w-2xl mx-auto text-gray-700">
            Manage your platform efficiently with these quick action buttons.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="bg-[#6b3419] hover:bg-[#5a2c15] text-white px-6 py-2 rounded-full"
              onClick={() => navigate("/manage-users")}
            >
              Manage Users
            </Button>
            <Button
              className="bg-[#6b3419] hover:bg-[#5a2c15] text-white px-6 py-2 rounded-full"
              onClick={() => navigate("/review-products")}
            >
              Review Products
            </Button>
            <Button
              className="bg-[#6b3419] hover:bg-[#5a2c15] text-white px-6 py-2 rounded-full"
              onClick={() => navigate("/manage-orders")}
            >
              Manage Orders
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#6b3419] py-10 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">www.loopwear.com</p>
        </div>
      </footer>
    </div>
  )
}

