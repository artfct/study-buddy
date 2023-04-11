import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import firebaseConfig from "./firebaseConfig";
import { getStorage } from "firebase/storage"; 
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage(app); 
const rtdb = getDatabase(app); 
const firestore = getFirestore(app); 

export { app, auth, rtdb, firestore, storage, analytics };
