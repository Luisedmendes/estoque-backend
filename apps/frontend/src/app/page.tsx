"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "./lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type JWTResponse = {
  jwt_token: string
  refresh_token: string
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await api(`/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });


    if (!res.ok) {
      alert("Credenciais inválidas");
      return;
    }

    const { data }: { data: JWTResponse } = await res.json();

    const token = data.jwt_token;

    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    router.push("/dashboard");
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 rounded border w-80 space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

        <input
          className="border p-2 w-full"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}
