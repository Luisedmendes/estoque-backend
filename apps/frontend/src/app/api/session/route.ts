import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { token } = await req.json();

    const cookieStore = await cookies();

    cookieStore.set("session-token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60,
    });

    return NextResponse.json({ ok: true });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete("session-token");
    return NextResponse.json({ ok: true });
}
