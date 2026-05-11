// app/api/integrations/facebook/login/callback/route.ts
import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

const FACEBOOK_APP_ID = "1137004620654487"
const FACEBOOK_APP_SECRET = "8286a120636222b9810c775a22a1b6c7"

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get("code")
    const stateParam = url.searchParams.get("state")

    console.log('trigger oauth in console ')

    if (!code) {
      return NextResponse.json({ error: "Missing code parameter" }, { status: 400 })
    }

    // Decode state to get redirect page
    let redirectTo = "/"
    if (stateParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(stateParam))
        if (parsed.next) redirectTo = parsed.next
      } catch (err) {
        console.error("Failed to parse state:", err)
      }
    }

    // Exchange code for access token
    const tokenRes = await axios.get(
      `https://graph.facebook.com/v20.0/oauth/access_token`,
      {
        params: {
          client_id: FACEBOOK_APP_ID,
          client_secret: FACEBOOK_APP_SECRET,
          redirect_uri:
            "https://l8wlljm3-3000.inc1.devtunnels.ms/api/integrations/facebook/login/callback/",
          code,
        },
      }
    )

    const accessToken = tokenRes.data.access_token

    // TODO: Save accessToken in your DB / backend associated with the user
    console.log("Facebook Access Token-:", accessToken)

    // Redirect user to the page specified in state
    return NextResponse.redirect(redirectTo)
  } catch (err) {
    console.error("Facebook OAuth callback error:", err)
    return NextResponse.json(
      { error: "Failed to handle Facebook OAuth callback" },
      { status: 500 }
    )
  }
}
