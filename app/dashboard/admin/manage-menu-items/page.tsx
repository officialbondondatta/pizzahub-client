import { getAllMenuItems } from "@/app/lib/actions/menu-items"
import ManageMenuItems from "@/app/components/menu/ManageMenuItems"

export default async function ManageMenuItemsPage() {
  const items = await getAllMenuItems()
  const users = await getUsers()
  return (
    <div className="mx-auto max-w-7xl">
      <section className="grid overflow-hidden rounded-2xl border border-brand-300 bg-brand-100/50 md:grid-cols-[1fr_360px] dark:border-brand-800 dark:bg-brand-900/20">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 text-xs font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            The PizzaHub menu
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Manage menu items{" "}
            <span className="ml-2 inline-flex rounded-full bg-brand-500/15 px-3 py-1 align-middle text-base text-brand-700 dark:text-brand-300">
              {items.length}
            </span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Great food starts with a great menu. Review submissions, explore
            dishes, and manage availability across all vendors.
          </p>
        </div>
        <div className="relative min-h-72">
          <Image
            src="/images/pizza-seller.png"
            alt="A pizza shop owner offering a freshly baked pizza."
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover"
          />
        </div>
      </section>
      <ManageMenuItems items={items} users={users} />
    </div>
  )
}
import Image from "next/image"
import { getUsers } from "@/app/lib/actions/users";
