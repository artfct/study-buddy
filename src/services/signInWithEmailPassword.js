// import { signInWithEmailAndPassword } from "firebase/auth";

// export default function signInWithEmailPassword(email, password, auth) {
//   return new Promise((resolve, reject) => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         console.log("Signed in as:", userCredential.user.email);
//         resolve(userCredential);
//       })
//       .catch((error) => {
//         console.error("Error signing in:", error);
//         reject(new Error("Incorrect email or password")); // Throw a custom error message
//       });
//   });
// }


import { signInWithEmailAndPassword } from "firebase/auth";
import logInCometChatUser from "../cometchat/LogInCometChatUser";

export default function signInWithEmailPassword(email, password, auth) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("Signed in as:", userCredential.user.email);
        await logInCometChatUser(userCredential.user.uid, process.env.REACT_APP_COMECHAT_AUTHKEY);
        resolve(userCredential);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        reject(new Error("Incorrect email or password")); // Throw a custom error message
      });
  });
}
