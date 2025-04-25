import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";
import {auth, db} from "firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";



export const registerUser = async (email: string, password: string, login: string) => {
    const loginRef = doc(db, "users_logins", login);

    try {
        const existingLogin = await getDoc(loginRef);
        if (existingLogin.exists()) {
            throw { code: "auth/login-already-in-use", message: "Этот логин уже занят." };
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(loginRef, { reserved: true });

        // Привязываем uid к логину
        await setDoc(loginRef, { uid: user.uid }, { merge: true });

        // Создаем профиль пользователя
        await setDoc(doc(db, "users", user.uid), {
            login: login,
            email: user.email,
            createdAt: new Date()
        });

        return user;
    } catch (error: any) {
        const errorMessage = {
            code: error.code || "auth/unknown-error",
            message: error.message || "Ошибка регистрации"
        };
        throw errorMessage;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: any) {
        throw {
            code: error.code || null,
            message: error.message || "Ошибка входа"
        };
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message)
    }
};

export const getCurrentUser = () => {
    return new Promise<User | null>((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });
};