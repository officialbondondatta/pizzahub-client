import { Store } from "lucide-react"

export default function VendorPlaceholder() {
  return (
    <div className="flex min-h-16 items-center gap-3 rounded-xl border border-dashed p-3 text-muted-foreground">
      <Store className="size-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium">Vendor information</p>
        <p className="text-sm">Coming soon</p>
      </div>
    </div>
  )
}
