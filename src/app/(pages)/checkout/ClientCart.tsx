"use client"

import useCartStore from "@/state/cart"

interface ClientCartProps {
  stripeProducts: any
}

export default function ClientCart({ stripeProducts }: ClientCartProps) {
  const cart = useCartStore((state) => state.cart)
  return (
    <div>
      <p></p>
    </div>
  )
}
