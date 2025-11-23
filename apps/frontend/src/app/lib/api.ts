import { getSessionToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api(endpoint: string, options: RequestInit = {}) {
    const token = await getSessionToken()

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
}
