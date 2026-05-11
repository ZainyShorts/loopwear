"use client"

import { getBaseUrl } from "@/api/vars/vars"
import { useEffect, useState } from "react"

interface StripeSubscriptionCheck {
  recurring: boolean
  status: string
  subscription_id: string
  cancel_at_period_end: boolean
  current_period_end: string
}

export default function SubscriptionWarningBanner() {
  const [subscription, setSubscription] = useState<string>('null')
  const [subscription_id, setSubscriptionId] = useState<string>('null')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  const fetchTransactionDetails = async () => {
      try {
        setLoading(true)
        const authToken = localStorage.getItem("auth_token")
  
        if (!authToken) {
          throw new Error("No authentication token found")
        }
  
        const response = await fetch(`${getBaseUrl()}transactions/transactions_details/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        })
  
        if (response.status === 401) {
          window.location.href = "/en/login"
          return
        }
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
  
        const result: any = await response.json()
        console.log("Transaction details: wrapper ", result)
        if (result && result.subscriptions && result.subscriptions.length > 0) {
            console.log("Subscription details found in transaction response:", result.subscriptions[0])
          setSubscription(result.subscriptions[0].status) // Assuming the first subscription is the relevant one
          setSubscriptionId(result.subscriptions[0].stripe_subscription_id)
        }
  
        setError(null)
      } catch (err) {
        console.error("Error fetching transaction details:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch transaction details")
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchTransactionDetails()
  }, [])

  const reactivateSubscription = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem("auth_token")
      if (!token || !subscription_id) return

      const res = await fetch("/api/stripe/revert-cancel", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription_id: subscription_id,
        }),
      })

      if (!res.ok) throw new Error("Failed to reactivate")

      await fetchTransactionDetails()
    } catch (err) {
      console.error(err)
      alert("Failed to reactivate subscription")
    } finally {
      setLoading(false)
    }
  }

  // ❗ Only show if user cancelled but still has time
 
if (subscription_id && subscription === "canceled") {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 shadow-md rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 z-50">
      
      {/* Left Content */}
      <div className="flex items-start gap-3">
        <div className="text-yellow-600 text-xl">⚠️</div>
        <div className="text-sm md:text-base text-yellow-900 leading-relaxed">
          <span className="font-semibold">Subscription inactive.</span>{" "}
          If not reactivated, it will be automatically cancelled at the end of your billing period.
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={reactivateSubscription}
        disabled={loading}
        className="self-start md:self-auto px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 transition-all duration-200 text-white rounded-lg text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Reactivating..." : "Reactivate Now"}
      </button>
    </div>
  )
} else {
  return null
}
}
