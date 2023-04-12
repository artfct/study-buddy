import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchStudentInfo from '../../services/fetchStudentInfo';
import Schedule from '../scheduling/Schedule';
import ScheduleUpload from './Schedule/ScheduleUpload';
import ScheduleDisplay from './Schedule/ScheduleDisplay';
import StudyBuddies from './StudyBuddies/StudyBuddies';

import './User.css';

function User({ user, firestore, storage }) {
  const [studentInfo, setStudentInfo] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [scheduleInstance, setScheduleInstance] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && firestore) {
      fetchStudentInfo(user.uid, setStudentInfo, setScheduleData, firestore, storage);
      setScheduleInstance(new Schedule(user, firestore));
    }
  }, [user, firestore]);

  const handleProfile = () => {
    navigate(`/profile/${user.uid}`);
  };

  const handleScheduleUpdate = (newScheduleData) => {
    setScheduleData(newScheduleData.courses);
  };

  return (
    <div className='User'>
      {studentInfo && studentInfo.studentName ? (
        <h1>Welcome, {studentInfo.studentName} [{studentInfo.id}]</h1>
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
    <StudyBuddies user={user} firestore={firestore}/>
    <button onClick={handleProfile}>View Profile</button>
  </div>
);
}

export default User;
