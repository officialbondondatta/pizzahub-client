"use server"

import type { IMenuItem } from "@/app/Types/menu-items"
import { auth } from "../auth";
import { headers } from "next/headers";

const BASEURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL



export const addMenuItems = async (data: IMenuItem) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        throw new Error("Not authorized to add menu items")
    }
    const token = session.session.token
    const res = await fetch(`${BASEURL}/menu-items`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    if (!res.ok) {
        throw new Error("Failed to add menu item")
    }
    return res.json()
}
