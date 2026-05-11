import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customer_id } = body

    if (!customer_id) {
      return NextResponse.json(
        { error: "customer_id is required" },
        { status: 400 }
      )
    }

    // ✅ Get all subscriptions of customer
    const subs = await stripe.subscriptions.list({
      customer: customer_id,
      status: "all",
      limit: 1, // latest subscription
    })

    if (subs.data.length === 0) {
      return NextResponse.json({
        recurring: false,
        status: "no_subscription",
        message: "No subscription found for this customer",
      })
    }

    const sub = subs.data[0]

    const isRecurringOn =
      sub.status === "active" || sub.status === "trialing"

    return NextResponse.json({
      success: true,
      subscription_id: sub.id,
      stripe_status: sub.status,
      cancel_at_period_end: sub.cancel_at_period_end,
      current_period_end: null,
      recurring: isRecurringOn,
    })
  } catch (err) {
    console.error("Check subscription error:", err)
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    )
  }
}
