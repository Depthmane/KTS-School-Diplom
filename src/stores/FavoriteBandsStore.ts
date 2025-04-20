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

class FavoriteBandsStore {
    bands: string[] = [];
    bandsData: Band[] = []
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

    clear() {
        this.bands = [];
    }
}

const favoriteBandsStore = new FavoriteBandsStore();
export default favoriteBandsStore;
