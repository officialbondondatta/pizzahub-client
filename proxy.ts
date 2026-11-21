import { NextResponse, type NextRequest } from "next/server"
import { auth } from "@/app/lib/auth"

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
    // Read current account status even if the user already has a session.
    query: { disableCookieCache: true, disableRefresh: true },
  })

  if (!session) {
    const destination = new URL("/sign-in", request.url)
    destination.searchParams.set("access", "sign-in-required")
    return NextResponse.redirect(destination)
  }

  if (session.user.isBlocked) {
    const destination = new URL("/unauthorized", request.url)
    destination.searchParams.set("access", "blocked")
    return NextResponse.redirect(destination)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/browse-menu/:id",
    "/menu/:id",
    "/dashboard/:path*",
    "/profile/:path*",
    "/payment/success/:path*",
    "/payment/cancel/:path*",
  ],
}
