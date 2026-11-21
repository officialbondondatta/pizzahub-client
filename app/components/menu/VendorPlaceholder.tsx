import { Store } from "lucide-react"

export default function VendorPlaceholder({
  businessName,
}: {
  businessName?: string
}) {
  return (
    <div className="flex min-h-16 items-center gap-3 rounded-xl border border-dashed p-3 text-muted-foreground">
      <Store className="size-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium">Restaurent</p>
        <p className="text-sm">
          {businessName || "Business name not available"}
        </p>
      </div>
    </div>
  )
}
