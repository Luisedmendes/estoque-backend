import { isLoggedIn } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/ui/product-form";


export default async function CategoryCreate() {
    if (!isLoggedIn()) {
        redirect("/");
    }


    return (
        <div>
            <ProductForm />
        </div>
    );
}