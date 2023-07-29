import { Session } from "next-auth"
import Image from "next/image"
import SignUp_StartOrder from "./SignUp_StartOrder"

interface Props {
  session: Session | null
}

export default function HomeHero({ session }: Props) {
  return (
    <section className="relative mx-0 flex min-h-[320px] w-screen items-center justify-center overflow-hidden shadow-lg">
      <Image
        src="/home/hero_v2.png"
        loading="lazy"
        alt="Futuristic City - Generated with Leonardo.ai"
        className="absolute inset-0 h-full w-full object-cover object-center"
        width={1920}
        height={1080}
      />
      {/* Overlay Color */}
      <div className="absolute inset-0 bg-indigo-500/50 mix-blend-multiply"></div>

      {/* Text & Buttons */}
      <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
        <p className="mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8">
          Blazing Fast Food Delivery
        </p>
        <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">
          CyberBites
        </h1>
        <SignUp_StartOrder session={session} />
      </div>
    </section>
  )
}
