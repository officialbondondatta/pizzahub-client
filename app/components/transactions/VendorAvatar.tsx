"use client"

import Image from "next/image"
import { useState } from "react"

export default function VendorAvatar({
  name = "Unknown vendor",
  image,
  large = false,
}: {
  name?: string
  image?: string
  large?: boolean
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null)
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?"
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-500/15 font-semibold text-brand-700 dark:text-brand-300 ${large ? "size-20 text-xl" : "size-11 text-sm"}`}
    >
      {image && failedImage !== image ? (
        <Image
          src={image}
          alt={`${name}'s profile`}
          fill
          sizes={large ? "80px" : "44px"}
          unoptimized
          className="object-cover"
          onError={() => setFailedImage(image)}
        />
      ) : (
        <span aria-label={`${name}'s initials`}>{initials}</span>
      )}
    </span>
  )
}
