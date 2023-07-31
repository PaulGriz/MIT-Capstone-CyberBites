// ---------------------Libs---------------------
import { FC } from "react"
import Link from "next/link"
// ---------------------Types---------------------
import { MenuItem } from "@/types"
// ---------------------Utils---------------------
import { getRestaurantWithSlug } from "@/lib/cachedUtils"
// ---------------------Icons---------------------
import { BsArrowLeftShort, BsFillBuildingFill } from "react-icons/bs"
import { IoCallSharp } from "react-icons/io5"
import { TfiNewWindow } from "react-icons/tfi"
// ---------------------Components---------------------
import DescriptionClick from "./components/DescriptionWithClamp"
import MenuItemCard from "./components/MenuItemCard"
import CartXL from "@/components/Carts/CartDesktop"
import FixedCartIcon from "@/components/Carts/FixedCartIcon"

interface PageProps {
  params: {
    store_slug: string
  }
}

const StorePage: FC<PageProps> = async ({ params }) => {
  const restaurant = await getRestaurantWithSlug(params.store_slug)

  if (!restaurant) {
    return <div>4Error: No Restaurants Found. Please try again...</div>
  }
  const { name, address, phone, MenuItems, description } = restaurant

  return (
    <main className="flex w-full flex-col items-center justify-center">
      {/* HERO Section */}
      <section className="flex w-full max-w-[750px] flex-col items-center px-6 py-4 lg:max-w-[800px] xl:max-w-[950px]">
        {/* Top Row - Buttons */}
        <div className="flex w-full flex-row items-center justify-between px-4">
          <Link
            href={"/stores"}
            className="inline-flex items-center rounded px-3 py-2 text-center text-sm font-medium text-blue-500 outline-blue-500 ring-2 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <BsArrowLeftShort size={22} className="mr-1" /> Go Back
          </Link>
          <div className="flex flex-col">
            <div className="inline-flex items-center">
              <BsFillBuildingFill size={18} className="mr-1 text-blue-800/90" />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-800 hover:text-blue-700 hover:underline"
              >
                Location
                <TfiNewWindow size={12} className="mb-4 ml-1" />
              </a>
            </div>
            <div className="inline-flex items-center">
              <IoCallSharp size={18} className="mr-1 text-blue-800/90" />
              <a
                href={`tel:${phone}`}
                className="text-blue-800 hover:text-blue-700 hover:underline"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
        {/* Second Row - Name */}
        <div>
          <h1 className="mt-4 text-2xl font-semibold sm:text-3xl lg:mt-2">{name}</h1>
        </div>
        {/* Third Row - Description */}
        <DescriptionClick description={description} />
      </section>
      {/* TODO: Edit the Max W */}
      <hr className="w-[90%] max-w-[1000px]" />
      {/* Menu Items Section */}
      <section className="w-full lg:flex lg:flex-row lg:justify-center">
        <ul className="grid-col-1 grid gap-3 p-5">
          {MenuItems.map((item: MenuItem) => (
            <li key={item.id}>
              <MenuItemCard item={item} />
            </li>
          ))}
        </ul>
        <div className="pb-5 pr-2 pt-5">
          <CartXL />
        </div>
      </section>
      <FixedCartIcon />
    </main>
  )
}

export default StorePage
