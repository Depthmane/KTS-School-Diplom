import { makeAutoObservable, runInAction } from "mobx";
import {
    getFavoriteBands,
    addFavoriteBand,
    removeFavoriteBand,
    getBandsByIds
} from "api/firebaseLoader/favoriteBandsLoader";
import {Band} from "types/band";
import {collection, getDocs} from "firebase/firestore";
import {db} from "firebaseConfig";
import {normalizeBandData} from "../utils/normilizeData";

class FavoriteBandsStore {
    bands: string[] = [];
    bandsData: Band[] = []
    viewedUserBands: Band[] = [];
    loading: boolean = false;
    error: string = '';
    favoriteBandIds: Set<string> = new Set();

    constructor() {
        makeAutoObservable(this);
    }

    isFavorite(bandId: string) {
        return this.bands.includes(bandId);
    }

    async loadFavoriteBands(userId: string) {
        const snapshot = await getDocs(collection(db, `users/${userId}/favoriteBands`));
        this.favoriteBandIds = new Set(snapshot.docs.map(doc => doc.id));
    }

    async fetchForUser(userId: string, isCurrentUser = false) {
        this.loading = true;
        this.error = '';
        try {
            const bands = await getFavoriteBands(userId);
            const bandsData = await getBandsByIds(bands);
            const normalizedBandsData = bandsData.map(normalizeBandData);

            runInAction(() => {
                if (isCurrentUser) {
                    this.bands = bands;
                    this.bandsData = normalizedBandsData;
                } else {
                    this.viewedUserBands = normalizedBandsData;
                }
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

                this.bandsData = this.bandsData.filter(band => band.id !== bandId);
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });
        }
    }

    clear() {
        this.bands = [];
        this.bandsData = [];
        this.favoriteBandIds.clear();
    }
}

const favoriteBandsStore = new FavoriteBandsStore();
export default favoriteBandsStore;