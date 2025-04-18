import {doc, getDoc, getDocs, where, updateDoc, arrayUnion, arrayRemove, query, collection, QuerySnapshot} from "firebase/firestore";
import { db } from 'firebaseConfig';

interface UserData {
    favoriteBands: string[];
    email?: string;
}

export const getFavoriteBands = async (userId: string) => {
    try {
        const userDoc = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            return userData?.favoriteBands || [];
        }
        return [];
    } catch (error) {
        console.error('Ошибка при загрузке избранных групп - ', error);
        return [];
    }
};

export const getBandsByIds = async (ids: string[]) => {
    if (ids.length === 0) return [];

    const chunks = [];
    for (let i = 0; i < ids.length; i += 10) {
        chunks.push(ids.slice(i, i + 10));
    }

    try {
        const snapshots: QuerySnapshot[] = await Promise.all(
            chunks.map(chunk =>
                getDocs(query(collection(db, 'bands'), where('__name__', 'in', chunk)))
            )
        );

        return snapshots.flatMap(snapshot =>
            snapshot.docs.map(bandDoc => ({ id: bandDoc.id, ...bandDoc.data() }))
        );
    } catch (error) {
        console.error('Ошибка загрузки групп по ID', error);
        return [];
    }
};

export const addFavoriteBand = async (userId: string, bandId: string) => {
    try {
        const userDoc = doc(db, 'users', userId);
        await updateDoc(userDoc, {
            favoriteBands: arrayUnion(bandId),
        });
    } catch (error) {
        console.error('Ошибка добавления группы в избранное - ', error);
    }
};

export const removeFavoriteBand = async (userId: string, bandId: string) => {
    try {
        const userDoc = doc(db, 'users', userId);
        await updateDoc(userDoc, {
            favoriteBands: arrayRemove(bandId),
        });
    } catch (error) {
        console.error('Ошибка удаления группы из избранного - ', error);
    }
};
