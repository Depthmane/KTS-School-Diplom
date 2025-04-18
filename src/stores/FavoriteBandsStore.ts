import { makeAutoObservable, runInAction } from "mobx";
import {
    getFavoriteBands,
    addFavoriteBand,
    removeFavoriteBand,
    getBandsByIds
} from "api/firebaseLoader/favoriteBandsLoader";
import {Band} from "types/band";

class FavoriteBandsStore {
    bands: string[] = [];
    bandsData: Band[] = []
    loading: boolean = false;
    error: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    isFavorite(bandId: string) {
        return this.bands.includes(bandId);
    }

    async fetch(userId: string) {
        this.loading = true;
        this.error = '';
        try {
            const bands = await getFavoriteBands(userId);
            runInAction(() => {
                this.bands = bands;
            });

            const bandsData = await getBandsByIds(bands);
            runInAction(() => {
                this.bandsData = bandsData;
            })
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
            const [band] = await getBandsByIds([bandId]);
            runInAction(() => {
                if (band) this.bandsData.push(band);
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
                this.bandsData = this.bandsData.filter(b => b.id !== bandId);
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
