import { formatOrderDate, formatOrderTime } from "@/app/lib/format-order-date"

export default function RequestDate({ value }: { value?: string }) {
  const time = formatOrderTime(value)
  return (
    <span className="block whitespace-nowrap">
      <span className="block">{formatOrderDate(value)}</span>
      {time && (
        <span className="mt-1 block text-xs text-muted-foreground">{time}</span>
      )}
    </span>
  )
}
