"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="grid h-screen w-screen place-items-center">
      <div className="flex flex-col justify-center">
        <h1 className="mb-1 text-center font-mono text-3xl font-semibold">Error 404</h1>
        <p className="mb-3 text-center text-xl text-muted-foreground">Page Not Found</p>
        <Button type="button" className="">
          <Link href={"/"}>Go Home</Link>
        </Button>
      </div>
    </main>
  )
}
