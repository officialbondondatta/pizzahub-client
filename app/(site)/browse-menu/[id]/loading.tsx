import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MenuItemDetailsLoading() {
  return (
    <div
      role="status"
      aria-label="Loading menu item details"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6"
    >
      <Skeleton className="h-5 w-24" />
      <Card className="mt-6 grid gap-0 rounded-2xl py-0 shadow-sm lg:grid-cols-2">
        <Skeleton className="min-h-80 rounded-none lg:min-h-155" />
        <CardContent className="flex flex-col gap-6 p-6 sm:p-10">
          <div>
            <Skeleton className="mb-3 h-5 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="mt-4 h-9 w-28" />
          </div>
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-3 border-t pt-6">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
          <Skeleton className="h-20 w-full rounded-xl" />
          <div className="mt-auto border-t pt-6">
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
