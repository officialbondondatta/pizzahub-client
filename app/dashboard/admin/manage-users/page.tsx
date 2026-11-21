import Image from "next/image"
import { getUsers } from "@/app/lib/actions/users"
import type { IUser } from "@/app/Types/user"
import UsersTable from "@/app/components/users/UsersTable"

export default async function ManageUsersPage() {
  const users: IUser[] = await getUsers()
  if (!Array.isArray(users)) throw new Error("Could not load users")
  // Keep passwords and other unnecessary data on the server.
  const tableUsers = users.map(
    ({
      _id,
      name,
      email,
      role,
      plan,
      isBlocked,
      businessName,
      image,
      subscriptionExpiresAt,
    }) => ({
      _id,
      name,
      email,
      role,
      plan,
      isBlocked,
      businessName,
      image,
      subscriptionExpiresAt,
    })
  )
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="grid overflow-hidden rounded-2xl border border-brand-300 bg-brand-100/50 md:grid-cols-[1fr_360px] dark:border-brand-800 dark:bg-brand-900/20">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 text-xs font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            The PizzaHub community
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Manage users{" "}
            <span className="ml-2 inline-flex rounded-full bg-brand-500/15 px-3 py-1 align-middle text-base text-brand-700 dark:text-brand-300">
              {users.length}
            </span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Meet the people behind every slice. Find customers, vendors, and
            admins, and review their account details.
          </p>
        </div>
        <div className="relative min-h-72">
          <Image
            src="/images/pizza-seller.png"
            alt="A pizza seller in her thirties wearing a modern short orange dress and offering a freshly baked pizza."
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover"
          />
        </div>
      </section>
      <UsersTable users={tableUsers} />
    </div>
  )
}
