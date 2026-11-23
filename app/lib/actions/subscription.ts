'use server'
import { getTokenNow } from "../core/server";

const BASEURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL


export const cancelSubscription = async (id: string) => {
    const token = await getTokenNow()
    if (!token) throw new Error("Sign in to change your subscription")
    const result = await fetch(`${BASEURL}/users/cancel/subscription/${id}`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    if (!result.ok) throw new Error("Unable to cancel subscription")
    return result.json()
}
