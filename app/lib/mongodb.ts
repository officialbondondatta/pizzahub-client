import "server-only"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
if (!uri) throw new Error("MONGODB_URI is not configured")

const mongoGlobal = globalThis as typeof globalThis & {
  pizzaHubMongoClient?: MongoClient
}

// Reuse the pool across requests and development module reloads.
export const mongoClient =
  mongoGlobal.pizzaHubMongoClient ?? new MongoClient(uri)
mongoGlobal.pizzaHubMongoClient = mongoClient

export async function connectMongoDB() {
  // The driver shares concurrent connection attempts and reconnects a closed
  // topology. Do not cache a rejected promise or close this shared client.
  await mongoClient.connect()
  return mongoClient.db("pizzahub")
}
