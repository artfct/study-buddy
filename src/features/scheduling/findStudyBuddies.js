// import { collection, getDocs, query, where } from "firebase/firestore";

// export default async function findStudyBuddies(uid, setStudyBuddies, searchTerm, firestore) {
//   const usersRef = collection(firestore, "users");
//   const q = query(usersRef, where("uid", "!=", uid));
//   const querySnapshot = await getDocs(q);

//   const currentUserDocSnapshot = await getDocs(query(usersRef, where("uid", "==", uid)));
//   console.log(currentUserDocSnapshot);
//   const currentUserData = currentUserDocSnapshot.docs[0]?.data();
//   const currentUserCourses = currentUserData?.courses || [];
//   const currentUserCourseCodes = currentUserCourses.map((c) => c.code);

//   console.log(currentUserData);
//   console.log(currentUserCourseCodes);

//   let studyBuddies = [];

//   querySnapshot.forEach((doc) => {
//     const buddy = doc.data();
//     const buddyCourses = buddy.courses || [];
//     const commonCourses = buddyCourses.filter((c) => currentUserCourseCodes.includes(c.code));
//     const buddyName = buddy.studentName || "";

//     if (commonCourses.length > 0 && buddyName.toLowerCase().includes(searchTerm.toLowerCase())) {
//       studyBuddies.push({
//         student: { name: buddy.studentName, email: buddy.email },
//         commonCourses,
//       });
//     }
//   });

//   if (studyBuddies.length === 0) {
//     studyBuddies.push({ noMatches: true });
//   }

//   console.log("studyBuddies:", studyBuddies);
//   setStudyBuddies(studyBuddies);
// }


// import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

// export default async function findStudyBuddies(uid, setStudyBuddies, searchTerm, firestore) {
//   const usersRef = collection(firestore, "users");
//   const q = query(usersRef, where("uid", "!=", uid));
//   const querySnapshot = await getDocs(q);

//   const usersSnapshot = await getDocs(usersRef);
//   console.log("All users:", usersSnapshot.docs.map(doc => doc.data()));


//   const currentUserDocRef = doc(firestore, "users", uid);
//   const currentUserDocSnapshot = await getDoc(currentUserDocRef);
//   console.log(currentUserDocSnapshot);
//   const currentUserData = currentUserDocSnapshot.data();
//   const currentUserCourses = currentUserData?.courses || [];
//   const currentUserCourseCodes = currentUserCourses.map((c) => c.code);

//   console.log(currentUserData);
//   console.log(currentUserCourseCodes);

//   let studyBuddies = [];

//   querySnapshot.forEach((doc) => {
//     const buddy = doc.data();
//     const buddyCourses = buddy.courses || [];
//     const commonCourses = buddyCourses.filter((c) => currentUserCourseCodes.includes(c.code));
//     const buddyName = buddy.studentName || "";
  
//     console.log("buddy:", buddy);
//     console.log("buddyCourses:", buddyCourses);
//     console.log("commonCourses:", commonCourses);
//     console.log("buddyName:", buddyName);
  
//     if (commonCourses.length > 0 && buddyName.toLowerCase().includes(searchTerm.toLowerCase())) {
//       studyBuddies.push({
//         student: { name: buddy.studentName, email: buddy.email },
//         commonCourses,
//       });
//     }
//   });
  
//   if (studyBuddies.length === 0) {
//     studyBuddies.push({ noMatches: true });
//   }
  
//   console.log("studyBuddies:", studyBuddies);
//   setStudyBuddies(studyBuddies);
// }

import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export default async function findStudyBuddies(uid, setStudyBuddies, searchTerm, firestore) {
  const usersRef = collection(firestore, "users");
  const usersSnapshot = await getDocs(usersRef);
  console.log("All users:", usersSnapshot.docs.map(doc => doc.data()));

  const currentUserDocRef = doc(firestore, "users", uid);
  const currentUserDocSnapshot = await getDoc(currentUserDocRef);
  console.log(currentUserDocSnapshot);
  const currentUserData = currentUserDocSnapshot.data();
  const currentUserCourses = currentUserData?.courses || [];
  const currentUserCourseCodes = currentUserCourses.map((c) => c.code);

  console.log(currentUserData);
  console.log(currentUserCourseCodes);

  let studyBuddies = [];

  usersSnapshot.docs.forEach((doc) => {
    if (doc.id === uid) return;

    const buddy = doc.data();
    const buddyCourses = buddy.courses.map((course) => course.code);
    const commonCourses = currentUserCourseCodes.filter((courseCode) => buddyCourses.includes(courseCode));

    if (commonCourses.length > 0) {
      const buddyName = buddy.studentName;
      studyBuddies.push({
        ...buddy,
        commonCourses: commonCourses,
        displayName: buddyName,
      });
    }
  });

  console.log("studyBuddies:", studyBuddies);
  setStudyBuddies(studyBuddies);
}
