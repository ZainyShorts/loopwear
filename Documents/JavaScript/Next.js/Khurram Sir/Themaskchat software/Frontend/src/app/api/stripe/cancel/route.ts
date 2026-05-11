import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { subscription_id } = body

    if (!subscription_id) {
      return NextResponse.json(
        { error: "subscription_id is required" },
        { status: 400 }
      )
    }

    // ✅ Cancel subscription at period end
    const canceledSub = await stripe.subscriptions.update(subscription_id, {
      cancel_at_period_end: true,
    })

    return NextResponse.json({
      success: true,
      message: "Subscription canceled successfully",
      stripe_status: canceledSub.status,
    })
  } catch (err) {
    console.error("Cancel subscription error:", err)
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    )
  }
}
