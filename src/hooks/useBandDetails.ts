import {useEffect, useState} from 'react';
import {getBandById, getReleasesByBandId} from 'utils/firebaseLoader/firebaseLoader';
import {Band, Release} from "types";


export const useBandDetails = (id: string | undefined) => {
    const [band, setBand] = useState<Band | null>(null);
    const [releases, setReleases] = useState<Release[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchBand = async () => {
            setLoading(true);
            const data = await getBandById(id);
            if (data) setBand(data as Band);

            const releasesData = await getReleasesByBandId(id);
            if (releasesData) setReleases(releasesData);
            setLoading(false);
        };

        fetchBand();
    }, [id]);

    return {band, releases, loading};
};
