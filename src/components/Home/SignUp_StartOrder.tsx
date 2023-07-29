import { Session } from "next-auth"
import Link from "next/link"
import { IoFastFoodSharp } from "react-icons/io5"
import { PiShootingStarThin } from "react-icons/pi"

interface SignUp_StartOrderProps {
  session: Session | null
}

export default function SignUp_StartOrder({ session }: SignUp_StartOrderProps) {
  if (session?.user) {
    return (
      <Link
        href="/stores"
        className="group inline-block rounded-lg bg-indigo-700 px-6 py-3 text-center text-sm font-semibold text-white ring-1 ring-pink-200/50  transition duration-100 hover:ring-pink-300 focus-visible:ring-2 active:bg-indigo-700 md:text-base"
      >
        Start Order{" "}
        <IoFastFoodSharp
          size={22}
          className="ml-1 inline-block -translate-y-[2px] group-hover:text-pink-300"
        />
      </Link>
    )
  }

  return (
    <Link
      href="/register"
      className="group inline-block rounded-lg bg-indigo-700 px-6 py-3 text-center text-sm font-semibold text-white ring-1 ring-pink-200/50 transition  duration-100 hover:ring-pink-300 focus-visible:ring-2 active:bg-indigo-700 md:text-base"
    >
      Sign Up{" "}
      <PiShootingStarThin size={22} className="ml-1 inline-block group-hover:text-pink-300" />
    </Link>
  )
}
