import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const imageUrl = searchParams.get("url")

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 })
  }

  try {
    const imageResponse = await fetch(imageUrl)

    if (!imageResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
    }

    const imageBuffer = await imageResponse.arrayBuffer()

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="marketing-image.png"',
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Download failed" }, { status: 500 })
  }
}
