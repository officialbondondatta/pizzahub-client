import { betterAuth } from "better-auth";
import { APIError, getOAuthState } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("pizzahub");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: ["customer", "vendor"],
                required: false,
                defaultValue: "customer",
                input: true,
            },
            plan: {
                type: ["free", "premium"],
                required: true,
                defaultValue: "free",
                input: true,
            },
            isBlocked: {
                type: "boolean",
                required: true,
                defaultValue: false,
                input: false,
            },
            subscriptionExpiresAt: {
                type: "string",
                required: false,
                input: false,
            },
            businessName: {
                type: "string",
                // Required conditionally for vendors by the creation hook below.
                required: false,
                input: true,
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    if (user.role !== "vendor") return;
                    const businessName = typeof user.businessName === "string"
                        ? user.businessName.trim()
                        : "";
                    if (!businessName) {
                        throw new APIError("BAD_REQUEST", {
                            message: "Business name is required for vendors.",
                        });
                    }
                    return { data: { ...user, businessName } };
                },
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            mapProfileToUser: async () => {
                const state = await getOAuthState();
                // Only the two self-service roles are accepted from OAuth state.
                return state?.role === "vendor"
                    ? { role: "vendor", businessName: typeof state.businessName === "string" ? state.businessName.trim() : "" }
                    : { role: "customer" };
            },
        },
    },
});
