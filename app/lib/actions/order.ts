"use server"
import { IOrder } from "@/app/Types/order";
import { getTokenNow } from "../core/server";

const BASEURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL

export const createOrder = async (data: IOrder) => {
    const token = await getTokenNow()
    const result = await fetch(`${BASEURL}/order`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return result.json()
}

export const getMyOrders = async (id: string) => {
    const token = await getTokenNow()
    const result = await fetch(`${BASEURL}/order/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return result.json()
}

export const cancelOrder = async (id: string) => {
    const token = await getTokenNow()
    const result = await fetch(`${BASEURL}/order/cancel/${id}`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`
        },
        cache: 'no-cache'

    })
    return result.json()
}

export const getAllOrders = async () => {
    const token = await getTokenNow()
    const result = await fetch(`${BASEURL}/order`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return result.json()
}