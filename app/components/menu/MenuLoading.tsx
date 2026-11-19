import { Skeleton } from "@/components/ui/skeleton"

export default function MenuLoading() {
  return (
    <div
      className="mx-auto max-w-7xl space-y-8 px-4 py-10"
      role="status"
      aria-label="Loading menu"
    >
      <span className="sr-only">Loading menu…</span>
      <Skeleton className="h-64 rounded-2xl" />
      <Skeleton className="h-24 rounded-2xl" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((id) => (
          <div key={id} className="overflow-hidden rounded-2xl border">
            <Skeleton className="aspect-4/3" />
            <div className="space-y-4 p-5">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-16" />
              <Skeleton className="h-11" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
