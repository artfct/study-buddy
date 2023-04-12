import React from 'react';
import './StudyBuddyCard.css';

const StudyBuddyCard = ({ buddy }) => {
  return (
    <div className="card">
      {buddy && (
        <>
          <img src={buddy.profilePhoto} alt={`${buddy.studentName}'s profile`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h3>
            {buddy.studentName} ({buddy.email})
          </h3>
          <p>Common Courses:</p>
          <ul>
            {buddy.commonCourses.map((courseCode, i) => (
              <li key={i}>{courseCode}</li>
            ))}
          </ul>
          <p>Bio: {buddy.bio}</p>
        </>
      )}
    </div>
  );
};

export default StudyBuddyCard;
