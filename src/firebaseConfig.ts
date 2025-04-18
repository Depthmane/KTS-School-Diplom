// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA62E9-yEifpWl9lGRRBZhUt5y9NSVFwdA",
    authDomain: "bandpedia-56963.firebaseapp.com",
    projectId: "bandpedia-56963",
    storageBucket: "bandpedia-56963.firebasestorage.app",
    messagingSenderId: "553404216017",
    appId: "1:553404216017:web:2bb849e6db4603525d0bf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)