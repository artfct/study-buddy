// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { set, ref } from "firebase/database";

// export default function signUpWithEmailPassword(email, password, studentName, studentId, auth, db, setError) {
//   if (password.length < 6) {
//     setError("Password should be at least 6 characters");
//     return;
//   }

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       console.log("Signed up as:", userCredential.user.email);
//       setError(''); // Clear the error message

//       // Save the student name and ID to the user's profile
//       console.log("Saving student info:", { name: studentName, id: studentId }); // Add this line
//       set(ref(db, `users/${userCredential.user.uid}/student`), {
//         name: studentName,
//         id: studentId,
//       });
//     })
//     .catch((error) => {
//       console.error("Error signing up:", error);
//       setError(error.message);
//     });
// }

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";

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
  auth,
  rtdb,
  storage,
  setError
}) {

    // Upload profile photo to Firebase Storage
    let profilePhotoURL = "";
    if (profilePhoto) {
      try {
        profilePhotoURL = await uploadProfilePhoto(storage, studentId, profilePhoto);
      } catch (error) {
        console.error("Error uploading profile photo:", error);
        setError(error.message);
        return;
      }
    }

  if (password.length < 6) {
    setError("Password should be at least 6 characters");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up as:", userCredential.user.email);
    setError(''); // Clear the error message

    // Save the student name, ID, username, and bio to the user's profile
    // console.log("Saving student info:", userData);

    // Upload the photo to Firebase Storage
    const profilePhotoPath = `users/${userCredential.user.uid}/profilePhoto`;
    const photoRef = storageRef(storage, profilePhotoPath);

    await uploadBytes(photoRef, profilePhoto);
    const photoURL = await getDownloadURL(photoRef);
    console.log('Name:', studentName);
    await set(ref(rtdb, `users/${userCredential.user.uid}/student`), {
      studentName,
      id: studentId,
      username,
      profilePhoto: photoURL,
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
