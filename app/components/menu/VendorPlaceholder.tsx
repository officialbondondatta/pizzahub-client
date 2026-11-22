import { Crown, Store } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function VendorPlaceholder({
  businessName,
  premium = false,
}: {
  businessName?: string
  premium?: boolean
}) {
  return (
    <div className="flex min-h-16 items-center gap-3 rounded-xl border border-dashed p-3 text-muted-foreground">
      <Store className="size-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-sm font-medium">Restaurant</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <p className="text-sm wrap-break-word">
            {businessName || "Business name not available"}
          </p>
          {premium && (
            <Badge className="shrink-0 border-amber-300 bg-amber-100 px-2 py-1 text-amber-950">
              <Crown aria-hidden="true" />
              Premium
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
