"use client"
// ---------------------Libs---------------------
import Link from "next/link"
import { useState } from "react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
// ---------------------Components---------------------
import { Button } from "@/components/ui/button"
import HamburgerIcon from "./HamburgerIcon"
import Logo from "./Logo"

interface NavbarProps {
  session: Session | null
}

const Navbar = ({ session }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="border-b-2 py-3">
      <div className="z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Navbar */}
        <div className="flex justify-between">
          <Logo session={session} />

          {session?.user ? (
            // --------------------------------
            // If user is logged in
            // --------------------------------

            <Button onClick={() => signOut()} variant="outline">
              Sign Out
            </Button>
          ) : (
            // --------------------------------
            // If user is not logged in
            // --------------------------------
            <>
              {/* Right Side - Mobile */}
              <div className="flex md:hidden">
                <Button type="button" className="mr-2">
                  <Link href={"/register"}>Get started</Link>
                </Button>
                <HamburgerIcon isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
              </div>
              {/* Right Side - Desktop */}
              <div className="hidden w-full items-center justify-between md:flex md:w-auto">
                <Button type="button" className="mr-2">
                  <Link href={"/register"}>Register</Link>
                </Button>
                <Button type="button" variant="outline">
                  <Link href={"/login"}>Log in</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="text-l flex flex-col items-center">
          <Link href={"/"} className="hover:text-purple-900 hover:underline">
            Home
          </Link>
          <hr className="mx-4 my-2 h-[1px] w-[90%] bg-slate-200" />
          <Link href={"/stores"} className="hover:text-purple-900 hover:underline">
            Restaurants
          </Link>
          <hr className="mx-4 my-2 h-[1px] w-[90%] bg-slate-200" />
          <Link href={"/about"} className="hover:text-purple-900 hover:underline">
            About
          </Link>
          <hr className="mx-4 my-2 h-[1px] w-[90%] bg-slate-200" />
          <Link href={"/terms"} className="hover:text-purple-900 hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
