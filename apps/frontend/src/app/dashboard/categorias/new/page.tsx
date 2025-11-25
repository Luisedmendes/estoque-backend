import { isLoggedIn } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { CategoryForm } from "@/components/ui/category-form";


export default async function CategoryCreate() {
    if (!isLoggedIn()) {
        redirect("/");
    }


    return (
        <div>
            <CategoryForm />
        </div>
    );
}