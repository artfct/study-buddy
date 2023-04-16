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

// import React from 'react';
// import './StudyBuddyCard.css';

// const StudyBuddyCard = ({ buddy }) => {
//   return (
//     <div className="card">
//       {buddy && (
//         <>
//           <div className="profile-photo-container">
//             <img src={buddy.profilePhoto} alt={`${buddy.studentName}'s profile`} className="profile-photo" />
//           </div>
//           <h3 className="student-name">{buddy.studentName}</h3>
//           <table className="common-courses-table">
//             <thead>
//               <tr>
//                 <th>Common Courses:</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>
//                   {buddy.commonCourses.map((courseCode, i) => (
//                     <span key={i} className="course-tag">{courseCode}</span>
//                   ))}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <p className="bio-text">{buddy.bio}</p>
//           <p className="university-info">University of Toronto, St. Geroge</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default StudyBuddyCard;
