import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div
      role="status"
      aria-label="Loading dashboard page"
      className="mx-auto w-full max-w-7xl space-y-8"
    >
      <Skeleton className="h-10 w-60 max-w-full" />
      <Skeleton className="h-64 w-full rounded-2xl" />
      <div className="space-y-4 rounded-2xl border p-5">
        {[1, 2, 3].map((row) => (
          <Skeleton key={row} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )
}
