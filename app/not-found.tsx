import Link from "next/link"

export default function NotFound() {
  return (
    <main className="px-6 py-20 text-center">
      <p className="font-semibold text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        This page may have moved or is no longer available.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Link href="/" className="underline">
          Back to home
        </Link>
        <Link href="/browse-menu" className="underline">
          Browse menu
        </Link>
      </div>
    </main>
  )
}
