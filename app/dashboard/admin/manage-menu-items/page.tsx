import { getAllMenuItems } from "@/app/lib/actions/menu-items"
import ManageMenuItems from "@/app/components/menu/ManageMenuItems"

export default async function ManageMenuItemsPage() {
  const items = await getAllMenuItems()
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold">
        Manage menu items
        <span className="ml-2 inline-flex rounded-full bg-brand-500/15 px-3 py-1 text-base text-brand-700 dark:text-brand-300">
          {items.length}
        </span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Review submissions and manage the menu across all vendors.
      </p>
      <ManageMenuItems items={items} />
    </div>
  )
}
