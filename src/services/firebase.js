import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };