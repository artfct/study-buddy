import { 
    Auth, 
    getAuth, 
    User,
    UserCredential,
    signOut,
    signInWithEmailAndPassword as signInWithEmailPassword, 
    createUserWithEmailAndPassword as createUserWithEmailPassword, 
    sendEmailVerification as sendFirebaseEmailVerification
  } from "firebase/auth";
  import {doc, getDoc, setDoc} from 'firebase/firestore';
  import { app, firestore } from "../firebase"; 


export const setClubUserDoc = async (user) => {
    try {
      const userDocRef = doc(firestore, 'clubs', user.uid);
  
      await setDoc(userDocRef, {
        completedTutorial: false // Assuming you want to set this field to false by default
        // Other fields you want to add
      }, { merge: true });
  
      console.log('Club user document created successfully');
    } catch (error) {
      console.error('Error creating club user document:', error);
      throw new Error('Failed to create club user document');
    }
  };

export const getClubNameAndProfile = async (uid) => {
  try {
    console.log(uid);
    const userDocRef = doc(firestore, 'university_uoft_clubs', uid);
    
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData) {
        const { name, profilePhotoURL  } = userData;
        return { name, profilePhotoURL  };
        // return true; // for dev purpose
      } else {
        console.log('Firebase Fetch ERROR: club userData does not exist');
        return { name: '', profilePhotoURL: ''};
      }
    } else {
      console.log('Firebase Fetch ERROR: userDocSnap does not exist for clubs');
      return { name: '', profilePhotoURL: ''};
    }
  } catch(error) { 
    console.log('Error fetching Club name and profile', error);
  }
}
  