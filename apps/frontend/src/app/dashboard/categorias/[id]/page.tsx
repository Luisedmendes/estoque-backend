import { isLoggedIn } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { CategoryForm } from "@/components/ui/category-form";

export default async function CategoryEdit({ params }: { params: { id: string } }) {
    const logged = await isLoggedIn();
    if (!logged) {
        redirect("/");
    }

    const { id } = await params


    return (
        <div>
            <CategoryForm id={id} />
        </div>
    );
}
