import { isLoggedIn } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  if (!isLoggedIn()) {
    redirect("/");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Painel</h1>
      <p>Você está logado!</p>
    </div>
  );
}
