"use client"

import Image from "next/image"
import Link from "next/link"

export default function WhyUs() {
  const banner = {
    title: "Summer Collection",
    image: "/dkfjvid.jpg", // ✅ single static image
    linkUrl: "/summer-collection", // optional
  }

  
  const imageElement = (
    <div className="w-full rounded-2xl overflow-hidden">
      <Image
        src={banner.image}
        alt={banner.title}
        width={1920}       // set natural width
        height={500}       // set natural height
        className="object-contain w-full h-auto" // ✅ show full image
        priority
      />
    </div>
  )

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {banner.linkUrl ? (
          <Link href={banner.linkUrl}>{imageElement}</Link>
        ) : (
          imageElement
        )}
      </div>
    </section>
  )
}