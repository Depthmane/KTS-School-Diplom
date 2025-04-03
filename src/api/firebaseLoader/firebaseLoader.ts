import { collection, doc, getDoc, getDocs, query, where, limit, startAfter } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { Band, Release } from 'types/index';

export const getBands = async (
    page: number,
    search: string,
    categories: string[],
    lastVisible: any
): Promise<{ bands: Band[], lastVisible: any }> => {
    try {
        const bandsCollection = collection(db, 'bands');
        let q = query(bandsCollection, limit(10));

        if (search) {
            q = query(q, where('name', '>=', search), where('name', '<=', search + '\uf8ff'));
        }

        if (categories.length > 0) {
            q = query(q, where('genres', 'array-contains-any', categories));
        }

        if (lastVisible) {
            q = query(q, startAfter(lastVisible));
        }

        const bandsSnapshot = await getDocs(q);
        const bands = bandsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Band[];

        const newLastVisible = bandsSnapshot.docs[bandsSnapshot.docs.length - 1];

        return { bands, lastVisible: newLastVisible };
    } catch (error) {
        console.error('Error fetching bands:', error);
        return { bands: [], lastVisible: null };
    }
};


export const getBandById = async (id: string): Promise<Band | null> => {
    try {
        const bandDoc = doc(db, 'bands', id);
        const bandSnapshot = await getDoc(bandDoc);
        return bandSnapshot.exists() ? ({ id: bandSnapshot.id, ...bandSnapshot.data() } as Band) : null;
    } catch (error) {
        console.error("Error fetching band with ID ${id}:", error);
        return null;
    }
};

export const getReleasesByBandId = async (bandId: string): Promise<Release[]> => {
    try {
        const releasesRef = collection(db, 'releases');
        const q = query(releasesRef, where('band_id', '==', bandId));
        const releasesSnapshot = await getDocs(q);

        return releasesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Release[];
    } catch (error) {
        console.error("Error fetching releases for band ID ${bandId}:", error);
        return [];
    }
};