import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { Band, Release } from 'types/index';

export const getBands = async (): Promise<Band[]> => {
    try {
        const bandsCollection = collection(db, 'bands');
        const bandsSnapshot = await getDocs(bandsCollection);
        return bandsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Band[];
    } catch (error) {
        console.error('Error fetching bands:', error);
        return [];
    }
};

export const getBandById = async (id: string): Promise<Band | null> => {
    try {
        const bandDoc = doc(db, 'bands', id);
        const bandSnapshot = await getDoc(bandDoc);
        return bandSnapshot.exists() ? ({ id: bandSnapshot.id, ...bandSnapshot.data() } as Band) : null;
    } catch (error) {
        console.error(`Error fetching band with ID ${id}:`, error);
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
        console.error(`Error fetching releases for band ID ${bandId}:`, error);
        return [];
    }
};
