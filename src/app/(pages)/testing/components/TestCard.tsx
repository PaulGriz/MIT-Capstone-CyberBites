import Image from "next/image"
import Link from "next/link"

export default function TestCard() {
  const data = {
    name: "Cava",
    description: "Wraps & Salads",
    slug: "cava",
    image: "/restaurants/cava/ITEM_market-spice-bowl.avif",
    address: "1250B Fording Island Rd Suite 288, Bluffton, SC 29910",
    phone: "843-949-4647",
  }
  return (
    <section className="w-[20rem] rounded-lg border border-gray-200 bg-slate-50 px-5 shadow">
      {/* Image */}
      <Link href={`/store/${data.slug}`}>
        <Image
          className="mx-auto rounded-t-lg"
          src={data.image}
          alt={`${data.name} logo`}
          width={200}
          height={150}
        />
      </Link>
      {/* Name & Description */}
      <div className="">
        <Link href={`/store/${data.slug}`}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">{data.name}</h5>
        </Link>
        <p className="text-gray-700 ">{data.description}</p>
      </div>
      {/* Phone */}
      <p className="text-gray-700">{data.phone}</p>
      <div className="my-2 border-t-2"></div>
      {/* View Menu Button */}
      <div className="my-2">
        <Link
          href={`/store/${data.slug}`}
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          View Menu
          <svg
            className="ml-2 h-3.5 w-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </section>
  )
}
