import { makeAutoObservable, runInAction } from "mobx";
import { getFavoriteBands, addFavoriteBand, removeFavoriteBand } from "api/firebaseLoader/favoriteBandsLoader";

class FavoriteBandsStore {
    bands: string[] = [];
    loading: boolean = false;
    error: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    async fetch(userId: string) {
        this.loading = true;
        this.error = '';
        try {
            const bands = await getFavoriteBands(userId);
            runInAction(() => {
                this.bands = bands;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async add(userId: string, bandId: string) {
        try {
            await addFavoriteBand(userId, bandId);
            runInAction(() => {
                this.bands.push(bandId);
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });
        }
    }

    async remove(userId: string, bandId: string) {
        try {
            await removeFavoriteBand(userId, bandId);
            runInAction(() => {
                this.bands = this.bands.filter(id => id !== bandId);
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });
        }
    }
}

const favoriteBandsStore = new FavoriteBandsStore();
export default favoriteBandsStore;
