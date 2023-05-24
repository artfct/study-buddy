import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { firestore, storage, auth } from "..//firebase/firebase";
import defaultProfilePhoto from '../mockup/asset/chess.jpg';
import createCometChatUser from "../cometchat/CreateCometChatUser";


async function uploadProfilePhoto(storage, uid, file) {
  const profilePhotoRef = storageRef(storage, `users/${uid}/profilePhoto`);
  await uploadBytes(profilePhotoRef, file);
  const downloadURL = await getDownloadURL(profilePhotoRef);
  return downloadURL;
}

export async function checkEmailAndStudentId(email, studentId) {
  const usersRef = collection(firestore, 'users');
  const emailQuery = query(usersRef, where('email', '==', email));
  const idQuery = query(usersRef, where('id', '==', studentId));

  const [emailSnapshot, idSnapshot] = await Promise.all([
    getDocs(emailQuery),
    getDocs(idQuery),
  ]);

  return {
    emailExists: !emailSnapshot.empty,
    idExists: !idSnapshot.empty,
  };
}

export default async function signUpWithEmailPassword({
  email,
  password,
  studentName,
  studentId,
  username,
  bio,
  profilePhoto,
  major,
  courses,
  setError
}) {
  if (password.length < 6) {
    setError("Password should be at least 6 characters");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up as:", userCredential.user.email);
    console.log(userCredential);
    setError(''); // Clear the error message

    // Upload profile photo to Firebase Storage
    let profilePhotoURL = "";
    if (profilePhoto) {
      try {
        profilePhotoURL = await uploadProfilePhoto(storage, userCredential.user.uid, profilePhoto);
      } catch (error) {
        console.error("Error uploading profile photo:", error);
        setError(error.message);
        return;
      } 
    } else {
      // Upload default profile photo to Firebase Storage
      const response = await fetch(defaultProfilePhoto);
      const blob = await response.blob();
      const profilePhotoRef = storageRef(storage, `users/${userCredential.user.uid}/profilePhoto`);
      await uploadBytes(profilePhotoRef, blob);
      profilePhotoURL = await getDownloadURL(profilePhotoRef);
    }

    await setDoc(doc(firestore, `users`, userCredential.user.uid), {
      studentName,
      id: studentId,
      email,
      username,
      profilePhoto: profilePhotoURL,
      bio,
      major,
      courses: courses || [],
    });

    // Create CometChat user
    const authKey = process.env.REACT_APP_COMECHAT_AUTHKEY;
    const uid = userCredential.user.uid;
    const name = username;

    await createCometChatUser(uid, name, authKey);
    

  } catch (error) {
    console.error("Error signing up:", error);

    // Display a proper message to the user based on the error code
    if (error.code === "auth/email-already-in-use") {
      alert("The email address is already in use by another account.");
    } else {
      alert("An error occurred while signing up. Please try again.");
    }
    return null;
  }
}
