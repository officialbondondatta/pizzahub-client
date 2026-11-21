import { getAllMenuItems } from "@/app/lib/actions/menu-items"
import BrowseMenu from "@/app/components/menu/BrowseMenu"
import MenuBanner from "@/app/components/menu/MenuBanner"

export default async function BrowseMenuPage() {
  const items = await getAllMenuItems()
  const activeItems = items.filter(
    (item) => item.status === "accepted" && item.isActive === true
  )
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <MenuBanner />
      <BrowseMenu items={activeItems} />
    </div>
  )
}
