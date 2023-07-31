import RestaurantList from "./components/RestaurantList"
import { getAllRestaurants } from "@/lib/cachedUtils"

const RestaurantsPage = async () => {
  const restaurants = await getAllRestaurants()

  if (!restaurants) {
    return <div>Loading...</div>
  }

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center">
      <h1 className="mb-2 mt-5 text-2xl font-bold">Restaurants</h1>
      {restaurants.length > 0 && <RestaurantList restaurants_list={restaurants} />}
    </main>
  )
}

export default RestaurantsPage
