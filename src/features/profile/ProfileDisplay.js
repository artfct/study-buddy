import React from 'react';

function ProfileDisplay({ studentInfo, onEdit }) {
  if (!studentInfo) {
    return <p>Loading student information...</p>;
  }

  return (
    <div>
      <h1>{studentInfo.name}</h1>
      <p>UID: {studentInfo.uid}</p>
      <p>Email: {studentInfo.email}</p>
      <p>Username: {studentInfo.username}</p>
      <p>Bio: {studentInfo.bio}</p>
      <p>Interests: {studentInfo.interests}</p>
      <img src={studentInfo.profilePhoto} alt="`${studentInfo.name}` profile photo"/>
      {/* Add more fields to display here */}
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}

export default ProfileDisplay;
