import {collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore';
import {db} from 'firebaseConfig';

export const getBands = async () => {
    const bandsCollection = collection(db, 'bands');
    const bandsSnapshot = await getDocs(bandsCollection);
    return bandsSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
};

export const getBandById = async (id: string) => {
    const bandDoc = doc(db, 'bands', id);
    const bandSnapshot = await getDoc(bandDoc);
    return bandSnapshot.exists() ? {id: bandSnapshot.id, ...bandSnapshot.data()} : null;
};

export const getReleasesByBandId = async (bandId: string) => {
    const releasesRef = collection(db, 'releases');
    const q = query(releasesRef, where('band_id', '==', bandId));
    const releasesSnapshot = await getDocs(q);

    const releases: any[] = [];
    releasesSnapshot.forEach(doc => {
        releases.push(doc.data());
    });

    return releases;
};
