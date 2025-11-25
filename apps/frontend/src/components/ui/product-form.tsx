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
import { CategoryType } from "@/app/dashboard/categorias/columns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandItem, CommandGroup, CommandList } from "@/components/ui/command"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { getSessionToken } from "@/app/lib/auth"

const formSchema = z.object({
    name: z.string().min(2),
    cost_price: z.string(),
    sell_price: z.string(),
    category_id: z.string(),
    tags_id: z.array(z.string()),
    file: z.instanceof(File).optional()
})

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function ProductForm({ id }: { id?: string }) {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cost_price: "0",
            sell_price: "0",
            category_id: "",
            tags_id: [],
            file: undefined
        },
    })

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [tags, setTags] = useState<Array<{ id: string, name: string }>>([])
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    async function uploadFile(file: File | undefined) {
        if (!file) return undefined

        const token = await getSessionToken()

        const formData = new FormData()
        formData.append("files", file)
        formData.append("folder_id", "8c6373ca-5147-4fac-af54-721eaa28f677")

        const res = await fetch(`${API_URL}/files`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        const data = await res.json()
        return data.data[0].id
    }


    useEffect(() => {
        async function load() {
            const [catRes, tagsRes] = await Promise.all([
                api("/categories", { method: 'GET' }),
                api("/tags", { method: 'GET' })
            ])

            const catData = await catRes.json()
            const tagsData = await tagsRes.json()

            setCategories(catData.data)
            setTags(tagsData.data)

            console.log(id)

            if (id) {
                const res = await api(`/products/${id}`, { method: 'GET' })
                const data = await res.json()

                console.log(data)

                form.reset({
                    name: data.data.name,
                    cost_price: String(data.data.cost_price),
                    sell_price: String(data.data.sell_price),
                    category_id: data.data.category_id,
                    tags_id: data.data.tags.map((t: any) => t.id),
                    file: undefined

                })

                setImagePreview(data.data.file.file_url ?? null)
            }

            setLoading(false)
        }

        load()
    }, [id, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {

        let file_id = undefined

        if (values.file) {
            file_id = await uploadFile(values.file)
        }


        const body = {
            name: values.name,
            cost_price: Number(values.cost_price),
            sell_price: Number(values.sell_price),
            category_id: values.category_id,
            tags_id: values.tags_id,
            ...(file_id && { file_id })
        }


        if (id) {
            await api(`/products/${id}`, {
                method: "PUT",
                body: JSON.stringify(body),
            })
            console.log('depo')
        } else {
            await api("/products", {
                method: "POST",
                body: JSON.stringify(body),
            })
        }

        router.push("/dashboard/produtos")
        router.refresh()
    }


    if (loading) return <p className="p-4">Carregando...</p>



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Nome */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome do produto" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Preço de custo */}
                <FormField
                    control={form.control}
                    name="cost_price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preço de custo</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Preço de venda */}
                <FormField
                    control={form.control}
                    name="sell_price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preço de venda</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Categoria */}
                <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <FormControl>
                                <select className="border p-2 rounded w-full" {...field}>
                                    <option value="">Selecione</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Tags */}
                <FormField
                    control={form.control}
                    name="tags_id"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Tags</FormLabel>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="justify-between">
                                        {field.value.length > 0
                                            ? `${field.value.length} selecionadas`
                                            : "Selecionar tags"}
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="p-0 w-64">
                                    <Command>
                                        <CommandList>
                                            <CommandGroup>
                                                {tags.map(tag => {
                                                    const selected = field.value.includes(tag.id)

                                                    return (
                                                        <CommandItem
                                                            key={tag.id}
                                                            onSelect={() => {
                                                                if (selected) {
                                                                    field.onChange(field.value.filter(v => v !== tag.id))
                                                                } else {
                                                                    field.onChange([...field.value, tag.id])
                                                                }
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    selected ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {tag.name}
                                                        </CommandItem>
                                                    )
                                                })}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Imagem do produto"
                        className="w-32 h-32 object-cover rounded-md border"
                    />
                )}


                {/* File */}
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Imagem</FormLabel>

                            <FormControl>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            onClick={() => document.getElementById("file-input")?.click()}
                                        >
                                            Selecionar imagem
                                        </Button>

                                        {field.value && (
                                            <span className="text-sm text-muted-foreground">
                                                {field.value.name}
                                            </span>
                                        )}
                                    </div>

                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            field.onChange(file)
                                            setImagePreview(file ? URL.createObjectURL(file) : null)
                                        }}
                                    />
                                </div>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit">
                    {id ? "Salvar alterações" : "Criar produto"}
                </Button>
            </form>
        </Form>
    )
}
