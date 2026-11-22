"use server"
import { IOrder } from "@/app/Types/order"
import { getTokenNow } from "../core/server"

const BASEURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL

export const createOrder = async (data: IOrder) => {
  const token = await getTokenNow()
  const result = await fetch(`${BASEURL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!result.ok)
    throw new Error("The request could not be completed. Please try again.")
  return result.json()
}

export const getMyOrders = async (id: string) => {
  const token = await getTokenNow()
  const result = await fetch(`${BASEURL}/order/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  if (!result.ok)
    throw new Error("The request could not be completed. Please try again.")
  return result.json()
}

export const cancelOrder = async (id: string) => {
  const token = await getTokenNow()
  const result = await fetch(`${BASEURL}/order/cancel/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })
  if (!result.ok)
    throw new Error("The request could not be completed. Please try again.")
  return result.json()
}

export const getAllOrders = async () => {
  const token = await getTokenNow()
  const result = await fetch(`${BASEURL}/order`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  if (!result.ok)
    throw new Error("The request could not be completed. Please try again.")
  return result.json()
}
export const getUserInfo = async () => {
  const token = await getTokenNow()
  const result = await fetch(`${BASEURL}/users/info`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  if (!result.ok)
    throw new Error("The request could not be completed. Please try again.")
  return result.json()
}

export const changeOrderStatus = async (
  id: string,
  data: { status: string }
) => {
  const token = await getTokenNow()
  const result = await fetch(`${BASEURL}/order/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!result.ok)
    throw new Error("The request could not be completed. Please try again.")
  return result.json()
}
