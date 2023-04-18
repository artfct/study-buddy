// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import fetchStudentInfo from '../../services/fetchStudentInfo';
// import Schedule from './Schedule/Schedule';
// import ScheduleUpload from './Schedule/ScheduleUpload';
// import ScheduleDisplay from './Schedule/ScheduleDisplay';
// import StudyBuddies from './StudyBuddies/StudyBuddies';

// import './User.css';

// function User({ user, firestore, storage }) {
//   const [studentInfo, setStudentInfo] = useState(null);
//   const [scheduleData, setScheduleData] = useState(null);
//   const [scheduleInstance, setScheduleInstance] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user && firestore) {
//       fetchStudentInfo(user.uid, setStudentInfo, setScheduleData, firestore, storage);
//       setScheduleInstance(new Schedule(user, firestore));
//     }
//   }, [user, firestore]);

//   const handleProfile = () => {
//     navigate(`/profile/${user.uid}`);
//   };

//   const handleScheduleUpdate = (newScheduleData) => {
//     setScheduleData(newScheduleData.courses);
//   };

//   return (
//     <div className='User'>
//       {studentInfo && studentInfo.studentName ? (
//         <h1>Welcome, {studentInfo.studentName} [{studentInfo.id}]</h1>
//       ) : (
//         <p>Loading student information...</p>
//       )}
//     <ScheduleUpload
//       user={user}
//       scheduleInstance={scheduleInstance}
//       onScheduleUpdate={handleScheduleUpdate}
//     />
//     <ScheduleDisplay
//     scheduleData={scheduleData}
//     user={user}
//     firestore={firestore}
//     />
//     <StudyBuddies user={user} firestore={firestore}/>
//     <button onClick={handleProfile}>View Profile</button>
//   </div>
// );
// }

// export default User;






import React, { useState, useEffect } from 'react';
import fetchStudentInfo from '../../services/fetchStudentInfo';
import editStudentInfo from '../../services/editStudentInfo';
import Schedule from './Schedule/Schedule';
import ScheduleUpload from './Schedule/ScheduleUpload';
import ScheduleDisplay from './Schedule/ScheduleDisplay';
import StudyBuddies from './StudyBuddies/StudyBuddies';
import ProfileEdit from '../profile/ProfileEdit';

import './User.css';

function User({ user, firestore, storage }) {
  const [studentInfo, setStudentInfo] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [scheduleInstance, setScheduleInstance] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user && firestore) {
      fetchStudentInfo(user.uid, setStudentInfo, setScheduleData, firestore, storage);
      setScheduleInstance(new Schedule(user, firestore));
    }
  }, [user, firestore]);

  const handleScheduleUpdate = (newScheduleData) => {
    setScheduleData(newScheduleData.courses);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedInfo) => {
    await editStudentInfo(user.uid, updatedInfo, firestore, storage);
    setStudentInfo(updatedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="User">
      {studentInfo && studentInfo.studentName ? (
        <h1>
          Welcome, {studentInfo.studentName} [{studentInfo.id}]
        </h1>
      ) : (
        <p>Loading student information...</p>
      )}
      <ScheduleUpload
        user={user}
        scheduleInstance={scheduleInstance}
        onScheduleUpdate={handleScheduleUpdate}
      />
      <ScheduleDisplay
        scheduleData={scheduleData}
        user={user}
        firestore={firestore}
      />
      <StudyBuddies user={user} firestore={firestore} />
      {isEditing ? (
        <ProfileEdit
          user={user}
          firestore={firestore}
          storage={storage}
          studentInfo={studentInfo}
          onSave={handleSave}
          onCancel={handleCancel}
          db={firestore}
        />
      ) : (
        <button onClick={handleEdit}>Edit Profile</button>
      )}
    </div>
  );
}

export default User;
