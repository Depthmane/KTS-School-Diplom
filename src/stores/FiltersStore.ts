import { makeAutoObservable } from "mobx";
import {Option} from "components/Multidropdown";

class FiltersStore {
    searchQuery: string = '';
    selectedCategories: string[] = [];
    currentPage: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    setSearchQuery(query: string) {
        this.searchQuery = query;
    }

    setSelectedCategories(categories: string[]) {
        this.selectedCategories = categories;
    }

    get selectedCategoriesOptions(): Option[] {
        return this.selectedCategories.map((cat) => ({ key: cat, value: cat }));
    }


    setCurrentPage(page: number) {
        this.currentPage = page;
    }

    clearFilters() {
        this.searchQuery = '';
        this.selectedCategories = [];
        this.currentPage = 1;
    }

    syncFromSearchParams(params: URLSearchParams) {
        const page = parseInt(params.get("page") || "1", 10);
        const search = params.get("search") || '';
        const categories = params.get("categories") ? params.get("categories")!.split(",") : [];

        this.setSearchQuery(search);
        this.setSelectedCategories(categories);
        this.setCurrentPage(page);
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
}

const filtersStore = new FiltersStore();
export default filtersStore;
