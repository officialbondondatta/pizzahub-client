export function formatOrderDate(value?: string, includeTime = false) {
  if (!value) return "Not available"
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? "Not available"
    : new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        ...(includeTime ? { timeStyle: "short" as const, hour12: true } : {}),
        timeZone: "Asia/Dhaka",
      }).format(date)
}

export function formatOrderTime(value?: string) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat("en-GB", {
        timeStyle: "short",
        hour12: true,
        timeZone: "Asia/Dhaka",
      }).format(date)
}
