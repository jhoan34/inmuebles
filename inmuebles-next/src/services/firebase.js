

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3j9GvGcpgBpIYObslaLrS_2VD59K7WOw",
    authDomain: "pagina-de-inmuebles.firebaseapp.com",
    projectId: "pagina-de-inmuebles",
    storageBucket: "pagina-de-inmuebles.appspot.com",
    messagingSenderId: "243301006126",
    appId: "1:243301006126:web:b84ca6e2cb41e7304418bf",
    measurementId: "G-5F7RED2R0R"
};

// Initialize Firebase
export const appFirebease = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebease);
export const storage = getStorage(appFirebease);













