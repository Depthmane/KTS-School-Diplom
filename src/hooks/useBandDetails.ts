import { useEffect, useState } from "react";
import { getBandById, getReleasesByBandId } from "utils/firebaseLoader";
import { Band, Release } from "types";

export const useBandDetails = (id?: string) => {
    const [band, setBand] = useState<Band | null>(null);
    const [releases, setReleases] = useState<Release[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchBand = async () => {
            setLoading(true);
            try {
                // Выполняем оба запроса параллельно
                const [bandData, releasesData] = await Promise.all([
                    getBandById(id),
                    getReleasesByBandId(id)
                ]);

                if (bandData) setBand(bandData as Band);
                if (releasesData) setReleases(releasesData);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBand();
    }, [id]);

    return { band, releases, loading };
};
