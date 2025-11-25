"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash2, Pen } from "lucide-react"
import { routes } from "@/app/lib/routes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/api"

export type ProductType = {
  id: string,
  created_at: string,
  updated_at: string,
  name: string,
  cost_price: number,
  sell_price: number,
  category_id: string,
  category: {
    id: string,
    created_at: string,
    updated_at: string,
    name: string
  },
  file_id: string,
  file: {
    id: string,
    created_at: string,
    updated_at: string,
    file_url: string,
    folder_id: string,
    file: string,
    name: string
  },
  tags: Array<
    {
      id: string,
      created_at: string,
      updated_at: string,
      name: "importado" | "inflamável" | "perecível" | "frágil"
    }>
}



export const columns: ColumnDef<ProductType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <div className="text-start">Id</div>,
    cell: ({ row }) => {
      return <div className="text-start font-medium">{row.getValue("id")}</div>
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-start">Nome</div>,
    cell: ({ row }) => {
      return <div className="text-start font-medium">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "cost_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          $ de custo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost_price"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)

      return <div className="text-start font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "sell_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          $ de venda
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("sell_price"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)

      return <div className="text-start font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "category",
    accessorFn: (row) => row.category.name, // <- AQUI!
    header: () => <div className="text-start">Categoria</div>,
    cell: ({ row }) => {
      return <div className="text-start font-medium">{row.original.category.name}</div>
    },
  },
  {
    accessorKey: "tags",
    header: () => <div className="text-start">Tags</div>,
    cell: ({ row }) => {
      const product = row.original
      return <div className="text-start font-medium">
        {product.tags.map(tag => tag.name).join(", ")}
      </div>

    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();

      const product = row.original

      const deleteProduct = async () => {
        await api(`/products/${product.id}`, { method: 'DELETE' })
        router.refresh()
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copiar id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={deleteProduct} >
              <Trash2 className="h-4 w-4" />
              <span>
                Excluir
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(routes.produtos.edit(product.id))}>
              <Pen className="h-4 w-4" />
              <span>
                Atualizar
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]