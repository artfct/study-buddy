// import React, { useState, useEffect } from 'react';
// import Schedule from '../scheduling/Schedule';
// import findStudyBuddies from '../scheduling/findStudyBuddies';
// import fetchStudentInfo from '../../services/fetchStudentInfo';
// import { useNavigate } from 'react-router-dom';
// import logout from '../../services/logout';

// function User({ user, db }) {
//   const [studentInfo, setStudentInfo] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [studyBuddies, setStudyBuddies] = useState([]);
//   const [scheduleInstance, setScheduleInstance] = useState(null);
//   const [scheduleDisplay, setScheduleDisplay] = useState(null);
//   const [scheduleData, setScheduleData] = useState(null);
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       fetchStudentInfo(user.uid, setStudentInfo, setScheduleData, db);
//     }
//   }, [user, db]);

//   useEffect(() => {
//     if (user) {
//       setScheduleInstance(new Schedule(user, db));
//     }
//   }, [user, db]);

//   useEffect(() => {
//     if (scheduleData && scheduleInstance) {
//       setScheduleDisplay(scheduleInstance.displaySchedule(scheduleData));
//     }
//   }, [scheduleData, scheduleInstance]);
  

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file && scheduleInstance) {
//       const fileContents = await file.text();
//       const parsedSchedule = await scheduleInstance.parse(fileContents);
  
//       if (parsedSchedule && parsedSchedule.courses) {
//         await scheduleInstance.save(parsedSchedule);
//         setScheduleData(parsedSchedule); 
//       } else {
//         console.error("Error: Invalid schedule object in User.js");
//       }
//     }
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//     findStudyBuddies(user.uid, setStudyBuddies, term, db);
//   };

//   const handleLogout = async () => {
//     try {
//       const signOut = logout();
//       await signOut();
//       setScheduleInstance(null); // Reset the schedule state
//       navigate('/');
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   return (
//     <div>
//         {studentInfo && studentInfo.student ? (
//         <h1>Welcome, {studentInfo.student.name} ({studentInfo.student.id})</h1>
//         ) : (
//         <p>Loading student information...</p>
//         )}
//       <div>
//         <label htmlFor="upload-schedule">Upload Schedule:</label>
//         <input
//           type="file"
//           id="upload-schedule"
//           name="upload-schedule"
//           accept=".ics"
//           onChange={handleFileUpload}
//         />
//       </div>
//       {scheduleDisplay && (
//         <div>
//             <h3>Schedule:</h3>
//             {scheduleDisplay}
//         </div>
//         )}
//       <h3>Find Study Buddies</h3>
//       <input
//         type="text"
//         placeholder="Search by name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={() => handleSearch(searchTerm)}>Search</button>
//       {studyBuddies && (
//         <div>
//           <h2>Study Buddies</h2>
//           {studyBuddies.length === 0 || studyBuddies[0]?.noMatches ? (
//           <p>No matches were found.</p>
//         ) : (
//           studyBuddies
//             .sort((a, b) => b.commonCourses.length - a.commonCourses.length)
//             .map((buddy, index) => (
//               buddy.student && (
//                 <div key={index} className="card">
//                   <h3>
//                     {buddy.student.name} ({buddy.student.email})
//                   </h3>
//                   <ul>
//                     {buddy.commonCourses.map((course, i) => (
//                       <li key={i}>
//                         <span data-tip data-for={course.code}>{course.code}</span>
//                         <div id={course.code} place="top" effect="solid">
//                           <div>
//                             <b><strong>Course:</strong></b> {buddy.coursesData[course.code] ? buddy.coursesData[course.code].name : 'Course not found'}
//                           </div>
//                           <div>
//                             <b><strong>Instructor:</strong></b> {buddy.coursesData[course.code] ? buddy.coursesData[course.code].instructor : 'Instructor not found'}
//                           </div>
//                           <div>
//                             <b><strong>Avg. Rating:</strong></b> {buddy.coursesData[course.code] ? buddy.coursesData[course.code].rating : 'Rating not found'}
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )
//             ))
//         )}
//         </div>
//       )}
//         {/* <Logout setSchedule={setSchedule} /> */}
//         <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default User;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logout from '../../services/logout';
import fetchStudentInfo from '../../services/fetchStudentInfo';
import Schedule from '../scheduling/Schedule';
import ScheduleUpload from './Schedule/ScheduleUpload';
import ScheduleDisplay from './Schedule/ScheduleDisplay';
import StudyBuddies from './StudyBuddies/StudyBuddies';

function User({ user, rtdb, firestore }) {
  const [studentInfo, setStudentInfo] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [scheduleInstance, setScheduleInstance] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchStudentInfo(user.uid, setStudentInfo, setScheduleData, rtdb);
    }
  }, [user, rtdb]);

  useEffect(() => {
    if (user) {
      setScheduleInstance(new Schedule(user, rtdb));
    }
  }, [user, rtdb]);

  const handleLogout = async () => {
    try {
      const signOut = logout();
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleProfile = () => {
    navigate(`/profile/${user.uid}`);
  };

  const handleScheduleUpdate = (newScheduleData) => {
    setScheduleData(newScheduleData);
  };

  return (
    <div>
      {studentInfo && studentInfo.student ? (
        <h1>Welcome, {studentInfo.student.name} ({studentInfo.student.id})</h1>
      ) : (
        <p>Loading student information...</p>
      )}
      <ScheduleUpload user={user} db={rtdb} onScheduleUpdate={handleScheduleUpdate} />
      <ScheduleDisplay user={user} db={rtdb} scheduleData={scheduleData} />
      <StudyBuddies user={user} rtdb={rtdb} />
      <button onClick={handleProfile}>Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;
