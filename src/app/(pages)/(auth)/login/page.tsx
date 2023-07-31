// ---------------------Libs---------------------
import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
// ---------------------Components---------------------
import UserAuthForm from "./components/UserLoginForm"
import CyberVan from "@/components/Images/CyberVan"
import AlreadySignedIn from "@/components/Warnings/AlreadySignedIn"
import MustBeLoggedInToast from "@/components/Warnings/MustBeLoggedInToast"

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function AuthenticationPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  return (
    <main className="container relative grid h-screen flex-col items-center justify-center md:max-w-none md:grid-cols-2 md:px-0">
      <CyberVan />
      <div className="md:p-2 lg:p-8">
        {session ? (
          <AlreadySignedIn session={session} />
        ) : (
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {searchParams?.callbackUrl && <MustBeLoggedInToast error={searchParams.callbackUrl} />}

            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>

              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                  Sign Up
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
