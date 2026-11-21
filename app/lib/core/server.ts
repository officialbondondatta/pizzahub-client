import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const getSessionNow = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: true },
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

  if (!session) redirect("/sign-in?access=sign-in-required")
  if (session.user.isBlocked) redirect("/unauthorized?access=blocked")

  if (roleFromSession !== role) {
    redirect("/unauthorized")
  }
  return session
}
