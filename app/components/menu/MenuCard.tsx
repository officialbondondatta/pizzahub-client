"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import type { IMenuItem } from "@/app/Types/menu-items"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import VendorPlaceholder from "./VendorPlaceholder"

export default function MenuCard({ item }: { item: IMenuItem }) {
  return (
    <Card className="h-full gap-0 rounded-2xl py-0 shadow-sm">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="mb-2 text-sm text-muted-foreground">{item.category}</p>
          <h2 className="text-xl font-semibold break-words">{item.name}</h2>
          <p className="mt-2 text-xl font-bold">
            ৳{item.price.toLocaleString("en-BD")}
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {item.location}
          </p>
        </div>
        <div className="mt-auto">
          <VendorPlaceholder />
        </div>
        {item._id ? (
          <Button
            nativeButton={false}
            render={<Link href={`/browse-menu/${item._id}`} />}
            className="h-11 rounded-xl bg-brand-700 text-white hover:bg-brand-800"
          >
            View details
          </Button>
        ) : (
          <Button disabled className="h-11">
            Details unavailable
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
