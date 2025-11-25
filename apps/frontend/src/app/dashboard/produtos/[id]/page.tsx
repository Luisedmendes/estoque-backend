import { isLoggedIn } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/ui/product-form";

export default async function ProductEdit({ params }: { params: { id: string } }) {
    const logged = await isLoggedIn();
    if (!logged) {
        redirect("/");
    }

    const { id } = await params

    return (
        <div>
            <ProductForm id={id} />
        </div>
    );
}
