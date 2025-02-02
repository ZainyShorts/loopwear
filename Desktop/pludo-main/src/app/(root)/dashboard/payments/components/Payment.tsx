"use client"

import { CreditCard, Clock, CheckCircle, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/50 to-pink-900/30">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Payments</h1>
        
        {/* Current Plan */}
        <Card className="mb-8 backdrop-blur-xl bg-black/30 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Agents</h2>
                  <p className="text-purple-200/70">$20/month</p>
                </div>
              </div>
              <Button variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30 hover:bg-purple-500/30">
                Purchase 
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        {/* <Card className="mb-8 backdrop-blur-xl bg-black/30 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-purple-500/10">
              <CreditCard className="h-6 w-6 text-purple-400" />
              <div className="flex-1">
                <p className="text-white font-mono">•••• •••• •••• 4242</p>
                <p className="text-sm text-purple-200/70">Expires 12/24</p>
              </div>
              <ChevronRight className="h-5 w-5 text-purple-400" />
            </div>
          </CardContent>
        </Card> */}

        {/* Billing History */}
        <Card className="backdrop-blur-xl bg-black/30 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "2024-03-15", amount: "$49.99" },
                { date: "2024-02-15", amount: "$49.99" },
                { date: "2024-01-15", amount: "$49.99" },
              ].map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-purple-500/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white">{payment.amount}</p>
                      <p className="text-sm text-purple-200/70">{payment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

