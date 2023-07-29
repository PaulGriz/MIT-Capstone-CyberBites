// ---------------------Libs---------------------
import { Session } from "next-auth"
// ---------------------Icons---------------------
import { AiFillFire } from "react-icons/ai"
import { LuUserCheck } from "react-icons/lu"
import { FaFlagCheckered } from "react-icons/fa"
import { SiStarship } from "react-icons/si"
import { IoPizza } from "react-icons/io5"
// ---------------------Components---------------------
import SignUp_StartOrder from "./SignUp_StartOrder"

interface Props {
  session: Session | null
}

export default function HomeFeatures({ session }: Props) {
  return (
    <section className="body-font w-screen text-gray-600">
      <div className="mx-auto w-full max-w-[530px] px-8 py-10 sm:max-w-[600px] md:max-w-[700px]">
        <div className="mx-auto mb-10 flex flex-col items-center border-b border-gray-200 pb-10 sm:flex-row">
          <div className="inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 sm:mr-10 sm:h-32 sm:w-32">
            <SiStarship size={24} className="h-10 w-10 sm:h-16 sm:w-16" />
          </div>
          <div className="mt-6 flex-grow text-center sm:mt-0 sm:text-left">
            <h2 className="title-font mb-2 text-lg font-medium text-gray-900">Blazing Fast</h2>
            <p className="text-base leading-relaxed">
              Who needs a spaceship when you have CyberBite? Our delivery service is so quick,
              you&apos;d think we had UFOs on our fleet! Using our patented &apos;Intergalactic
              Express&apos; method, we zip through traffic faster than a shooting star on a mission.
              It&apos;s so fast, in fact, we&apos;ve had to assure the local government we&apos;re
              not actually employing alien technology.
            </p>
          </div>
        </div>
        <div className="mx-auto mb-10 flex flex-col items-center border-b border-gray-200 pb-10 sm:flex-row">
          <div className="mt-6 flex-grow text-center sm:mt-0 sm:text-left">
            <h2 className="title-font mb-2 text-lg font-medium text-gray-900">Delicious Dishes</h2>
            <p className="text-base leading-relaxed">
              At CyberBite, we&apos;ve built a time machine... for your taste buds! With
              cutting-edge technology, a dash of absurdity, and a sprinkle of love, we&apos;re
              making food delivery fun, quick, and always interesting. Our staff doesn&apos;t have
              robotic arms (yet), but they&apos;re committed to beaming up your favorite food in
              record time.
            </p>
          </div>
          <div className="order-first inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 sm:order-none sm:ml-10 sm:h-32 sm:w-32">
            <IoPizza size={24} className="h-10 w-10 sm:h-16 sm:w-16" />
          </div>
        </div>
        <div className="mx-auto mb-10 flex flex-col items-center border-b border-gray-200 pb-10 sm:flex-row">
          <div className="inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 sm:mr-10 sm:h-32 sm:w-32">
            <AiFillFire size={24} className="h-10 w-10 sm:h-16 sm:w-16" />
          </div>
          <div className="mt-6 flex-grow text-center sm:mt-0 sm:text-left">
            <h2 className="title-font mb-2 text-lg font-medium text-gray-900">Blazing Fast</h2>
            <p className="text-base leading-relaxed">
              So when you&apos;re stomach&apos;s growling louder than an alien language and
              you&apos;re craving delicious food that&apos;s out of this world, remember -
              there&apos;s no need to gaze at the stars in despair. CyberBite is here to deliver an
              &apos;astronomical&apos; dining experience right to your doorstep. We&apos;re just a
              few light years away...or was that minutes? We&apos;re working on that.
            </p>
          </div>
        </div>
        <div className="mx-auto mb-10 flex flex-col items-center border-b border-gray-200 pb-10 sm:flex-row">
          <div className="mt-6 flex-grow text-center sm:mt-0 sm:text-left">
            <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
              Love Letters from Alpha Centauri?
            </h2>
            <p className="text-base leading-relaxed">
              Although, we may be Earth-bound (for now), our fans stretch across the galaxy. From
              the sunny beaches of California to the bustling streets of Tokyo, and all the way to
              the hypothetical residents of Kepler-22b (hey, you never know!), we&apos;ve garnered a
              stellar following. Our customers aren&apos;t just users, they&apos;re our interstellar
              family. They&apos;ve tasted the future of food delivery and&mdash;no surprises
              here&mdash;they&apos;re over the moon!
            </p>
          </div>
          <div className="order-first inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 sm:order-none sm:ml-10 sm:h-32 sm:w-32">
            <LuUserCheck size={24} className="h-10 w-10 sm:h-16 sm:w-16" />
          </div>
        </div>
        <div className="mx-auto flex flex-col items-center sm:flex-row">
          <div className="inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 sm:mr-10 sm:h-32 sm:w-32">
            <FaFlagCheckered size={24} className="h-10 w-10 sm:h-16 sm:w-16" />
          </div>
          <div className="mt-6 flex-grow text-center sm:mt-0 sm:text-left">
            <h2 className="title-font mb-2 text-lg font-medium text-gray-900">Ready. Set. Go!</h2>
            <p className="text-base leading-relaxed">
              Ready to teleport tasty treats straight to your table? Awesome! Choose your meals, key
              in your coordinates (or, you know, just your address), and hang tight. We promise our
              delivery is faster than a light-year! Need to schedule your delivery for a future
              date? Sure thing! After all, we&apos;re all about bending space and time.
            </p>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <SignUp_StartOrder session={session} />
        </div>
      </div>
    </section>
  )
}
