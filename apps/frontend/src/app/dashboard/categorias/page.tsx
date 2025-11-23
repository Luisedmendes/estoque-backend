import { isLoggedIn } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { columns, CategoryType } from "./columns"
import { DataTable } from "@/components/ui/data-table";
import { api } from "@/app/lib/api";

async function getData(): Promise<CategoryType[]> {

	const res = await api("/categories");
	const data = await res.json();

	return data.data
}

export default async function CategoryPage() {
	if (!isLoggedIn()) {
		redirect("/");
	}

	const data = await getData()

	return (
		<div className="flex w-full">
			<DataTable columns={columns} data={data} />
		</div>
	);
}