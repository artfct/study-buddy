import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

export default async function fetchStudentInfo(uid, setStudentInfo, setScheduleData, firestore, storage) {
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
    const userDocSnapshot = await getDoc(userDoc);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();

      // Fetch profile photo from Firebase Storage
      const profilePhotoRef = ref(storage, `users/${uid}/profilePhoto`);
      const profilePhotoUrl = await getDownloadURL(profilePhotoRef);

      if (profilePhotoUrl) {
        userData.profilePhoto = profilePhotoUrl;
      }

      if (userData.courses) {
        // Convert Firestore Timestamps to JavaScript Date objects
        const convertedScheduleData = userData.courses.map((course) => ({
          ...course,
          start: course.start.toDate(),
          end: course.end.toDate(),
        }));

        console.log("Schedule data:", convertedScheduleData);
        setScheduleData(convertedScheduleData);
      } else {
        console.log("No schedule data available.");
      }
      
      console.log("Student data:", userData);
      setStudentInfo(userData);

    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching student info:", error);
  }
}
