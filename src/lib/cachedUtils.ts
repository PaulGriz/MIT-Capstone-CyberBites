import { cache } from "react"
import { Restaurant } from "@/types"

// ---------------------FOR LOCAL DEVELOPMENT---------------------
// Added the {cache: "no-cache"} option to fetch calls to prevent browser caching.
// EXAMPLE:
// const res = await fetch(`${process.env.BASE_URL}/api/restaurants`, {cache: "no-cache"})

export const getRestaurantWithSlug = cache(async (slug: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/restaurant?slug=${encodeURIComponent(slug)}`)
  const restaurant = await res.json()
  return restaurant
})

export const getAllRestaurants = cache(async (): Promise<Restaurant[]> => {
  const res = await fetch(`${process.env.BASE_URL}/api/restaurants`)
  const restaurants = await res.json()
  return restaurants
})
