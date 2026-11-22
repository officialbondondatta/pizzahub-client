import type { IMenuItem } from "@/app/Types/menu-items"

function createdAt(item: IMenuItem) {
  const timestamp = Date.parse(item.createdAt || "")
  if (Number.isFinite(timestamp)) return timestamp
  // Preserve chronological ordering for legacy MongoDB records.
  return item._id && /^[a-f\d]{24}$/i.test(item._id)
    ? parseInt(item._id.slice(0, 8), 16) * 1000
    : 0
}

export function sortMenuItemsNewestFirst(items: IMenuItem[]) {
  return [...items].sort((a, b) => createdAt(b) - createdAt(a))
}
