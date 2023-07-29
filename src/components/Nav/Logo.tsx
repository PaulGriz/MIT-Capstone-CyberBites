import { Session } from "next-auth"
import Link from "next/link"
import { FaShippingFast } from "react-icons/fa"

interface LogoProps {
  session: Session | null
}

export default function Logo({ session }: LogoProps) {
  return (
    <Link href={session?.user ? "/stores" : "/"} className="flex items-center justify-center">
      <FaShippingFast size={28} className="mr-[8px]" />
      <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
        CyberBite
      </span>
    </Link>
  )
}
