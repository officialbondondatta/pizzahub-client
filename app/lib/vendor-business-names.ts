import "server-only"
import { MongoClient, ObjectId } from "mongodb"
import type { IMenuItem } from "@/app/Types/menu-items"

const client = new MongoClient(process.env.MONGODB_URI as string)

export async function withVendorBusinessNames(
  items: IMenuItem[]
): Promise<IMenuItem[]> {
  const ids = [...new Set(items.map((item) => item.vendorId))]
    .filter((id) => ObjectId.isValid(id))
    .map((id) => new ObjectId(id))
  if (!ids.length) return items

  const vendors = await client
    .db("pizzahub")
    .collection("user")
    .find({ _id: { $in: ids } }, { projection: { businessName: 1, plan: 1 } })
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
        vendor?.plan === "premium" || vendor?.plan === "free"
          ? vendor.plan
          : undefined,
    }
  })
}
