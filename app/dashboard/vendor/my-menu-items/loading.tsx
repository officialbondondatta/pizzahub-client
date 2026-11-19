import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div
      className="mx-auto max-w-7xl space-y-8"
      role="status"
      aria-label="Loading your menu items"
    >
      <span className="sr-only">Loading your menu items…</span>
      <Skeleton className="h-10 w-60" />
      <div className="space-y-4 rounded-2xl border p-5">
        <Skeleton className="h-10" />
        {[1, 2, 3].map((row) => (
          <Skeleton key={row} className="h-20" />
        ))}
      </div>
    </div>
  )
}
