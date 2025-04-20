import { collection, doc, getDoc, getDocs, query, where, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { ServerBand, ServerRelease } from 'types';

export const getBands = async (
    page: number,
    search: string,
    categories: string[],
    lastVisible: QueryDocumentSnapshot<DocumentData> | null
): Promise<{ bands: ServerBand[], lastVisible: QueryDocumentSnapshot<DocumentData> | null }> => {
    try {
        const bandsCollection = collection(db, 'bands');
        let q = query(bandsCollection, limit(10));

        if (search) {
            q = query(
                q,
                where('search_keywords', 'array-contains', search.toLowerCase())
            );
        }

        if (categories.length > 0) {
            q = query(q, where('genres', 'array-contains-any', categories));
        }

        if (lastVisible) {
            q = query(q, startAfter(lastVisible));
        }

        const bandsSnapshot = await getDocs(q);
        const bands = bandsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ServerBand[];

        const newLastVisible = bandsSnapshot.docs[bandsSnapshot.docs.length - 1];

        return { bands, lastVisible: newLastVisible };
    } catch (error) {
        console.error('Error fetching bands:', error);
        return { bands: [], lastVisible: null };
    }
};

export const getBandById = async (id: string): Promise<ServerBand | null> => {
    try {
        const bandDoc = doc(db, 'bands', id);
        const bandSnapshot = await getDoc(bandDoc);

        return bandSnapshot.exists()
            ? ({ id: bandSnapshot.id, ...bandSnapshot.data() } as ServerBand)
            : null;
    } catch (error) {
        console.error(`Error fetching band with ID ${id}:`, error);
        return null;
    }
};

export const getReleasesByBandId = async (bandId: string): Promise<ServerRelease[]> => {
    try {
        const releasesRef = collection(db, 'releases');
        const q = query(releasesRef, where('band_id', '==', bandId));
        const releasesSnapshot = await getDocs(q);

        return releasesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ServerRelease[];
    } catch (error) {
        console.error("Error fetching releases for band ID ${bandId}:", error);
        return [];
    }
};
export const getRandomBandId = async (): Promise<string | null> => {
    const snapshot = await getDocs(collection(db, "bands"));
    const allBands = snapshot.docs.map(doc => doc.id);

    if (allBands.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * allBands.length);
    return allBands[randomIndex]; // плохо оптимизировано, надо бы придумать как изменить метод
};

export const getSimilarBands = async (genres: string[], currentId: string): Promise<ServerBand[]> => {
    if (!genres.length) return [];

    const bandsCollection = collection(db, 'bands');
    const uniqueResults: Record<string, ServerBand> = {};

    try {
        const exactQuery = query(
            bandsCollection,
            where('genres', '==', genres),
            limit(4)
        );
        const exactSnapshot = await getDocs(exactQuery);
        exactSnapshot.docs.forEach(doc => {
            const band = { id: doc.id, ...doc.data() } as ServerBand;
            if (band.id !== currentId) uniqueResults[band.id] = band;
        });

        if (Object.keys(uniqueResults).length < 3) {
            const twoMatchGenres = genres.slice(0, 2);
            if (twoMatchGenres.length) {
                const twoMatchQuery = query(
                    bandsCollection,
                    where('genres', 'array-contains-any', twoMatchGenres),
                    limit(6)
                );
                const twoMatchSnapshot = await getDocs(twoMatchQuery);
                twoMatchSnapshot.docs.forEach(doc => {
                    const band = { id: doc.id, ...doc.data() } as ServerBand;
                    if (band.id !== currentId) uniqueResults[band.id] = band;
                });
            }
        }

        if (Object.keys(uniqueResults).length < 3) {
            const oneMatchQuery = query(
                bandsCollection,
                where('genres', 'array-contains-any', genres),
                limit(10)
            );
            const oneMatchSnapshot = await getDocs(oneMatchQuery);
            oneMatchSnapshot.docs.forEach(doc => {
                const band = { id: doc.id, ...doc.data() } as ServerBand;
                if (band.id !== currentId) uniqueResults[band.id] = band;
            });
        }

        return Object.values(uniqueResults).slice(0, 3);
    } catch (error) {
        console.error('Ошибка загрузки похожих групп', error);
        return [];
    }
};