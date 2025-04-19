import { makeAutoObservable } from "mobx";
import { getFavoriteBands } from "api/firebaseLoader/favoriteBandsLoader";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { UserProfile } from "types/User";

class UserStore {
    profile: UserProfile | null = null;
    loading = false;
    error = "";

    constructor() {
        makeAutoObservable(this);
    }

    async fetchUserProfileByUid(uid: string) {
        this.loading = true;
        this.error = "";
        try {
            const userDoc = await getDoc(doc(db, "users", uid));
            const data = userDoc.data();

            if (!data) throw new Error("Профиль не найден!");

            const favoriteBands = await getFavoriteBands(uid);

            this.profile = {
                id: uid,
                login: data.login,
                favoriteGenres: [], // если добавишь в базу — заполняй здесь
                favoriteBands
            };
        } catch (error) {
            this.error = error instanceof Error ? error.message : String(error);
            console.error("Ошибка при загрузке профиля пользователя:", error);
        } finally {
            this.loading = false;
        }
    }

    async fetchUserProfileByLogin(login: string) {
        this.loading = true;
        this.error = "";
        try {
            const q = query(collection(db, "users"), where("login", "==", login));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) throw new Error("Пользователь не найден!");

            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            const favoriteBands = await getFavoriteBands(docSnap.id);

            this.profile = {
                id: docSnap.id,
                login: data.login,
                favoriteGenres: [], // если нужно
                favoriteBands
            };
        } catch (error) {
            this.error = error instanceof Error ? error.message : String(error);
            console.error("Ошибка при загрузке профиля пользователя:", error);
        } finally {
            this.loading = false;
        }
    }

    clearProfile() {
        this.profile = null;
    }
}

const userStore = new UserStore();
export default userStore;
