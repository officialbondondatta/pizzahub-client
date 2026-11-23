import { getSubscriptionPlan } from "./subscription"
import "server-only"
import { ObjectId } from "mongodb"
import type { IMenuItem } from "@/app/Types/menu-items"
import { connectMongoDB } from "./mongodb"

export async function withVendorBusinessNames(
  items: IMenuItem[]
): Promise<IMenuItem[]> {
  const ids = [...new Set(items.map((item) => item.vendorId))]
    .filter((id) => ObjectId.isValid(id))
    .map((id) => new ObjectId(id))
  if (!ids.length) return items

  const db = await connectMongoDB()
  const vendors = await db
    .collection("user")
    .find({ _id: { $in: ids } }, { projection: { businessName: 1, plan: 1, subscriptionExpiresAt: 1 } })
    .toArray()
  const vendorsById = new Map(
    vendors.map((vendor) => [vendor._id.toString(), vendor])
  )
  return items.map((item) => {
    const vendor = vendorsById.get(item.vendorId)
    return {
      ...item,
      vendorBusinessName:
        typeof vendor?.businessName === "string"
          ? vendor.businessName
          : undefined,
      vendorPlan:
        getSubscriptionPlan(vendor ? { plan: vendor.plan, subscriptionExpiresAt: vendor.subscriptionExpiresAt } : null),
    }
  })
}
