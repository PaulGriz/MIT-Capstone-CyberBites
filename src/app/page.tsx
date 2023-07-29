// ---------------------Libs---------------------
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
// ---------------------Components---------------------
import HomeHero from "@/components/Home/HomeHero"
import HomeFeatures from "@/components/Home/HomeFeatures"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center px-20">
      <HomeHero session={session} />
      {/* <HomeFeaturedItems /> */}
      <HomeFeatures session={session} />
    </main>
  )
}
