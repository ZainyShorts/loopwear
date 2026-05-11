// app/api/stripe/revert-cancel/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { subscription_id } = body

    console.log("Revert cancel request received for subscription_id:", subscription_id)
    
    if (!subscription_id) {
      return NextResponse.json(
        { error: "subscription_id is required" },
        { status: 400 }
      )
    }

    // ✅ Revert the cancellation if subscription is still active
    const subscription = await stripe.subscriptions.update(subscription_id, {
      cancel_at_period_end: false,
    })

    return NextResponse.json({
      success: true,
      message: "Subscription cancellation reverted successfully",
      stripe_status: subscription.status,
    })
  } catch (err) {
    console.error("Revert subscription error:", err)
    return NextResponse.json(
      { error: "Failed to revert subscription cancellation" },
      { status: 500 }
    )
  }
}
