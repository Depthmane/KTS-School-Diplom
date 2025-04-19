import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";
import {auth, db} from "firebaseConfig";
import { doc, setDoc } from "firebase/firestore";


export const registerUser = async (email: string, password: string, login: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            login: login,
            email: user.email,
            createdAt: new Date()
        });

        return user;
    } catch (error) {
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