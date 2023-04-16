import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

// async function saveScheduleToDatabase(schedule, firestore, uid) {
//   if (!schedule || !schedule.courses) {
//     console.error("Error: Invalid schedule object in saveScheduleToDatabase.js");
//     return;
//   }

//   const userRef = doc(firestore, `users/${uid}`);

//   try {
//     const userDoc = await getDoc(userRef);

//     if (userDoc.exists()) {
//       await updateDoc(userRef, {
//         courses: schedule.courses,
//       });
//       console.log("Updated user info and courses");
//     } else {
//       await setDoc(userRef, {
//         courses: schedule.courses,
//       });
//       console.log("Saved user info and courses");
//     }
//   } catch (error) {
//     console.error("Error saving user info and courses:", error);
//   }
// }

// export default saveScheduleToDatabase;


async function saveScheduleToDatabase(schedule, firestore, uid) {
  let courses = null;
  if (schedule && schedule.courses) {
    courses = schedule.courses;
  } else if (Array.isArray(schedule)) {
    courses = schedule;
  } else {
    console.error("Error: Invalid schedule object in saveScheduleToDatabase.js");
    return;
  }

  const userRef = doc(firestore, `users/${uid}`);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, {
        courses: courses,
      });
      console.log("Updated user info and courses");
    } else {
      await setDoc(userRef, {
        courses: courses,
      });
      console.log("Saved user info and courses");
    }
  } catch (error) {
    console.error("Error saving user info and courses:", error);
  }
}

export default saveScheduleToDatabase;
