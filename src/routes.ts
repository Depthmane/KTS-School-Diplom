const Routes = {
    home: "/",
    bands: {
        detail: (id: string | number) => `/band/${id}`,
        mask: "/band/:id",
    },
    profile: {
        self: (login: string) => `/profile/${login}`,
        mask: "/profile/:login"
    },
    notFound: "*",
};

export default Routes;