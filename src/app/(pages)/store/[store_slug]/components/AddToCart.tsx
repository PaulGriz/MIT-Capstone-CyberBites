"use client"

import { MenuItem } from "@/types"
import { AiOutlinePlus } from "react-icons/ai"
import useCartStore from "@/state/cart"

interface AddToCartProps {
  item: MenuItem
}

export default function AddToCart({ item }: AddToCartProps) {
  const addItemToCart = useCartStore((state) => state.addItemToCart)
  return (
    <button
      className="mb-[2px] flex flex-row items-center gap-1 rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-700 md:col-start-2"
      onClick={() => addItemToCart(item)}
    >
      <AiOutlinePlus />
      Add to Cart
    </button>
  )
}
