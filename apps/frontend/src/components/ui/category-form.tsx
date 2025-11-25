"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/app/lib/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const formSchema = z.object({
    name: z.string().min(2)
})

export function CategoryForm({ id }: { id?: string }) {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "" },
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchCategory() {
            if (!id) return

            setLoading(true)
            const res = await api(`/categories/${id}`)
            const data = await res.json()

            form.reset({ name: data.data.name })
            setLoading(false)
        }

        fetchCategory()
    }, [id, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (id) {
            await api(`/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
        } else {
            await api("/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
        }

        router.push("/dashboard/categorias")
        router.refresh()
    }

    if (loading) return <p className="p-4">Carregando...</p>

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome da categoria" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    {id ? "Salvar alterações" : "Criar categoria"}
                </Button>
            </form>
        </Form>
    )
}
