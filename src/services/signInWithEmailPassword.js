import { signInWithEmailAndPassword } from "firebase/auth";

export default function signInWithEmailPassword(email, password, auth) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed in as:", userCredential.user.email);
        resolve(userCredential);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        reject(new Error("Incorrect email or password")); // Throw a custom error message
      });
  });
}
