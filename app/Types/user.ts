
export interface IUser {
  _id?: string,
  name: string
  email: string
  password: string
  plan: "free" | "premium"
  role: "customer" | "vendor" | "admin"
  image?: string
  isBlocked: boolean
  businessName?: string
  subscriptionExpiresAt?: Date
}
