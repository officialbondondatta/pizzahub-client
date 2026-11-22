export interface IMenuItem {
    _id?: string
    // ISO timestamp supplied by the API; older menu items may omit it.
    createdAt?: string
    name: string
    category: string
    price: number
    description: string
    location: string
    image: string
    vendorId: string
    vendorBusinessName?: string
    isActive: boolean
    status: "pending" | "accepted" | "rejected"
}
