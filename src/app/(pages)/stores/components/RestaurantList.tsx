"use client"

// ---------------------Libs---------------------
import { FC, useEffect, useState, useTransition } from "react"
// ---------------------Components---------------------
import RestaurantCard from "./RestaurantCard"
import SearchBar from "./SearchBar"
// ---------------------Types---------------------
import { Restaurant } from "@/types"

interface SearchFilterProps {
  restaurants_list: Restaurant[]
}

const RestaurantList: FC<SearchFilterProps> = ({ restaurants_list }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [restaurants, setRestaurants] = useState(restaurants_list)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (searchTerm === "") {
      setRestaurants(restaurants_list)
    } else {
      startTransition(() => {
        setRestaurants(() =>
          restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      })
    }
  }, [searchTerm, restaurants, restaurants_list])

  return (
    <section className="w-full px-8">
      <div className="mb-5 mt-2 flex w-full justify-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="grid grid-cols-1 place-items-center gap-4 store_sm:grid-cols-2 store_md:grid-cols-3 store_md:gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            id={restaurant.id}
            slug={restaurant.slug}
            name={restaurant.name}
            description={restaurant.description}
            tag_line={restaurant.tag_line}
            image={restaurant.image}
          />
        ))}
      </div>
    </section>
  )
}

export default RestaurantList
