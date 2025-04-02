import {makeAutoObservable, action} from "mobx";
import {Band} from "types/band";
import {getBands} from "api/firebaseLoader";

class BandStore {
    bands: Band[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    setBands(bands) {
        this.bands = bands;
    }

    @action
    setLoading(loading) {
        this.loading = loading;
    }

    @action
    async loadBands() {
        this.setLoading(true);
        try {
            const bands = await getBands();
            this.setBands(bands);
        } catch (error) {
            console.error("Ошибка загрузки групп:", error);
        } finally {
            this.setLoading(false);
        }
    }
}

const bandStore = new BandStore();
export default bandStore;
