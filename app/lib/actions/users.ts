'use server'
import { IUser } from "@/app/Types/user";
import { getTokenNow } from "../core/server";

const BASEURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:8001";


export const updateUser = async (userId: string, updatedData: Partial<IUser>) => {
    const res = await fetch(`${BASEURL}/users/${userId}`, {
        method: "PATCH",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });
    return res.json();
}

export const getUsers = async () => {
    const token = await getTokenNow()
    const result = await fetch(`${BASEURL}/users`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return result.json()
}
export const blockUser = async (id: string) => {
    const token = await getTokenNow()
    const result = await fetch(`${BASEURL}/users/block/${id}`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`
        },
        cache: 'no-cache'
    })
    if (!result.ok) {
        throw new Error("Failed to block user")
    }
    return result.json()
}