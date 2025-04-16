import { makeAutoObservable } from "mobx";
import { Band, Release } from "types";
import { getBandById, getReleasesByBandId } from "api/firebaseLoader";
import { ILocalStore } from "./ILocalStore";
import {normalizeBandData, normalizeReleaseData} from "utils/normilizeData";

export class BandDetailsStore implements ILocalStore {
    band: Band | null = null;
    releases: Release[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }


    async loadBandById(id: string | undefined) {
        if (!id) {
            console.error("ID не передано в loadBandById");
            return;
        }
        if (this.band?.id === id || this.loading) return;

        this.setLoading(true);
        try {
            const serverBand = await getBandById(id);
            const bandReleases = await getReleasesByBandId(id);

            if (serverBand) {
                const normalizedBand = normalizeBandData(serverBand);
                this.setBand(normalizedBand);
            }

            if (bandReleases) {
                const normalizedReleases = bandReleases.map(normalizeReleaseData);
                this.setReleases(normalizedReleases);
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


    private setBand(band: Band | null) {
        this.band = band;
    }

    private setReleases(releases: Release[]) {
        this.releases = releases;
    }

    private setLoading(loading: boolean) {
        this.loading = loading;
    }
}
