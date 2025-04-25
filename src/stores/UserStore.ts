import { makeAutoObservable } from "mobx";
import { getFavoriteBands } from "api/firebaseLoader/favoriteBandsLoader";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { UserProfile } from "types/user";
import notFoundPage from "../App/pages/NotFoundPage";

class UserStore {
    ownProfile: UserProfile | null = null;
    viewedProfile: UserProfile | null = null;
    loading = false;
    error = "";

    constructor() {
        makeAutoObservable(this);
    }

    async fetchOwnProfile(uid: string) {
        this.loading = true;
        this.error = "";
        try {
            const userDoc = await getDoc(doc(db, "users", uid));
            const data = userDoc.data();

            if (!data) throw new Error("Профиль не найден!");

            const favoriteBands = await getFavoriteBands(uid);

            this.ownProfile = {
                id: uid,
                login: data.login,
                favoriteGenres: [],
                favoriteBands
            };
        } catch (error) {
            this.error = error instanceof Error ? error.message : String(error);
            console.error("Ошибка при загрузке вашего пользователя:", error);
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

            this.viewedProfile = {
                id: docSnap.id,
                login: data.login,
                favoriteGenres: [],
                favoriteBands
            };

            return this.viewedProfile;
        } catch (error) {
            this.error = error instanceof Error ? error.message : String(error);
            console.error("Ошибка при загрузке профиля пользователя:", error);
            return null;
        } finally {
            this.loading = false;
        }
    }

    clearOwnProfile() {
        this.ownProfile = null;
    }

    clearViewedProfile() {
        this.viewedProfile = null;
    }
}

const userStore = new UserStore();
export default userStore;