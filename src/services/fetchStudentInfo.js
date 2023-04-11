// import { ref, onValue } from 'firebase/database';


// export default function fetchStudentInfo(uid, setStudentInfo, setScheduleData, rtdb) {
//   if (!rtdb) {
//     console.error('Database instance is not provided');
//     return;
//   }

//   const userRef = ref(rtdb, `users/${uid}`);

//   onValue(userRef, (snapshot) => {
//     const data = snapshot.val();
//     if (data) {
//       console.log("Student data:", data);
//       setStudentInfo(data);
//       console.log("Schedule data:", data.courses)
//       if (data.courses) {
//         setScheduleData(data);
//       } else {
//         console.log("No schedule data available.");
//       }
//     } else {
//       console.log("No such document!");
//     }
//   }, (error) => {
//     console.error("Error fetching student info:", error);
//   }, {
//     onlyOnce: true
//   });
// }


import { ref, onValue } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';

export default async function fetchStudentInfo(uid, setStudentInfo, rtdb, firestore) {
  if (!rtdb) {
    console.error('Realtime Database instance is not provided');
    return;
  }

  if (!firestore) {
    console.error('Firestore instance is not provided');
    return;
  }

  const userRef = ref(rtdb, `users/${uid}`);

  onValue(userRef, async (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Fetch profile photo from Firestore
      const profilePhotoRef = doc(firestore, 'profilePhotos', uid);
      const profilePhotoDoc = await getDoc(profilePhotoRef);

      if (profilePhotoDoc.exists()) {
        const profilePhotoData = profilePhotoDoc.data();
        data.profilePhoto = profilePhotoData.photoUrl;
      }

      console.log("Student data:", data);
      setStudentInfo(data);
    } else {
      console.log("No such document!");
    }
  }, (error) => {
    console.error("Error fetching student info:", error);
  }, {
    onlyOnce: true
  });
}
