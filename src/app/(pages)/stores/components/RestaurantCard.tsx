import Image from "next/image"
import Link from "next/link"
import { BsArrowRightShort } from "react-icons/bs"

interface RestaurantCardProps {
  id: string
  slug: string
  name: string
  image: string
  description: string
  tag_line: string
}

export default function RestaurantCard({
  id,
  slug,
  name,
  image,
  description,
  tag_line,
}: RestaurantCardProps) {
  return (
    <div
      id={id}
      className="mx-auto min-w-[20rem] max-w-[30rem] flex-col overflow-hidden rounded-xl bg-gray-100 shadow-lg ring-1 ring-slate-300/50 transition duration-300 hover:ring-2 hover:ring-slate-300 store_md:min-h-[520px]"
    >
      <Image
        className="h-[280px] object-cover group-hover:h-6 md:h-full"
        src={image}
        alt={`${name} restaurant image`}
        width={500}
        height={375}
        priority
      />

      <div className="px-8 py-4 transition-all duration-1000 group-hover:max-h-[500px]">
        <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
          {tag_line}
        </div>
        <Link
          href={`/store/${slug}`}
          className="mt-1 block text-2xl font-medium leading-tight text-black hover:underline"
        >
          {name}
        </Link>
        <p className="mt-2 line-clamp-4 text-slate-500 store_md:line-clamp-5">{description}</p>
        {/* View Menu Button */}
        <div className="my-2">
          <Link
            href={`/store/${slug}`}
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            View Menu
            <BsArrowRightShort size={25} />
          </Link>
        </div>
      </div>
    </div>
  )
}
