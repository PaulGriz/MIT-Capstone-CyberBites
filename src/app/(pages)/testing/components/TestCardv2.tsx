import Image from "next/image"
import Link from "next/link"
import { BsArrowRightShort } from "react-icons/bs"

export default function TestCard2() {
  const data = {
    name: "Cava",
    description: "Wraps & Salads",
    slug: "cava",
    image: "/restaurants/cava/ITEM_market-spice-bowl.avif",
    address: "1250B Fording Island Rd Suite 288, Bluffton, SC 29910",
    phone: "843-949-4647",
  }
  return (
    <div className="mx-auto max-w-[25rem] overflow-hidden rounded-xl bg-zinc-50 shadow-lg">
      <div className="flex-col">
        <div className="">
          <Image
            className="mx-auto object-cover"
            src="/restaurants/cava/ITEM_market-spice-bowl.avif"
            alt="Modern building architecture"
            width={250}
            height={250}
          />
        </div>
        <div className="px-8 py-4">
          <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
            {data.description}
          </div>
          <Link
            href={`/store/${data.slug}`}
            className="mt-1 block text-2xl font-medium leading-tight text-black hover:underline"
          >
            {data.name}
          </Link>
          <p className="mt-2 text-slate-500">
            Looking to take your team away on a retreat to enjoy awesome food and take in some
            sunshine? We have a list of places to do just that.
          </p>
          {/* View Menu Button */}
          <div className="my-2">
            <Link
              href={`/store/${data.slug}`}
              className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              View Menu
              <BsArrowRightShort size={25} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
