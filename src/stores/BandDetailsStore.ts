import { makeAutoObservable, action } from "mobx";
import { Band, Release } from "types/index";
import { getBandById, getReleasesByBandId } from "api/firebaseLoader";

class BandDetailsStore {
    band: Band | null = null;
    releases: Release[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    setBand(band: Band | null) {
        this.band = band;
    }

    @action
    setReleases(releases: Release[]) {
        this.releases = releases;
    }

    @action
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action
    async loadBandById(id: string) {
        if (this.band?.id === id) return;
        this.setLoading(true);
        try {
            const bandData = await getBandById(id);
            const bandReleases = await getReleasesByBandId(id);

            if (bandData) {
                this.setBand(bandData);
            }

            if (bandReleases) {
                this.setReleases(bandReleases);
            }
        } catch (error) {
            console.log("Ошибка загрузки данных", error);
        } finally {
            this.setLoading(false);
        }
    }
}

const bandDetailsStore = new BandDetailsStore();
export default bandDetailsStore;
