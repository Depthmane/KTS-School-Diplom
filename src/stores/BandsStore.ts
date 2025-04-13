import { makeAutoObservable } from "mobx";
import { Band } from "types/band";
import { getBands } from "api/firebaseLoader";
import filtersStore from "./FiltersStore";

class BandsStore {
    bands: Band[] = [];
    genres: string[] = [];
    loading: boolean = false;
    lastVisible: any = null;
    hasMore: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    setBands(bands: Band[]) {
        this.bands = bands;
    }

    setGenres(genres: string[]) {
        this.genres = genres;
    }

    setLastVisible(lastVisible: any) {
        this.lastVisible = lastVisible;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setHasMore(value: boolean) {
        this.hasMore = value;
    }

    async loadBands() {
        const { searchQuery, selectedCategories, currentPage } = filtersStore;

        if (this.loading) return;

        this.setLoading(true);
        try {
            const { bands, lastVisible } = await getBands(currentPage, searchQuery, selectedCategories, this.lastVisible);
            const filteredBands = this.filterBandsByGenres(bands, selectedCategories);

            if (currentPage === 1) {
                this.setBands(filteredBands);
            } else {
                this.setBands([...this.bands, ...filteredBands]);
            }

            this.setLastVisible(lastVisible);
            this.setHasMore(filteredBands.length === 10);

            this.updateGenresBasedOnCurrentBands();
        } catch (error) {
            console.error("Ошибка загрузки групп:", error);
        } finally {
            this.setLoading(false);
        }
    }

    async loadMoreBands() {
        await this.loadBands();
    }

    async preparePaginationCursor(targetPage: number) {
        this.setLastVisible(null);
        let lastVisible = null;
        let allBands: Band[] = [];

        for (let i = 1; i <= targetPage; i++) {
            const { bands, lastVisible: newLastVisible } = await getBands(i, filtersStore.searchQuery, filtersStore.selectedCategories, lastVisible);
            lastVisible = newLastVisible;
            const filtered = this.filterBandsByGenres(bands, filtersStore.selectedCategories);
            allBands = [...allBands, ...filtered];
        }

        this.setBands(allBands);
        this.setLastVisible(lastVisible);
        this.setHasMore(allBands.length === targetPage * 10);
        this.updateGenresBasedOnCurrentBands();
    }

    filterBandsByGenres(bands: Band[], genres: string[]): Band[] {
        if (!genres.length) return bands;
        return bands.filter((band) => genres.every((genre) => band.genres.includes(genre)));
    }

    updateGenresBasedOnCurrentBands() {
        const genresSet = new Set<string>();
        this.bands.forEach(band => {
            band.genres.forEach(genre => genresSet.add(genre));
        });
        this.setGenres(Array.from(genresSet));
    }
}

const bandsStore = new BandsStore();
export default bandsStore;
