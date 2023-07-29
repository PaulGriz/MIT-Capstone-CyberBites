import Image from "next/image"
import { MenuItem } from "@/types"
import AddToCart from "./AddToCart"

interface MenuItemCardProps {
  item: MenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="row-auto mx-auto grid w-[9/10] max-w-[500px] grid-cols-1 place-items-center rounded bg-slate-100 px-4 py-3 md:max-w-[700px] md:grid-cols-[310px_1fr] md:pr-8 lg:grid-cols-[270px_1fr] xl:grid-cols-[310px_1fr]">
      <Image
        className="my-2 rounded object-fill sm:object-cover md:col-start-1 md:row-span-4 md:my-0 md:mr-6 md:h-[300px] md:w-[300px] lg:h-[260px] lg:w-[260px] xl:h-[300px] xl:w-[300px]"
        src={item.image}
        alt={item.name}
        width={250}
        height={250}
        priority
      />

      <p className="row-start-1 mt-2 text-2xl font-semibold md:col-start-2">{item.name}</p>
      <p className="mb-2 mt-1 md:col-start-2">{item.description}</p>
      <div className="mb-2 flex w-full justify-between md:col-start-2">
        <p>Price: ${item.price}</p>
        <p className="italic">{item.calories} cal</p>
      </div>
      <AddToCart item={item} />
    </div>
  )
}
