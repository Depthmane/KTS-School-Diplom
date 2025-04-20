export type QueryParams = {
    page: number;
    search: string;
    categories: string[];
    hideFavorites: boolean;
};

export const parseQueryParams = (params: URLSearchParams): QueryParams => {
    return {
        page: parseInt(params.get("page") || "1", 10),
        search: params.get("search") || "",
        categories: params.get("categories") ? params.get("categories")!.split(",") : [],
        hideFavorites: params.get("hideFavorites") === 'true',
    };
};