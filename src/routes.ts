const Routes = {
    home: "/",
    bands: {
        detail: (id: string | number) => `/band/${id}`,
        mask: "/band/:id",
    },
    notFound: "*",
};

export default Routes;