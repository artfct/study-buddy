import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

export const DeleteUser = async (userId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleDeleteUser = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        // Delete user's Firestore data
        await firebase.firestore().collection('users').doc(userId).delete();
  
        // Delete user's Auth data
        await firebase.auth().deleteUser(userId);
  
        // Delete user's Storage data
        const storageRef = firebase.storage().ref(`users/${userId}`);
        const files = await storageRef.listAll();
        await Promise.all(files.items.map(item => item.delete()));
  
        setIsLoading(false);
        alert(`User ${userId} has been deleted.`);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
};
