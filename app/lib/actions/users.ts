import { IUser } from "@/app/Types/user";

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