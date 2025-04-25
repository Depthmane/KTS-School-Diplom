import {onAuthStateChanged, User} from "firebase/auth";
import {makeAutoObservable} from "mobx";
import { auth } from "firebaseConfig";
import {getCurrentUser, loginUser, logoutUser, registerUser} from "api/firebaseLoader/authLoader";
import userStore from "./UserStore";
import favoriteBandsStore from "./FavoriteBandsStore";
import { getAuthErrorMessage } from "utils/getAuthErrorMessage";

class AuthStore {
    user: User | null = null;
    loading: boolean = false;
    error: string = '';

    constructor() {
        makeAutoObservable(this)
    }

    private async observerUser() {
        this.user = await getCurrentUser();
    }

    async register(email: string, password: string, login: string) {
        this.loading = true;
        this.error = '';
        try {
            this.user = await registerUser(email, password, login);
            await userStore.fetchOwnProfile(this.user.uid);
        } catch (error: any) {
            this.error = getAuthErrorMessage(error.code || null);
            console.log('REGISTER ERROR:', this.error);
        } finally {
            this.loading = false;
        }
    }

    async login(email: string, password: string) {
        this.loading = true;
        this.error = '';
        try {
            this.user = await loginUser(email, password);
            if (this.user) {
                await userStore.fetchOwnProfile(this.user.uid);
                await favoriteBandsStore.fetchForUser(this.user.uid, true);
            }
        } catch (error: any) {
            this.error = getAuthErrorMessage(error.code || null);
        } finally {
            this.loading = false;
        }
    }
    checkAuth() {
        onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                console.log("Авторизован Firebase-пользователь:", firebaseUser.uid);
                await userStore.fetchOwnProfile(firebaseUser.uid);
                this.user = firebaseUser;
                await favoriteBandsStore.fetchForUser(this.user.uid, true);
            } else {
                console.log("Нет авторизованного пользователя");
                userStore.clearOwnProfile();
                this.user = null;
            }
        });
    }

    async logout() {
        this.loading = true;
        this.error = '';

        try {
            await logoutUser();
            userStore.clearOwnProfile();
            favoriteBandsStore.clear();
            this.user = null;
/*            window.location.href = "/";*/
        } catch (error) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    }
}

const authStore = new AuthStore();
export default authStore