import { getTokenNow } from "../core/server";

const BASEURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL

export const checkoutVerify = async (sessionId: string) => {
    const token = await getTokenNow()
    const res = await fetch(`${BASEURL}/payment/checkout-verify`, {
        method: "POST",
        headers: {
            'Content-Type': `application/json`,
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ sessionId }),
        cache: 'no-store'
    })
    if (!res.ok) {
        throw new Error(`Payment verificatin failed (${res.status})`)
    }
    return res.json()
}