import { makeAutoObservable, action } from "mobx";
import { Band } from "types/band";
import { getBands } from "api/firebaseLoader";
import filtersStore from "./FiltersStore";

class BandStore {
    bands: Band[] = [];
    genres: string[] = [];
    loading: boolean = false;
    currentPage: number = 1;
    lastVisible: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    @action setBands(bands: Band[]) {
        this.bands = bands;
    }

    @action setGenres(genres: string[]) {
        this.genres = genres;
    }

    @action setLastVisible(lastVisible: any) {
        this.lastVisible = lastVisible;
    }

    @action setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action setCurrentPage(page: number) {
        this.currentPage = page;
    }

    @action
    async loadBands(page: number) {
        const { searchQuery, selectedCategories } = filtersStore;

        if (this.loading) return;

        this.setLoading(true);
        try {
            const { bands, lastVisible } = await getBands(page, searchQuery, [], this.lastVisible);

            const filteredBands = this.filterBandsByGenres(bands, selectedCategories);

            if (page === 1) {
                this.setBands(filteredBands);
            } else {
                this.setBands([...this.bands, ...filteredBands]);
            }

            this.setCurrentPage(page);
            this.setLastVisible(lastVisible);

            this.updateGenresBasedOnCurrentBands();
        } catch (error) {
            console.error("Ошибка загрузки групп:", error);
        } finally {
            this.setLoading(false);
        }
    }

    @action
    async loadMoreBands() {
        const nextPage = this.currentPage + 1;
        await this.loadBands(nextPage);
    }

    @action
    async getBandsWithoutGenreFilter(search: string) {
        try {
            const {bands} = await getBands(1, search, [], null);
            return {bands};
        } catch(error) {
            console.error("Ошибка при загрузке групп (загрузка без фильтра)", error);
            return {bands: []};
        }
    }

    filterBandsByGenres(bands: Band[], genres:string[]): Band[] {
        if (genres.length === 0) return bands;
        return bands.filter((band) =>
            genres.every((genre) => band.genres.includes(genre))
        );
    }

    @action
    async loadGenres() {
        try {
            const { searchQuery, selectedCategories } = filtersStore;

            const { bands } = await this.getBandsWithoutGenreFilter(searchQuery);

            const filterBands = this.filterBandsByGenres(bands, selectedCategories);

            const genresSet = new Set<string>();
            filterBands.forEach((band) => {
                band.genres.forEach((genre) => genresSet.add(genre));
            });

            this.setGenres(Array.from(genresSet));
        } catch (error) {
            console.error("Ошибка загрузки жанров:", error);
        }
    }


    @action
    updateGenresBasedOnCurrentBands() {
        const genresSet = new Set<string>();
        this.bands.forEach(band => {
            band.genres.forEach(genre => genresSet.add(genre));
        });
        this.setGenres(Array.from(genresSet));
    }
}

const bandStore = new BandStore();
export default bandStore;

