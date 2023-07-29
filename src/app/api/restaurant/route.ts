import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") as string
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    include: {
      MenuItems: true,
    },
  })
  return NextResponse.json(restaurant)
}
