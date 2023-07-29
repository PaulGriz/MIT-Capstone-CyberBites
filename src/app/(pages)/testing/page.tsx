import { FaShoppingCart } from "react-icons/fa"
import Link from "next/link"
import { Restaurant } from "@/types"

export default async function TestingPage() {
  try {
    const res = await fetch("http://localhost:3000/api/restaurants")
    const restaurants = await res.json()
    console.log(restaurants)
  } catch (error) {
    console.error(error)
  }
  return (
    <main className="mx-10 grid h-full place-items-center gap-2 pb-20">
      {/* {restaurants && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Restaurants</h1>
          <div className="flex flex-col items-center justify-center">
            {restaurants.map((restaurant: Restaurant) => (
              <div key={restaurant.id}>
                <Link href={`/restaurants/${restaurant.id}`}>
                  <a className="my-2 flex w-full flex-row items-center justify-between rounded-md border p-2 hover:bg-gray-100">
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                      <p className="text-sm text-gray-500">{restaurant.address}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <FaShoppingCart className="text-xl text-gray-500" />
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </main>
  )
}
