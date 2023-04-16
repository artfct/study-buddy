import React from "react";
import styles from "./BuddyCard.module.css";
import profile from "./asset/chess.jpg";
import CourseBar from "./CourseBar";

const BuddyCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.photoContainer}>
        <img
          className={styles.photo}
          src={profile}
          alt="Profile"
        />
      </div>
      <h1 className={styles.name}>Andrew Tate</h1>
      <p className={styles.bio}>
      A good plan today is better than a perfect plan tomorrow. You've gotta do something and you've gotta do something fast.
      </p>
      <div className={styles.tagContainer}>
        <span className={styles.tag}>CSC165H1</span>
        <span className={styles.tag}>RSM341H1</span>
        <span className={styles.tag}>COG301H1</span>
        <span className={styles.tag}>STA248H1</span>
        <span className={styles.tag}>PHL440H1</span>
        <span className={styles.tag}>FBL373H1</span>
      </div>
      {/* <CourseBar/> */}
      
      <p className={styles.university}>University of Toronto - St. George</p>
    </div>
  );
};

export default BuddyCard;
