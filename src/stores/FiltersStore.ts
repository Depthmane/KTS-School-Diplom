import {makeAutoObservable, action} from "mobx";

class FiltersStore {
    searchQuery: string = '';
    selectedCategories: string[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    @action
    setSearchQuery (query: string) {
        this.searchQuery = query;
}
    @action
    setSelectedCategories (categories: string[]) {
        this.selectedCategories = categories;
    }

    @action
    clearFilters() {
        this.searchQuery = '';
        this.selectedCategories =[];
    }
}

const filtersStore = new FiltersStore()
export default filtersStore