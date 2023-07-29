"use client"

import { CartModal } from "./CartMobile"

export default function FixedCartIcon() {
  return (
    <div className="group fixed bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white p-5 lg:hidden">
      <CartModal />
    </div>
  )
}
