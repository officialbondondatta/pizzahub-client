"use server"

import type { IMenuItem } from "@/app/Types/menu-items"
import { auth } from "../auth"
import { headers } from "next/headers"
import { getSessionNow, getTokenNow } from "../core/server"

const BASEURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL

async function readMenuResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Could not load menu items (${response.status})`)
  }
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new Error("The menu API returned an unexpected response")
  }
  return response.json()
}

export const addMenuItems = async (data: IMenuItem) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    throw new Error("Not authorized to add menu items")
  }
  const token = session.session.token
  const res = await fetch(`${BASEURL}/menu-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to add menu item")
  }
  return res.json()
}

export const getMenuItemsByID = async (): Promise<IMenuItem[]> => {
  const session = await getSessionNow()
  if (!session) throw new Error("Sign in to view your menu items")
  const token = session.session.token
  const userId = session.user.id
  const res = await fetch(`${BASEURL}/menu-items/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return readMenuResponse<IMenuItem[]>(res)
}

export const getSingleItemDetails = async (
  id: string
): Promise<IMenuItem | null> => {
  const token = await getTokenNow()
  const result = await fetch(`${BASEURL}/menu-items/details/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  // Express sends an empty body when findOne returns null.
  if (
    result.status === 404 ||
    (result.ok && result.headers.get("content-length") === "0")
  )
    return null
  return readMenuResponse<IMenuItem | null>(result)
}

export const getAllMenuItems = async (): Promise<IMenuItem[]> => {
  const result = await fetch(`${BASEURL}/menu-items`)
  return readMenuResponse<IMenuItem[]>(result)
}

export const updateMenuItem = async (id: string, data: Partial<IMenuItem>) => {
  const session = await getSessionNow()
  if (!session) throw new Error("Sign in to view your menu items")
  const token = session.session.token
  const res = await fetch(`${BASEURL}/menu-items/${encodeURIComponent(id)}`, {
    method: "PATCH",
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Failed to update menu item")
  return res.json()
}
