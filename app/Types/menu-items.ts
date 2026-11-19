export interface IMenuItem {
    _id?: string
    name: string
    category: string
    price: number
    description: string
    location: string
    image: string
    userId: string
    status: "pending" | "accepted" | "rejected"
}
