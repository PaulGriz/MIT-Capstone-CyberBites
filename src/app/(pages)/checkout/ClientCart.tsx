"use client"

import useCartStore from "@/state/cart"

interface clientCartProps {
  stripeProducts: any
}

export default function ClientCart({ stripeProducts }: clientCartProps) {
  const cart = useCartStore((state) => state.cart)
  return (
    <div>
      <p></p>
    </div>
  )
}
