export const deleteUser = async (auth, firestore, storage, userId) => {
    try {
      // Delete user's Firestore data
      await firestore.collection('users').doc(userId).delete();
  
      // Delete user's Auth data
      await auth.deleteUser(userId);
  
      // Delete user's Storage data
      const storageRef = storage.ref(`users/${userId}`);
      const files = await storageRef.listAll();
      await Promise.all(files.items.map(item => item.delete()));
  
      return true; // Return true if deletion is successful
    } catch (error) {
      console.error('Error deleting user:', error);
      return false; // Return false if deletion fails
    }
  };
  