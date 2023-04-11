// import { ref, onValue } from "firebase/database";

// export default function findStudyBuddies(uid, setStudyBuddies, searchTerm, rtdb) {
//   const usersRef = ref(rtdb, 'users');
//   onValue(usersRef, (snapshot) => {
//     const users = snapshot.val();
//     const currentUserCourses = users[uid]?.courses || []; 
//     const currentUserCourseCodes = currentUserCourses.map(c => c.code);
//     let studyBuddies = [];

//     for (const id in users) {
//       if (id === uid) continue;
//       const buddyCourses = users[id]?.courses || []; 
//       const commonCourses = buddyCourses.filter(c => currentUserCourseCodes.includes(c.code));
//       const buddyName = users[id]?.student?.name || '';
//       const buddyCoursesData = users[id]?.coursesData || {};
//       if (commonCourses.length > 0 && buddyName.toLowerCase().includes(searchTerm.toLowerCase())) {
//         studyBuddies.push({
//           student: users[id].student,
//           commonCourses,
//           coursesData: buddyCoursesData,
//         });
//       }
//     }

//     if (studyBuddies.length === 0) {
//       studyBuddies.push({ noMatches: true });
//     }

//     console.log('studyBuddies:', studyBuddies);
//     setStudyBuddies(studyBuddies);
//   });
// }


import { ref, get } from "firebase/database";

export default async function findStudyBuddies(uid, setStudyBuddies, searchTerm, rtdb) {
  const usersRef = ref(rtdb, 'users');
  const snapshot = await get(usersRef);
  const users = snapshot.val();
  const currentUserCourses = users[uid]?.courses || []; 
  const currentUserCourseCodes = currentUserCourses.map(c => c.code);
  let studyBuddies = [];

  for (const id in users) {
    if (id === uid) continue;
    const buddyCourses = users[id]?.courses || []; 
    const commonCourses = buddyCourses.filter(c => currentUserCourseCodes.includes(c.code));
    const buddyName = users[id]?.student?.name || '';
    const buddyCoursesData = users[id]?.coursesData || {};
    if (commonCourses.length > 0 && buddyName.toLowerCase().includes(searchTerm.toLowerCase())) {
      studyBuddies.push({
        student: users[id].student,
        commonCourses,
        coursesData: buddyCoursesData,
      });
    }
  }

  if (studyBuddies.length === 0) {
    studyBuddies.push({ noMatches: true });
  }

  console.log('studyBuddies:', studyBuddies);
  setStudyBuddies(studyBuddies);
}
