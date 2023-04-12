// import { ref, set, get, update } from "firebase/database";

// function saveScheduleToDatabase(schedule, rtdb, uid) {
//     if (!schedule || !schedule.courses) {
//       console.error("Error: Invalid schedule object in saveScheduleToDatabase.js");
//       return;
//     }

//   const userRef = ref(rtdb, `users/${uid}`);

//   get(userRef).then((snapshot) => {
//     if (snapshot.exists()) {
//       update(userRef, {
//         courses: schedule.courses,
//       })
//         .then(() => {
//           console.log("Saved user info and courses");
//         })
//         .catch((error) => {
//           console.error("Error saving user info and courses:", error);
//         });
//     } else {
//       set(userRef, {
//         student: schedule.student,
//         courses: schedule.courses,
//       })
//         .then(() => {
//           console.log("Saved user info and courses");
//         })
//         .catch((error) => {
//           console.error("Error saving user info and courses:", error);
//         });
//     }
//   }).catch((error) => {
//     console.error("Error fetching user data:", error);
//   });
// }

// export default saveScheduleToDatabase;


import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

async function saveScheduleToDatabase(schedule, firestore, uid) {
  if (!schedule || !schedule.courses) {
    console.error("Error: Invalid schedule object in saveScheduleToDatabase.js");
    return;
  }

  const userRef = doc(firestore, `users/${uid}`);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, {
        courses: schedule.courses,
      });
      console.log("Updated user info and courses");
    } else {
      await setDoc(userRef, {
        courses: schedule.courses,
      });
      console.log("Saved user info and courses");
    }
  } catch (error) {
    console.error("Error saving user info and courses:", error);
  }
}

export default saveScheduleToDatabase;
