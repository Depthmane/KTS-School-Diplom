import { makeAutoObservable, action } from "mobx";
import { Band } from "types/band";
import { getBands } from "api/firebaseLoader";

class BandStore {
    bands: Band[] = [];
    loading: boolean = false;
    currentPage: number = 1;
    searchQuery: string = '';
    selectedCategories: string[] = [];
    lastVisible: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    @action setBands(bands: Band[]) {
        this.bands = bands;
    }

    @action setLastVisible(lastVisible: any) {
        this.lastVisible = lastVisible;
    }

    @action setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action setSearchQuery(query: string) {
        this.searchQuery = query;
    }

    @action setSelectedCategories(categories: string[]) {
        this.selectedCategories = categories;
    }

    @action setCurrentPage(page: number) {
        this.currentPage = page;
    }

    @action
    async loadBands(page: number, search: string, categories: string[]) {
        if (this.loading) return;  // Защита от повторных запросов

        this.setLoading(true);
        try {
            const { bands, lastVisible } = await getBands(page, search, categories, this.lastVisible);

            if (page === 1) {
                this.setBands(bands);
            } else {
                this.setBands([...this.bands, ...bands]);
            }

            this.setCurrentPage(page);
            this.setSearchQuery(search);
            this.setSelectedCategories(categories);
            this.setLastVisible(lastVisible);
        } catch (error) {
            console.error("Ошибка загрузки групп:", error);
        } finally {
            this.setLoading(false);
        }
    }

    @action
    async loadMoreBands() {
        const nextPage = this.currentPage + 1;
        await this.loadBands(nextPage, this.searchQuery, this.selectedCategories);
    }
}

const bandStore = new BandStore();
export default bandStore;
