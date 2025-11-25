import { isLoggedIn } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { columns, ProductType } from "./columns"
import { api } from "@/app/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/app/lib/routes";
import { DataTableCustom } from "@/components/ui/data-table-custom";

async function getData(): Promise<ProductType[]> {

	const res = await api("/products");
	const data = await res.json();

	return data.data
}

export default async function CategoryPage() {
	if (!isLoggedIn()) {
		redirect("/");
	}

	const data = await getData()

	return (
		<div className="flex w-full flex-col items-end">
			<Link href={routes.produtos.create}>
				<Button variant="outline" className="ml-auto">
					Criar Produto
				</Button>
			</Link>
			<DataTableCustom columns={columns} data={data} />
		</div>
	);
}