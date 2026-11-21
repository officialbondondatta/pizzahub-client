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
    .find({ _id: { $in: ids } }, { projection: { businessName: 1 } })
    .toArray()
  const names = new Map(
    vendors.map((vendor) => [vendor._id.toString(), vendor.businessName])
  )
  return items.map((item) => ({
    ...item,
    vendorBusinessName:
      typeof names.get(item.vendorId) === "string"
        ? names.get(item.vendorId)
        : undefined,
  }))
}
