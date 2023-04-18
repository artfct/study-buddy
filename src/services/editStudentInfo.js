import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

async function editStudentInfo(uid, updatedInfo, firestore, storage) {
  if (!firestore) {
    console.error('Firestore instance is not provided');
    return;
  }

  if (!storage) {
    console.error('Storage instance is not provided');
    return;
  }

  const userDoc = doc(firestore, 'users', uid);

  try {
    // Upload the new profile photo to Firebase Storage if it exists
    if (updatedInfo.profilePhoto && updatedInfo.profilePhoto instanceof File) {
      const profilePhotoRef = ref(storage, `users/${uid}/profilePhoto`);
      await uploadBytes(profilePhotoRef, updatedInfo.profilePhoto);
      const profilePhotoUrl = await getDownloadURL(profilePhotoRef);
      updatedInfo.profilePhoto = profilePhotoUrl;
    }

    // Update the Firestore document with the new information
    const updateData = {
      studentName: updatedInfo.studentName,
      id: updatedInfo.id,
      bio: updatedInfo.bio,
      major: updatedInfo.major,
    };

    if (updatedInfo.profilePhoto) {
      updateData.profilePhoto = updatedInfo.profilePhoto;
    }

    await updateDoc(userDoc, updateData);

    console.log('Student info updated successfully');
  } catch (error) {
    console.error('Error updating student info:', error);
  }
}

export default editStudentInfo;
