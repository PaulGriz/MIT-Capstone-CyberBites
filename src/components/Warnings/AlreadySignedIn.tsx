"use client"

import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SessionProps {
  session: Session
}

export default function AlreadySignedIn({ session }: SessionProps) {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Hello {session?.user?.name}!</h1>
      <p className="my-3">You are already signed in</p>
      <div className="flex flex-row justify-center gap-2">
        <Link href={"/stores"}>
          <Button variant="default" type="button">
            Start Order
          </Button>
        </Link>
        <Button variant="destructive" onClick={() => signOut()} className="">
          Sign Out
        </Button>
      </div>
    </section>
  )
}
