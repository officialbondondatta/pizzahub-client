import { Button } from "@/components/ui/button"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import Link from "next/link"
import { Pizza, Plus } from "lucide-react"
import { getMenuItemsByID } from "@/app/lib/actions/menu-items"
import MenuTable from "@/app/components/menu/MenuTable"

export default async function MyMenuItemsPage() {
  const items = await getMenuItemsByID()
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            My menu items{" "}
            <span className="ml-2 inline-flex rounded-full bg-brand-500/15 px-3 py-1 text-base text-brand-700 dark:text-brand-300">
              {items.length}
            </span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Status is set by the admin and cannot be edited here.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/vendor/add-menu-items" />}
          className="h-11 rounded-xl bg-brand-700 px-5 text-white hover:bg-brand-800"
        >
          <Plus aria-hidden="true" />
          Add menu item
        </Button>
      </div>
      {items.length ? (
        <MenuTable items={items} />
      ) : (
        <Empty className="rounded-2xl border p-12">
          <Pizza
            className="mx-auto mb-4 size-10 text-muted-foreground"
            aria-hidden="true"
          />
          <EmptyTitle className="text-xl font-semibold">
            Your menu starts here
          </EmptyTitle>
          <EmptyDescription className="mt-2 text-muted-foreground">
            Add your first item and give customers something to look forward to.
          </EmptyDescription>
        </Empty>
      )}
    </div>
  )
}
