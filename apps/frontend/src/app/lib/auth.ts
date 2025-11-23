"use server";

import { cookies } from "next/headers";

export async function getSessionToken() {
    return (await cookies()).get("session-token")?.value || null;
}

export async function isLoggedIn() {
    return !!(await cookies()).get("session-token");
}
