export const routes = {
    dashboard: "/dashboard",

    categorias: {
        list: "/dashboard/categorias",
        create: "/dashboard/categorias/new",
        edit: (id: string) => `/dashboard/categorias/${id}`,
    },

    produtos: {
        list: "/dashboard/produtos",
        create: "/dashboard/produtos/new",
        edit: (id: string) => `/dashboard/produtos/${id}`,
    },
};
