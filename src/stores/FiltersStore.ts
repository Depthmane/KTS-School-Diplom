import { makeAutoObservable } from "mobx";
import {Option} from "components/Multidropdown";
import {parseQueryParams} from "../utils/queryParams";

class FiltersStore {
    searchQuery: string = '';
    selectedCategories: string[] = [];
    currentPage: number = 1;
    hideFavorites: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get selectedCategoriesOptions(): Option[] {
        return this.selectedCategories.map((cat) => ({key: cat, value: cat}));
    }

    syncFromSearchParams(params: URLSearchParams): { page: number, search: string, categories: string[], hideFavorites:boolean } {
        const {page, search, categories, hideFavorites} = parseQueryParams(params);

        this.setSearchQuery(search.toLowerCase());
        this.setSelectedCategories(categories);
        this.setCurrentPage(page);
        this.setHideFavorites(hideFavorites)

        return {page, search, categories, hideFavorites};
    }

    toSearchParams() {
        const params = new URLSearchParams();
        params.set("page", String(this.currentPage));
        if (this.searchQuery) params.set("search", this.searchQuery);
        if (this.hideFavorites) params.set("hideFavorites", "true");
        if (this.selectedCategories.length) {
            params.set("categories", this.selectedCategories.join(","));
        }
        return params;
    }

    clearFilters() {
        this.searchQuery = '';
        this.selectedCategories = [];
        this.currentPage = 1;
        this.hideFavorites = false;
    }


    setSearchQuery(query: string) {
        this.searchQuery = query;
    }

    setSelectedCategories(categories: string[]) {
        this.selectedCategories = categories;
    }


    setCurrentPage(page: number) {
        this.currentPage = page;
    }

    setHideFavorites(hide: boolean) {
        this.hideFavorites = hide;
    }
}

const filtersStore = new FiltersStore();
export default filtersStore;
