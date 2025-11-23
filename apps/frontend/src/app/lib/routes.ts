export const routes = {
    dashboard: "/dashboard",

    categorias: {
        list: "/dashboard/categorias",
        create: "/dashboard/categorias/novo",
        edit: (id: string) => `/dashboard/categorias/${id}/editar`,
    },

    produtos: {
        list: "/dashboard/produtos",
        create: "/dashboard/produtos/novo",
        edit: (id: string) => `/dashboard/produtos/${id}/editar`,
    },
};
