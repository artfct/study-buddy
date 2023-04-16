import styles from './CourseBar.module.css';

const courses = [
  { code: 'CSC165H1', name: 'Mathematical Expression and Reasoning for Computer Science' },
  { code: 'RSM341H1', name: 'Investments' },
  { code: 'COG301H1', name: 'Cognition: Theories and Issues' },
  { code: 'STA248H1', name: 'Statistics for Computer Scientists' },
  { code: 'PHL440H1', name: 'Topics in Metaphysics' },
  { code: 'FBL373H1', name: 'Entrepreneurial Finance' },
];

const CourseBar = () => {
  return (
    <div className={styles.courseBar}>
      {courses.map((course) => (
        <div className={styles.course} key={course.code}>
          <span className={styles.courseCode}>{course.code}</span>
          {/* <span className={styles.courseName}>{course.name}</span> */}
        </div>
      ))}
    </div>
  );
};

export default CourseBar;
