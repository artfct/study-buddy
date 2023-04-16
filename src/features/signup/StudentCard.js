import React from "react";
import styles from "./StudentCard.module.css";
import profile from "../../mockup/asset/chess.jpg";

const StudentCard = ({ studentName, username, bio, profilePhoto, major, courses }) => {
  const renderCourseTags = () => {
    if (courses) {
      return courses.map((course, index) => (
        <span key={index} className={styles.tag}> {/* Updated class name */}
          {course.code}
        </span>
      ));
    }
    return null;
  };

  return (
    <div className={styles.card}>
      <div className={styles.photoContainer}>
        <img
          className={styles.photo}
          src={profilePhoto || profile}
          alt="Profile"
        />
      </div>
      <h1 className={styles.name}>{studentName || "Your Name"}</h1>
      <p className={styles.username}>{`@${username}` || "@username"}</p>
      <p className={styles.major}>{major || "Your Major"}</p>
      <p className={styles.bio}>{bio || "Your Bio"}</p>
      <div className={styles.tagContainer}>{renderCourseTags()}</div>
      <div className={styles.interestContainer}>
        {/* Add your dynamic interests here */}
      </div>
      {/* <CourseBar/> */}
      <p className={styles.university}>University of Toronto</p>
    </div>
  );
};

export default StudentCard;
