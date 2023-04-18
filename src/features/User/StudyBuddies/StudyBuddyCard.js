// import React from 'react';
// import styles from './StudyBuddyCard.module.css';

// const StudyBuddyCard = ({ buddy }) => {
//   const renderCommonCourses = () => {
//     if (buddy && buddy.commonCourses) {
//       return buddy.commonCourses.map((courseCode, i) => (
//         <span key={i} className={styles.tag}>
//           {courseCode}
//         </span>
//       ));
//     }
//     return null;
//   };

//   return (
//     <div className={styles.card}>
//       {buddy && (
//         <>
//           <div className={styles.photoContainer}>
//             <img
//               className={styles.photo}
//               src={buddy.profilePhoto}
//               alt={`${buddy.studentName}'s profile`}
//             />
//           </div>
//           <h1 className={styles.name}>{buddy.studentName}</h1>
//           <p className={styles.username}>{`@${buddy.username}`}</p>
//           <p className={styles.major}>{`${buddy.major}`}</p>
//           <p className={styles.bio}>{`${buddy.bio}` || "No bio yet!"}</p>
//           <div className={styles.tagContainer}>{renderCommonCourses()}</div>
//         </>
//       )}
//     </div>
//   );
// };

// export default StudyBuddyCard;


import React from 'react';
import styles from './StudyBuddyCard.module.css';

const StudyBuddyCard = ({ buddy }) => {
  const renderCommonCourses = () => {
    if (buddy && buddy.commonCourses) {
      return buddy.commonCourses.map((courseCode, i) => (
        <span key={i} className={styles.tag}>
          {courseCode}
        </span>
      ));
    }
    return null;
  };

  return (
    <div className={styles.card}>
      {buddy && (
        <>
          <div className={styles.photoContainer}>
            <img
              className={styles.photo}
              src={buddy.profilePhoto}
              alt={`${buddy.studentName}'s profile`}
            />
          </div>
          <h1 className={styles.name}>{buddy.studentName}</h1>
          {/* <p className={styles.username}>{`@${buddy.username}`}</p> */}
          {/* <p className={styles.major}>{`${buddy.major}`}</p> */}
          <p className={styles.bio}>{`${buddy.bio}` || "No bio yet!"}</p>
          <div className={styles.uniContainer}>
            <p className={styles.uni}>University of Toronto, St. George</p>
          </div>
          <div className={styles.tagContainer}>{renderCommonCourses()}</div>
          <p className={styles.common}>Common Courses</p>
        </>
      )}
    </div>
  );
};

export default StudyBuddyCard;

