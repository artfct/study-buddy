import React from 'react';

const StudyBuddyCard = ({ buddy }) => {
  return (
    <div className="card">
      {buddy.student && (
        <>
          <h3>
            {buddy.student.name} ({buddy.student.email})
          </h3>
          <p>Common Courses:</p>
          <ul>
            {buddy.commonCourses.map((course, i) => (
              <li key={i}>
                {course.code} - {course.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default StudyBuddyCard;
