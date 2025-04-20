import { makeAutoObservable} from "mobx";
import { Band } from "types/band";
import { getBands, getRandomBandId } from "api/firebaseLoader";
import filtersStore from "./FiltersStore";
import {Option} from "components/Multidropdown";
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import {normalizeBandData} from "utils/normilizeData";


class BandsStore {
    bands: Band[] = [];
    genres: string[] = [];
    loading: boolean = false;
    isInitialLoading: boolean = true;
    lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;
    hasMore: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    async loadBands() {
        const { searchQuery, selectedCategories, currentPage } = filtersStore;

        if (this.loading) return;

        this.setLoading(true);

        try {
            if (currentPage === 1) {
                this.setIsInitialLoading(true);
            }

            const { bands: serverBands, lastVisible } = await getBands(currentPage, searchQuery, selectedCategories, this.lastVisible);
            const normalizedBands = serverBands.map(normalizeBandData);
            const filteredBands = this.filterBandsByGenres(normalizedBands, selectedCategories);

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
            if (currentPage === 1) {
                this.setIsInitialLoading(false);
            }
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
            const { bands: serverBands, lastVisible: newLastVisible } = await getBands(i, filtersStore.searchQuery, filtersStore.selectedCategories, lastVisible);
            lastVisible = newLastVisible;

            const normalizedBands = serverBands.map(normalizeBandData);
            const filtered = this.filterBandsByGenres(normalizedBands, filtersStore.selectedCategories);

            allBands = [...allBands, ...filtered];
        }

        this.setBands(allBands);
        this.setLastVisible(lastVisible);
        this.setHasMore(allBands.length === targetPage * 10);
        this.updateGenresBasedOnCurrentBands();
    }

    get categoriesOptions(): Option[] {
        return this.genres.map(genre => ({ key: genre, value: genre }));
    }

    async fetchRandomBandId(): Promise<string | null> {
        try {
            return await getRandomBandId();
        } catch (error) {
            console.error("Ошибка при получении случайной группы:", error);
            return null;
        }
    }

    private setBands(bands: Band[]) {
        this.bands = bands;
    }

    private setGenres(genres: string[]) {
        this.genres = genres;
    }

    private setLastVisible(lastVisible: QueryDocumentSnapshot<DocumentData> | null) {
        this.lastVisible = lastVisible;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    private setIsInitialLoading(value: boolean) {
        this.isInitialLoading = value;
    }

    private setHasMore(value: boolean) {
        this.hasMore = value;
    }

    private filterBandsByGenres(bands: Band[], genres: string[]): Band[] {
        if (!genres.length) return bands;
        return bands.filter(band => genres.every(genre => band.genres.includes(genre)));
    }

    private updateGenresBasedOnCurrentBands() {
        const genresSet = new Set<string>();
        this.bands.forEach(band => {
            band.genres.forEach(genre => genresSet.add(genre));
        });
        this.setGenres(Array.from(genresSet));
    }
}

const bandsStore = new BandsStore();
export default bandsStore;

