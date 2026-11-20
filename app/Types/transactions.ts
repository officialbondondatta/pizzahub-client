export interface ITransaction {
    vendorId: string,
    plan: "premium",
    amount: number,
    currency: string,
    stripeSessionId: string,
    stripeSubscriptionId: string,
    status: string,
    createdAt?: string,
    payment_date?: string
}