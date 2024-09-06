import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./pagina-de-inmuebles-firebase-adminsdk-jxsm1-546da09ac6.json" assert { type: "json" };


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "pagina-de-inmuebles.appspot.com"
});

export const db = getFirestore();
export const bucket = admin.storage().bucket()