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

    const subscription = await stripe.subscriptions.retrieve(subscription_id)

    return NextResponse.json({
      success: true,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      plan_type: subscription.items.data[0]?.price?.recurring?.interval || "monthly",

      // ✅ THIS is your "Mar 24"
      current_period_end: null,
    })
  } catch (err) {
    console.error("Fetch subscription error:", err)
    return NextResponse.json(
      { error: "Failed to fetch subscription from Stripe" },
      { status: 500 }
    )
  }
}

