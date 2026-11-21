import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin } from "lucide-react"
import { getSingleItemDetails } from "@/app/lib/actions/menu-items"
import { withVendorBusinessNames } from "@/app/lib/vendor-business-names"
import VendorPlaceholder from "@/app/components/menu/VendorPlaceholder"
import OrderNowButton from "@/app/components/orders/OrderNowButton"

export default async function MenuItemDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = await getSingleItemDetails(id)
  if (!item) notFound()

  const [vendorItem] = await withVendorBusinessNames([item])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        href="/browse-menu"
        className="text-sm font-medium underline underline-offset-4"
      >
        Back to menu
      </Link>
      <Card className="mt-6 grid gap-0 rounded-2xl py-0 shadow-sm lg:grid-cols-2">
        <div className="relative min-h-80 bg-muted lg:min-h-155">
          <Image
            src={item.image}
            alt={item.name}
            fill
            loading="eager"
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <CardContent className="flex flex-col gap-6 p-6 sm:p-10">
          <div>
            <p className="mb-3 text-sm font-semibold text-muted-foreground">
              {item.category}
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {item.name}
            </h1>
            <p className="mt-4 text-3xl font-bold">
              ৳{item.price.toLocaleString("en-BD")}
            </p>
          </div>
          <p className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-5 shrink-0" aria-hidden="true" />
            {item.location}
          </p>
          <div className="border-t pt-6">
            <h2 className="mb-3 text-lg font-semibold">About this item</h2>
            <p className="leading-7 whitespace-pre-line text-muted-foreground">
              {item.description}
            </p>
          </div>
          <VendorPlaceholder businessName={vendorItem.vendorBusinessName} />
          <div className="mt-auto border-t pt-6">
            <OrderNowButton item={vendorItem}></OrderNowButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
