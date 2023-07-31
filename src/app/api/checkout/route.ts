import { NextResponse, NextRequest } from "next/server"
import Stripe from "stripe"

const BASE_URL = process.env.BASE_URL

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
})

export async function POST(req: NextRequest) {
  const line_items = await req.json()
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${BASE_URL}/checkout/?success=true`,
      cancel_url: `${BASE_URL}/checkout/?canceled=true`,
    })
    return new NextResponse(JSON.stringify(session), { status: 200 })
  } catch (error: any) {
    console.log(error)
    return new NextResponse(error, {
      status: 400,
    })
  }
}
