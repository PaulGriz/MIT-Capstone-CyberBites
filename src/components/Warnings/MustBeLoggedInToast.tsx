"use client"

import { toast } from "react-hot-toast"

interface MustBeLoggedInToastProps {
  error: string | string[]
}

export default function MustBeLoggedInToast({ error }: MustBeLoggedInToastProps) {
  if (error) {
    toast.error("You must be logged in to view menu items.")
  }
  return null
}
