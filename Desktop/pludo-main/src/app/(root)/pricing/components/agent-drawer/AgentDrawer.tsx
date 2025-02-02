"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useMutation } from "@apollo/client"
import { Make_Payment } from "@/lib/query"
import { type Stripe, loadStripe } from "@stripe/stripe-js"
import { useUser } from "@descope/nextjs-sdk/client"
import { useRouter } from "next/navigation"
import type { AgentDrawerProps, Agent } from "./types"
import { AgentList } from "./AgentList"
import { SelectedAgents } from "./SelectedAgents"
import { calculateTotalPrice, updateSelectionMessage } from "./utils"

export function AgentDrawer({ isOpen, onClose, planType }: AgentDrawerProps) {
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([])
  const router = useRouter()
  const { user } = useUser()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectionMessage, setSelectionMessage] = useState<string | null>(null)

  const toggleAgentSelection = (agent: Agent) => {
    setSelectedAgents((prev) => {
      const isSelected = prev.some((a) => a.name === agent.name)
      if (isSelected) {
        const newSelection = prev.filter((a) => a.name !== agent.name)
        setSelectionMessage(updateSelectionMessage(newSelection.length, planType))
        return newSelection
      }
      if (planType === "Plus" && prev.length >= 10) {
        setErrorMessage("You can select a maximum of 10 agents for the Plus plan.")
        setTimeout(() => setErrorMessage(null), 3000)
        return prev
      }
      const newSelection = [...prev, agent]
      setSelectionMessage(updateSelectionMessage(newSelection.length, planType))
      return newSelection
    })
  }

  const removeSelectedAgent = (agent: Agent) => {
    setSelectedAgents((prev) => {
      const newSelection = prev.filter((a) => a.name !== agent.name)
      setSelectionMessage(updateSelectionMessage(newSelection.length, planType))
      return newSelection
    })
  }

  useEffect(() => {
    setSelectedAgents([])
    setErrorMessage("")
    setSelectionMessage(updateSelectionMessage(0, planType))
  }, [planType])

  const [MakePayment] = useMutation(Make_Payment())

  const Checkout = async () => {
    if (!user?.userId) return router.push("/login")

    if (planType === "Plus" && selectedAgents.length !== 10) {
      setErrorMessage("You must select exactly 10 agents for the Plus plan.")
      setTimeout(() => setErrorMessage(null), 3000)
      return
    }

    const stripe: Stripe | null = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)

    if (!stripe) {
      console.error("Stripe failed to load.")
      return
    }

    const path = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"

    const paymentInput = selectedAgents.map((agent) => ({
      amount: planType === "Plus" ? 14.9 : 20,
      agent: agent.name,
      img: "https://res.cloudinary.com/dklqbx5k0/image/upload/v1737030967/ossuczzut3kurcwrqsuw.webp",
    }))

    const { data, errors } = await MakePayment({
      variables: {
        paymentInput: paymentInput,
        deScopeId: user!.userId,
        path,
      },
    })

    if (errors) {
      console.log(errors)
      return
    }

    try {
      await stripe.redirectToCheckout({
        sessionId: data.makePayment,
      })
    } catch (error) {
      console.error("Payment failed:", error)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-[85vh] sm:h-[80vh] p-0 bg-black backdrop-blur-xl border-t border-gray-800"
      >
        <SheetTitle className="sr-only">Select Agent</SheetTitle>
        <div className="relative w-full h-full scrollbar-hide flex flex-col items-center justify-between overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-gray-900/70 to-purple-900/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/5 to-gray-900/0" />
          </div>

          <div className="relative w-full scrollbar-hide pt-4 sm:pt-8">
            <AgentList
              planType={planType}
              selectedAgents={selectedAgents}
              toggleAgentSelection={toggleAgentSelection}
            />
            {(selectionMessage || errorMessage) && (
              <div className="absolute left-0 right-0 bottom-1 flex justify-center z-50">
                <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-md shadow-lg transform transition-all duration-300 animate-in fade-in slide-in-from-top-4 border border-white/10 bg-gradient-to-r from-gray-900/90 to-gray-800/90">
                  <p className={`text-xs sm:text-sm font-medium ${errorMessage ? "text-red-400" : "text-blue-400"}`}>
                    {errorMessage || selectionMessage}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="relative w-full mt-auto bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
            <div className="relative w-full max-w-[95%] sm:max-w-[90%] mx-auto py-4 sm:py-6">
              <SelectedAgents selectedAgents={selectedAgents} removeSelectedAgent={removeSelectedAgent} />

              {selectedAgents.length > 0 && (
                <div className="fixed sm:absolute bottom-0 sm:bottom-6 left-0 right-0 sm:left-auto flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-2 sm:gap-6 bg-gray-900/90 sm:bg-gray-900/50 backdrop-blur-sm px-4 sm:px-6 py-3 sm:rounded-full border-t sm:border border-white/10">
                  <div className="text-center sm:text-right">
                    <p className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">Total Amount</p>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      ${calculateTotalPrice(selectedAgents, planType).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={Checkout}
                    disabled={
                      (planType === "Plus" && selectedAgents.length !== 10) ||
                      (planType === "Basic" && selectedAgents.length === 0)
                    }
                    className={`w-full sm:w-auto px-6 py-2 rounded-full border-2 border-white/20 text-white text-sm sm:text-base transition-all duration-300 backdrop-blur-sm ${
                      (planType === "Plus" && selectedAgents.length !== 10) ||
                      (planType === "Basic" && selectedAgents.length === 0)
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-white hover:text-gray-900 hover:border-white"
                    }`}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
      <style jsx>{`
        @layer utilities {
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </Sheet>
  )
}

