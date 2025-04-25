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
        // Проверка: не занят ли логин
        const existingLogin = await getDoc(loginRef);
        if (existingLogin.exists()) {
            throw new Error("Этот логин уже занят =(");
        }

        // Бронируем логин до регистрации
        await setDoc(loginRef, { reserved: true });

        // Создаём пользователя
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Привязываем логин к uid
        await setDoc(loginRef, { uid: user.uid }, { merge: true });

        // Создаём профиль пользователя
        await setDoc(doc(db, "users", user.uid), {
            login: login,
            email: user.email,
            createdAt: new Date()
        });

        return user;
    } catch (error: any) {
        if (error.code === "already-exists" || error.message.includes("ALREADY_EXISTS")) {
            throw new Error("Этот логин уже занят =(");
        }

        throw new Error(error.message);
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message)
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