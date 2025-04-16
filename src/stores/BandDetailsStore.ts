import { makeAutoObservable, action } from "mobx";
import { Band, Release } from "types";
import { getBandById, getReleasesByBandId } from "api/firebaseLoader";
import {ILocalStore} from "./ILocalStore";

export class BandDetailsStore implements ILocalStore {
    band: Band | null = null;
    releases: Release[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setBand(band: Band | null) {
        this.band = band;
    }

    setReleases(releases: Release[]) {
        this.releases = releases;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    async loadBandById(id: string | undefined) {
        if (!id) {
            console.error("ID не передано в loadBandById");
            return;
        }
        if (this.band?.id === id) return;
        if (this.loading) return
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

    destroy() {
        this.band = null;
        this.releases = [];
    }
}
