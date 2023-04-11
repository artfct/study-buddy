import { getAuth, signOut } from "firebase/auth";

export default function logout() {
  const auth = getAuth();

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
