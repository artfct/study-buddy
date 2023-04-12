import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { firestore, storage, auth } from "..//firebase/firebase";

async function uploadProfilePhoto(storage, uid, file) {
  const profilePhotoRef = storageRef(storage, `users/${uid}/profilePhoto`);
  await uploadBytes(profilePhotoRef, file);
  const downloadURL = await getDownloadURL(profilePhotoRef);
  return downloadURL;
}

export default async function signUpWithEmailPassword({
  email,
  password,
  studentName,
  studentId,
  username,
  bio,
  profilePhoto,
  setError
}) {
  if (password.length < 6) {
    setError("Password should be at least 6 characters");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up as:", userCredential.user.email);
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
    }

    await setDoc(doc(firestore, `users`, userCredential.user.uid), {
      studentName,
      id: studentId,
      username,
      profilePhoto: profilePhotoURL,
      bio,
    });

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
