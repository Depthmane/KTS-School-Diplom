// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';

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

export async function getBand() {
    const db = getFirestore(app);
    const docRef = doc(db, "bands", "INTERPOL");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

export async function getBands() {
    const db = getFirestore(app);
    const bandsCol = collection(db, "bands");
    const bandSnapshot = await getDocs(bandsCol);
    const bandList = bandSnapshot.docs.map((doc) => doc.data());
    console.log("BandList: ", bandList);
}
