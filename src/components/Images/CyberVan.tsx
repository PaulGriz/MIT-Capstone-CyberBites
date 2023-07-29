import Image from "next/image"

export default function CyberVan() {
  return (
    <div className="relative hidden h-full md:flex">
      <div className="absolute inset-0 bg-zinc-900" />
      <Image
        src={"/auth/future_delivery_van_v3.png"}
        alt={"CyberBite Food Delivery - Generated with Leonardo.ai"}
        className="object-cover"
        fill={true}
        sizes="(max-width: 750px) 0vw, (max-width: 1200px) 50vw, 40vw"
        priority
      />
    </div>
  )
}
