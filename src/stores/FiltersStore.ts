import { makeAutoObservable } from "mobx";
import {Option} from "components/Multidropdown";
import {parseQueryParams} from "../utils/queryParams";

class FiltersStore {
    searchQuery: string = '';
    selectedCategories: string[] = [];
    currentPage: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    get selectedCategoriesOptions(): Option[] {
        return this.selectedCategories.map((cat) => ({key: cat, value: cat}));
    }

    syncFromSearchParams(params: URLSearchParams): { page: number, search: string, categories: string[] } {
        const {page, search, categories} = parseQueryParams(params);

        this.setSearchQuery(search);
        this.setSelectedCategories(categories);
        this.setCurrentPage(page);

        return {page, search, categories};
    }

    toSearchParams() {
        const params = new URLSearchParams();
        params.set("page", String(this.currentPage));
        if (this.searchQuery) params.set("search", this.searchQuery);
        if (this.selectedCategories.length) {
            params.set("categories", this.selectedCategories.join(","));
        }
        return params;
    }

    clearFilters() {
        this.searchQuery = '';
        this.selectedCategories = [];
        this.currentPage = 1;
    }


    private setSearchQuery(query: string) {
        this.searchQuery = query;
    }

    private setSelectedCategories(categories: string[]) {
        this.selectedCategories = categories;
    }


    private setCurrentPage(page: number) {
        this.currentPage = page;
    }
}

const filtersStore = new FiltersStore();
export default filtersStore;
