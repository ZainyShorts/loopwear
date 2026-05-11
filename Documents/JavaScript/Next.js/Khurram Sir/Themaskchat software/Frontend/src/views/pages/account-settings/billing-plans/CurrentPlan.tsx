"use client"

import { useEffect, useState } from "react"
import { format, parseISO, differenceInDays } from "date-fns"
import { getBaseUrl } from "../../../../api/vars/vars"


interface Payment {
  stripe_payment_intent_id: string
  amount: number
  currency: string
  status: "succeeded" | "processing" | "requires_payment_method" | "canceled"
  email: string
  created_at: string
}

interface Subscription {
  stripe_subscription_id: string
  plan_type: string
  status: "active" | "past_due" | "canceled" | "unpaid" | "incomplete"
  current_period_end: string
}

interface TransactionDetailsResponse {
  email: string
  subscription_status: "active" | "inactive" | "canceled" | "past_due"
  payments: Payment[]
  subscriptions: Subscription[]
  stripe_customer_id?: string
}

// Add interface for Stripe subscription check
interface StripeSubscriptionCheck {
  recurring: boolean
  status: string
  subscription_id: string
  cancel_at_period_end: boolean
  current_period_end: string
}

// Status badge component with theme colors
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    const configs: { [key: string]: { bg: string; text: string; dot: string } } = {
      active: { bg: "#30334A", text: "#FFFFFF", dot: "#FFDB1A" },
      succeeded: { bg: "#30334A", text: "#FFFFFF", dot: "#FFDB1A" },
      past_due: { bg: "#30334A", text: "#FFDB1A", dot: "#FFDB1A" },
      canceled: { bg: "#30334A", text: "#FF0000", dot: "#FF0000" },
      processing: { bg: "#30334A", text: "#00BFFF", dot: "#00BFFF" },
      incomplete: { bg: "#30334A", text: "#FFA500", dot: "#FFA500" },
      inactive: { bg: "#30334A", text: "#808080", dot: "#808080" },
      no_subscription: { bg: "#30334A", text: "#808080", dot: "#808080" },
      "active (canceling)": { bg: "#30334A", text: "#FFDB1A", dot: "#FFDB1A" },
      "canceled (active until expiry)": { bg: "#30334A", text: "#FFDB1A", dot: "#FFDB1A" },
    }
    return configs[status] || { bg: "#30334A", text: "#FFFFFF", dot: "#FFDB1A" }
  }

  const config = getStatusConfig(status)

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: "9999px",
        fontSize: "0.625rem",
        fontWeight: 500,
        backgroundColor: config.bg,
        color: config.text,
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: config.dot,
        }}
      />
      {status.toUpperCase()}
    </span>
  )
}

// Stat Card component
const StatCard = ({ title, value, subValue, icon }: { title: string; value: any; subValue?: string; icon: string }) => (
  <div
    style={{
      backgroundColor: "#1F1F33",
      border: "1px solid #30334A",
      borderRadius: "12px",
      padding: "20px",
      color: "#FFFFFF",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
      <div>
        <p style={{ fontSize: "0.875rem", color: "#FFDB1A", marginBottom: "4px" }}>{title}</p>
        <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>{value}</div>
        {subValue && <p style={{ fontSize: "0.75rem", color: "#FFDB1A", marginTop: "4px" }}>{subValue}</p>}
      </div>
      <div
        style={{
          padding: "8px",
          borderRadius: "8px",
          backgroundColor: "#30334A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i className={`${icon} text-xl`} style={{ color: "#FFDB1A" }} />
      </div>
    </div>
  </div>
)

// Info Banner Component
const InfoBanner = ({ message, type }: { message: string; type: "warning" | "info" | "success" }) => {
  const colors = {
    warning: { bg: "rgba(255, 219, 26, 0.1)", border: "#FFDB1A", text: "#FFDB1A" },
    info: { bg: "rgba(0, 191, 255, 0.1)", border: "#00BFFF", text: "#00BFFF" },
    success: { bg: "rgba(40, 167, 69, 0.1)", border: "#28a745", text: "#28a745" }
  }

  const color = colors[type]

  return (
    <div style={{
      backgroundColor: color.bg,
      border: `1px solid ${color.border}`,
      borderRadius: "8px",
      padding: "16px",
      margin: "0 24px 24px 24px",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }}>
      <i className={`tabler-${type === "warning" ? "alert-triangle" : type === "info" ? "info-circle" : "circle-check"}`} 
         style={{ color: color.text, fontSize: "1.25rem" }} />
      <p style={{ color: color.text, margin: 0, fontSize: "0.875rem" }}>{message}</p>
    </div>
  )
}

const CurrentPlan = () => {
  const [transactionData, setTransactionData] = useState<TransactionDetailsResponse | null>(null)
  const [stripeSubscription, setStripeSubscription] = useState<StripeSubscriptionCheck | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showRenewModal, setShowRenewModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

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

      const result: TransactionDetailsResponse = await response.json()
      console.log("Transaction Data: 000000000", result)
      setTransactionData(result)

      if (result.stripe_customer_id) {
        console.log("Checking Stripe subscription for customer ID from transaction details:", result.stripe_customer_id)
        await checkStripeSubscription(result.stripe_customer_id)
      }else{
        console.log("No Stripe customer ID found in transaction details.")
      }

      setError(null)
    } catch (err) {
      console.error("Error fetching transaction details:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch transaction details")
    } finally {
      setLoading(false)
    }
  }

  const checkStripeSubscription = async (customerId: string) => {
    try {
      const response = await fetch(`/api/stripe/check-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id: customerId }),
      })

      if (!response.ok) {
        throw new Error("Failed to check subscription")
      }

      const data = await response.json()
      console.log("Stripe subscription data:", data)
      setStripeSubscription(data)
    } catch (err) {
      console.error("Error checking Stripe subscription:", err)
    }
  }

  const cancelSubscription = async () => {
    try {
      setActionLoading(true)
      const authToken = localStorage.getItem("auth_token")
      if (!authToken) throw new Error("No auth token")

      const subscriptionId = stripeSubscription?.subscription_id || 
                            activeSubscription?.stripe_subscription_id

      if (!subscriptionId) {
        throw new Error("No subscription ID found")
      }

      console.log("Canceling subscription with ID:", subscriptionId)

      const res = await fetch(`/api/stripe/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription_id: subscriptionId,
        }),
      })

      if (!res.ok) throw new Error("Failed to cancel subscription")

      alert("Your subscription has been canceled successfully. You will have access until the end of your billing period.")
      
      await fetchTransactionDetails()
      setShowCancelModal(false)
    } catch (err) {
      alert("Error canceling subscription: " + (err instanceof Error ? err.message : "Unknown error"))
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  const reactivateSubscription = async (subscriptionId: string) => {
    try {
      setActionLoading(true)
      const authToken = localStorage.getItem("auth_token")
      if (!authToken) throw new Error("No auth token")


      if (!subscriptionId) {
        throw new Error("No subscription ID found. Please contact support.")
      }

      console.log("Reactivating subscription with ID:", subscriptionId)

      const res = await fetch(`/api/stripe/revert-cancel`, {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription_id: subscriptionId,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error("Failed to reactivate subscription:", errorData)
      }
      
      const responseData = await res.json()
      console.log("Reactivate response:", responseData)
      
      // alert("Your subscription has been reactivated successfully!")
      
      await fetchTransactionDetails()
      setShowRenewModal(false)
    } catch (err) {
      console.error(err)
      alert("Error reactivating subscription: " + (err instanceof Error ? err.message : "Unknown error"))
    } finally {
      setActionLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactionDetails()
  }, [])

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#1F1F33",
          border: "1px solid #30334A",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 0" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid #30334A",
              borderTop: "4px solid #FFDB1A",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ marginTop: "16px", color: "#FFDB1A" }}>Loading subscription details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "#1F1F33",
          border: "1px solid #30334A",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(255, 219, 26, 0.1)",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <i className="tabler-alert-circle text-2xl" style={{ color: "#FF0000" }} />
          <div>
            <p style={{ fontWeight: 500, color: "#FF0000" }}>Error loading data</p>
            <p style={{ fontSize: "0.875rem", color: "#FFDB1A" }}>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!transactionData) {
    return (
      <div
        style={{
          backgroundColor: "#1F1F33",
          border: "1px solid #30334A",
          borderRadius: "12px",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <div style={{ padding: "48px 0" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 16px",
              backgroundColor: "#30334A",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="tabler-receipt text-3xl" style={{ color: "#FFDB1A" }} />
          </div>
          <p style={{ color: "#FFDB1A" }}>No transaction data available</p>
        </div>
      </div>
    )
  }

  const now = new Date()
  
  // Find subscriptions - including canceled ones that might be reactivated
  const activeSubscription = transactionData.subscriptions.find((sub) => {
    const periodEnd = sub.current_period_end ? parseISO(sub.current_period_end) : null
    return sub.status === "active" || (sub.status === "canceled" && periodEnd && periodEnd > now)
  })

  // Find any canceled subscription that might be reactivated (even if expired)
  const canceledSubscription = transactionData.subscriptions.find((sub) => 
    sub.status === "canceled"
  )

  console.log("Active Subscription:", activeSubscription)
  console.log("Canceled Subscription:", canceledSubscription)

  const periodEnd = activeSubscription?.current_period_end
    ? parseISO(activeSubscription.current_period_end)
    : stripeSubscription?.current_period_end 
      ? parseISO(stripeSubscription.current_period_end as string)
      : null

  // Determine status based on Stripe data first, then API response
  let subscriptionStatus = transactionData.subscription_status
  
  if (stripeSubscription) {
    if (stripeSubscription.status === "no_subscription") {
      subscriptionStatus = "inactive"
    } else if (stripeSubscription.recurring && !stripeSubscription.cancel_at_period_end) {
      subscriptionStatus = "active"
    } else if (stripeSubscription.cancel_at_period_end) {
      subscriptionStatus = "canceled"
    } else if (!stripeSubscription.recurring) {
      subscriptionStatus = "inactive"
    }
  }

  const isFullyActive = subscriptionStatus === "active"
  const isCanceled = subscriptionStatus === "canceled"
  const isInactive = subscriptionStatus === "inactive"
  const isPastDue = subscriptionStatus === "past_due"

  // Check if canceled subscription is still within billing period
  const isCanceledButActive = isCanceled && periodEnd && periodEnd > now
  const isExpired = isInactive || (isCanceled && periodEnd && periodEnd <= now)

  // Check if subscription is set to cancel at period end
  const isSetToCancel = stripeSubscription?.cancel_at_period_end || false

  // Get days remaining
  const daysRemaining = periodEnd ? Math.max(0, differenceInDays(periodEnd, now)) : 0

  // Get subscription ID for actions - prefer active, but fall back to canceled
  const subscriptionId = stripeSubscription?.subscription_id || 
                        activeSubscription?.stripe_subscription_id ||
                        canceledSubscription?.stripe_subscription_id

  // Determine if we have a subscription that can be reactivated
  const canReactivate = (isCanceledButActive || isSetToCancel || isExpired) && subscriptionId

  return (
    <>
      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#1F1F33",
              borderRadius: "12px",
              padding: "24px",
              width: "90%",
              maxWidth: "420px",
              border: "1px solid #30334A",
            }}
          >
            <h3 style={{ color: "#FFDB1A", marginBottom: "12px", fontSize: "1.25rem", fontWeight: 600 }}>
              Cancel Subscription?
            </h3>

            <p style={{ color: "#FFFFFF", fontSize: "0.875rem", marginBottom: "16px" }}>
              Are you sure you want to cancel your subscription?
            </p>

            <div style={{ 
              backgroundColor: "rgba(255, 219, 26, 0.1)", 
              padding: "12px", 
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #30334A"
            }}>
              <p style={{ color: "#FFDB1A", fontSize: "0.8rem", margin: 0 }}>
                ⚠ Your account will remain active until {periodEnd ? format(periodEnd, "MMMM dd, yyyy") : "the end of your billing cycle"}.
                After that date, your subscription will be deactivated.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                onClick={() => setShowCancelModal(false)}
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  border: "1px solid #30334A",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#30334A"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                No, Keep Plan
              </button>
              
             
              <button
                onClick={cancelSubscription}
                disabled={actionLoading || !subscriptionId}
                style={{
                  backgroundColor: "#FF0000",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: (actionLoading || !subscriptionId) ? "not-allowed" : "pointer",
                  fontSize: "0.875rem",
                  opacity: (actionLoading || !subscriptionId) ? 0.5 : 1,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!actionLoading && subscriptionId) {
                    e.currentTarget.style.backgroundColor = "#CC0000"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!actionLoading && subscriptionId) {
                    e.currentTarget.style.backgroundColor = "#FF0000"
                  }
                }}
              >
                {actionLoading ? "Cancelling..." : !subscriptionId ? "No ID Found" : "Yes, Cancel"}
              </button>
                
            </div>
          </div>
        </div>
      )}

      {/* Reactivate Confirmation Modal */}
      {showRenewModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#1F1F33",
              borderRadius: "12px",
              padding: "24px",
              width: "90%",
              maxWidth: "420px",
              border: "1px solid #30334A",
            }}
          >
            <h3 style={{ color: "#FFDB1A", marginBottom: "12px", fontSize: "1.25rem", fontWeight: 600 }}>
              Reactivate Subscription?
            </h3>

            <p style={{ color: "#FFFFFF", fontSize: "0.875rem", marginBottom: "16px" }}>
              Would you like to reactivate your subscription?
            </p>

            {periodEnd && periodEnd > now ? (
              <div style={{ 
                backgroundColor: "rgba(40, 167, 69, 0.1)", 
                padding: "12px", 
                borderRadius: "8px",
                marginBottom: "20px",
                border: "1px solid #28a745"
              }}>
                <p style={{ color: "#28a745", fontSize: "0.8rem", margin: 0 }}>
                  ✓ Your subscription will be reactivated immediately and you won&apos;t lose access.
                </p>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: "rgba(255, 219, 26, 0.1)", 
                padding: "12px", 
                borderRadius: "8px",
                marginBottom: "20px",
                border: "1px solid #FFDB1A"
              }}>
                <p style={{ color: "#FFDB1A", fontSize: "0.8rem", margin: 0 }}>
                  ⚠ Your subscription has expired. Reactivating will start billing cycle.
                </p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                onClick={() => setShowRenewModal(false)}
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  border: "1px solid #30334A",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#30334A"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => reactivateSubscription(canceledSubscription!.stripe_subscription_id)}
                disabled={actionLoading || !subscriptionId}
                style={{
                  backgroundColor: "#28a745",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: (actionLoading || !subscriptionId) ? "not-allowed" : "pointer",
                  fontSize: "0.875rem",
                  opacity: (actionLoading || !subscriptionId) ? 0.5 : 1,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!actionLoading && subscriptionId) {
                    e.currentTarget.style.backgroundColor = "#218838"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!actionLoading && subscriptionId) {
                    e.currentTarget.style.backgroundColor = "#28a745"
                  }
                }}
              >
                {actionLoading ? "Reactivating..." : !subscriptionId ? "No ID Found" : "Yes, Reactivate"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Current Subscription Card */}
        <div style={{ backgroundColor: "#1F1F33", border: "1px solid #30334A", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ 
            padding: "24px", 
            borderBottom: "1px solid #30334A", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            backgroundColor: "#1F1F33"
          }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#FFDB1A" }}>Current Plan</h2>

            {/* Current Subscription Buttons */}

     {
      canceledSubscription?.status != "canceled" && (

      
      <button
        onClick={() => setShowCancelModal(true)}
        disabled={actionLoading}
        style={{
          backgroundColor: "#FF0000",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "8px",
          padding: "8px 16px",
          cursor: actionLoading ? "not-allowed" : "pointer",
          fontSize: "0.875rem",
          fontWeight: 500,
          opacity: actionLoading ? 0.5 : 1,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!actionLoading) e.currentTarget.style.backgroundColor = "#CC0000"
        }}
        onMouseLeave={(e) => {
          if (!actionLoading) e.currentTarget.style.backgroundColor = "#FF0000"
        }}
      >
        {actionLoading ? "Processing..." : "Cancel Plan"}
      </button>
   )
     }
       {
      canceledSubscription?.status == "canceled" && (

      
      <button
        onClick={() => setShowRenewModal(true)}
        disabled={actionLoading || !subscriptionId}
        style={{
          backgroundColor: "#28a745",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "8px",
          padding: "8px 16px",
          cursor: actionLoading ? "not-allowed" : "pointer",
          fontSize: "0.875rem",
          fontWeight: 500,
          opacity: actionLoading ? 0.5 : 1,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!actionLoading) e.currentTarget.style.backgroundColor = "#218838"
        }}
        onMouseLeave={(e) => {
          if (!actionLoading) e.currentTarget.style.backgroundColor = "#28a745"
        }}
      >
        {actionLoading ? "Processing..." : "Reactivate Plan"}
      </button>
      )}
   



            {/* If no subscription ID but we have transaction data, show contact support */}
            {!subscriptionId && transactionData.subscriptions.length > 0 && (
              <button
                onClick={() => alert("Please contact support to reactivate your subscription.")}
                style={{
                  backgroundColor: "#808080",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                Contact Support
              </button>
            )}
          </div>

          {/* Show appropriate message based on subscription status */}
          {isSetToCancel && (
            <InfoBanner 
              message={`Your subscription is scheduled to cancel on ${periodEnd ? format(periodEnd, "MMMM dd, yyyy") : "the end of your billing cycle"}. You can reactivate it before then to maintain uninterrupted access.`}
              type="warning"
            />
          )}

          {isCanceledButActive && (
            <InfoBanner 
              message={`Your subscription has been canceled and will expire on ${periodEnd ? format(periodEnd, "MMMM dd, yyyy") : "the end of your billing cycle"}. You can reactivate it before then to maintain uninterrupted access.`}
              type="warning"
            />
          )}

          {isExpired && subscriptionId && (
            <InfoBanner 
              message="Your subscription has expired. You can reactivate it to start a new billing cycle."
              type="info"
            />
          )}

          {isPastDue && (
            <InfoBanner 
              message="Your payment is past due. Please update your payment method to avoid service interruption."
              type="warning"
            />
          )}

          {!subscriptionId && transactionData.subscriptions.length > 0 && (
            <InfoBanner 
              message="Subscription ID not found. Please contact support to manage your subscription."
              type="warning"
            />
          )}

          {transactionData.subscriptions.length > 0 ? (
            <div style={{ 
              padding: "24px", 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
              gap: "16px",
              backgroundColor: "#1F1F33"
            }}>
              <StatCard
                title="Plan Type"
                value={
                  activeSubscription?.plan_type
                    ? activeSubscription.plan_type.charAt(0).toUpperCase() +
                      activeSubscription.plan_type.slice(1)
                    : canceledSubscription?.plan_type
                      ? canceledSubscription.plan_type.charAt(0).toUpperCase() +
                        canceledSubscription.plan_type.slice(1)
                      : "Monthly"
                }
                icon="tabler-crown"
              />

              <StatCard
                title="Status"
                value={
                  <StatusBadge 
                    status={
                      isSetToCancel 
                        ? "active (canceling)" 
                        : isCanceledButActive 
                          ? "canceled (active until expiry)" 
                          : isPastDue 
                            ? "past due" 
                            : isExpired
                              ? "expired"
                              : subscriptionStatus
                    } 
                  />
                }
                icon="tabler-circle-check"
              />

              {periodEnd && (
                <StatCard
                  title={isSetToCancel || isCanceledButActive ? "Access Until" : "Next Billing Date"}
                  value={format(periodEnd, "MMM dd, yyyy")}
                  subValue={format(periodEnd, "hh:mm a")}
                  icon="tabler-calendar"
                />
              )}

              {periodEnd && (
                <StatCard
                  title="Days Remaining"
                  value={daysRemaining}
                  subValue={isSetToCancel || isCanceledButActive ? "until expiration" : "in current billing cycle"}
                  icon="tabler-clock"
                />
              )}
            </div>
          ) : (
            <div style={{ 
              padding: "48px 24px", 
              color: "#FFDB1A",
              textAlign: "center",
              backgroundColor: "#1F1F33"
            }}>
              <i className="tabler-alert-circle text-4xl" style={{ marginBottom: "12px", opacity: 0.5 }} />
              <p>No subscription found</p>
              <button
                onClick={() => {
                  window.location.href = "/pricing"
                }}
                style={{
                  backgroundColor: "#FFDB1A",
                  color: "#1F1F33",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  marginTop: "16px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFE55C"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFDB1A"
                }}
              >
                Purchase Plan
              </button>
            </div>
          )}
        </div>

        {/* Add this style tag for animations */}
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  )
}

export default CurrentPlan
