import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
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
