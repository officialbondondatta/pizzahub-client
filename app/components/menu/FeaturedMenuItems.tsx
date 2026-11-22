import Link from "next/link"
import { getAllMenuItems } from "@/app/lib/actions/menu-items"
import { withVendorBusinessNames } from "@/app/lib/vendor-business-names"
import MenuCard from "./MenuCard"

export default async function FeaturedMenuItems() {
  const items = await getAllMenuItems()
  const featured = await withVendorBusinessNames(
    items
      .filter((item) => item.status === "accepted" && item.isActive)
      .slice(0, 6)
  )

  return (
    <section
      aria-labelledby="featured-menu-title"
      className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            Fresh from local kitchens
          </p>
          <h2
            id="featured-menu-title"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Featured Menu Items
          </h2>
          <p className="mt-3 text-muted-foreground">
            Find your next favorite pizza from our latest available dishes.
          </p>
        </div>
        <Link
          href="/browse-menu"
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-brand-300 px-5 py-2 font-medium text-brand-700 hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-brand-300 dark:hover:bg-brand-900"
        >
          Browse all items
        </Link>
      </div>
      {featured.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border bg-card px-6 py-12 text-center text-muted-foreground">
          Fresh dishes are on the way. Check back soon for available menu items.
        </p>
      )}
    </section>
  )
}
