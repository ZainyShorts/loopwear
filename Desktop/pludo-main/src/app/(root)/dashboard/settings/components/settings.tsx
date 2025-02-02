"use client"

import { useState } from "react"
import { Bell, User, Shield, Settings, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/50 to-pink-900/30">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          
          <Card className="backdrop-blur-xl bg-black/30 border-purple-500/20">
            <CardContent className="p-6">
              <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
                  {[
                    { id: "profile", label: "Profile", icon: User },
                    { id: "notifications", label: "Notifications", icon: Bell },
                    { id: "security", label: "Security", icon: Shield },
                    { id: "preferences", label: "Preferences", icon: Settings },
                  ].map(({ id, label, icon: Icon }) => (
                    <TabsTrigger
                      key={id}
                      value={id}
                      className={`flex items-center gap-2 p-3 transition-all data-[state=active]:bg-purple-500/20 
                        data-[state=active]:text-purple-200 hover:bg-purple-500/10 rounded-lg
                        ${activeTab === id ? 'shadow-lg' : ''}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="mt-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-200">Full Name</label>
                  <Input
                    placeholder="write your name here..."
                    className="bg-purple-500/10 border-purple-500/20 text-white placeholder:text-purple-200/50
                      focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-200">Email</label>
                  <Input
                    type="email"
                    placeholder="write your email here..."
                    className="bg-purple-500/10 border-purple-500/20 text-white placeholder:text-purple-200/50
                      focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-200">Company</label>
                  <Input
                    placeholder="Company Name"
                    className="bg-purple-500/10 border-purple-500/20 text-white placeholder:text-purple-200/50
                      focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white
                      transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

