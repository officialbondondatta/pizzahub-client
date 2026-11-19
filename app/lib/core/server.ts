import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getSessionNow = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session
}

export const getTokenNow = async () => {
    const session = await getSessionNow()
    const token = session?.session?.token
    return token
}

export const requireRoleFromSession = async (role: string) => {
    const session = await getSessionNow()
    const roleFromSession = session?.user?.role

    if (!session || roleFromSession !== role) {
        redirect("/unauthorized")
    }
    return session
}