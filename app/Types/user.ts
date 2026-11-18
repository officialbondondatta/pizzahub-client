
export interface IUser {
  _id?: string,
  name: string
  email: string
  password: string
  role: "customer" | "vendor" | "admin"
  image?: string
}
