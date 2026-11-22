import { withVendorBusinessNames } from "@/app/lib/vendor-business-names"
import { getAllMenuItems } from "@/app/lib/actions/menu-items"
import BrowseMenu from "@/app/components/menu/BrowseMenu"
import MenuBanner from "@/app/components/menu/MenuBanner"
import { menuCategories } from "@/app/lib/menu-categories"

export default async function BrowseMenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>
}) {
  const { category } = await searchParams
  const initialCategory =
    menuCategories.find((value) => value === category) || ""
  const items = await getAllMenuItems()
  const activeItems = items.filter(
    (item) => item.status === "accepted" && item.isActive === true
  )
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <MenuBanner />
      <BrowseMenu
        key={initialCategory}
        initialCategory={initialCategory}
        items={await withVendorBusinessNames(activeItems)}
      />
    </div>
  )
}
