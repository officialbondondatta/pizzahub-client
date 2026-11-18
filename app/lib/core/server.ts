import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session
}

export const requireRoleFromSession = async (role: string) => {
    const session = await getSession()
    const roleFromSession = session?.user?.role

    if (!session || roleFromSession !== role) {
        redirect("/unauthorized")
    }
    return session
}