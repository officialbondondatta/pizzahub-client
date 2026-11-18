import { createAuthClient } from "better-auth/react"
import type { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
    // Auth routes are hosted on this app; use the current browser origin.
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, useSession } = authClient