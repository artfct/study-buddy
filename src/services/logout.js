import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function logout() {

  const handleLogout = () => {
    return signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return handleLogout;
}
