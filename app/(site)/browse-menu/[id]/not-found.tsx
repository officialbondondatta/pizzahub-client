import Link from "next/link"

export default function NotFound() {
  return (
    <div className="px-6 py-20 text-center">
      <h1 className="text-2xl font-bold">Item not found</h1>
      <p className="mt-3 text-muted-foreground">
        This menu item is no longer available.
      </p>
      <Link
        href="/browse-menu"
        className="mt-6 inline-block underline underline-offset-4"
      >
        Browse the menu
      </Link>
    </div>
  )
}
