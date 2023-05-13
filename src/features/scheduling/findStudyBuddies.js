import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";

export default async function findStudyBuddies(uid, setStudyBuddies, searchTerm, firestore) {
  const usersRef = collection(firestore, "users");
  const usersSnapshot = await getDocs(usersRef);

  const currentUserDocRef = doc(firestore, "users", uid);
  const currentUserDocSnapshot = await getDoc(currentUserDocRef);
  const currentUserData = currentUserDocSnapshot.data();
  const currentUserCourses = currentUserData?.courses || [];
  const currentUserCourseCodes = currentUserCourses.map((c) => c.code);

  let studyBuddies = [];

  usersSnapshot.docs.forEach((doc) => {
    if (doc.id === uid) return;

    const buddy = doc.data();
    const buddyCourses = buddy.courses.map((course) => course.code);
    const commonCourses = currentUserCourseCodes.filter((courseCode) => buddyCourses.includes(courseCode));

    if (commonCourses.length > 0) {
      const buddyName = buddy.studentName;
      if (!searchTerm || buddyName.toLowerCase().includes(searchTerm.toLowerCase())) {
        studyBuddies.push({
          ...buddy,
          commonCourses: commonCourses,
          displayName: buddyName,
        });
      }
    }
  });

  console.log("studyBuddies:", studyBuddies);
  setStudyBuddies(studyBuddies);
}
