"use server"
import { IUser } from "@/app/Types/user"
import { getTokenNow } from "../core/server"

const BASEURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:8001"

export const updateUser = async (
  userId: string,
  updatedData: Partial<IUser>
) => {
  const res = await fetch(`${BASEURL}/users/${userId}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
  if (!res.ok) throw new Error("Your profile could not be saved. Please try again.")
  return res.json()
}

export const getUsers = async () => {
  const token = await getTokenNow()
  const result = await fetch(`${BASEURL}/users`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  if (!result.ok)
    throw new Error("The request could not be completed. Please try again.")
  return result.json()
}
export const blockUser = async (id: string) => {
  const token = await getTokenNow()
  const result = await fetch(`${BASEURL}/users/block/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })
  if (!result.ok) {
    const data = await result.json().catch(() => null)
    return {
      message:
        typeof data?.message === "string"
          ? data.message
          : "Failed to update user block status",
    }
  }
  return result.json()
}
