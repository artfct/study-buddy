import { signInWithEmailAndPassword } from "firebase/auth";

export default function signInWithEmailPassword(email, password, auth) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Signed in as:", userCredential.user.email);
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
}
