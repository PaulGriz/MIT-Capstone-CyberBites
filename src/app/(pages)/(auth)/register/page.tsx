// ---------------------Libs---------------------
import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
// ---------------------Components---------------------
import CyberVan from "@/components/Images/CyberVan"
import UserAuthForm from "./components/UserRegisterForm"
import AlreadySignedIn from "@/components/Warnings/AlreadySignedIn"

export default async function AuthenticationPage() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <main className="container relative grid h-screen flex-col items-center justify-center md:max-w-none md:grid-cols-2 md:px-0">
      <CyberVan />
      <div className="md:p-2 lg:p-8">
        {session ? (
          <AlreadySignedIn session={session} />
        ) : (
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Create a New Account</h1>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                  Login Here
                </Link>
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
