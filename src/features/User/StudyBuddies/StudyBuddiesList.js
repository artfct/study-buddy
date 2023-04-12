import React from 'react';
import StudyBuddyCard from './StudyBuddyCard';
import './StudyBuddiesList.css';

const StudyBuddiesList = ({ studyBuddies }) => {
  return (
    <div className="study-buddies-list">
      {studyBuddies && (
        <div className="study-buddies-container">
          <h2>Study Buddies</h2>
          {studyBuddies.length === 0 || studyBuddies[0]?.noMatches ? (
            <p>No matches were found.</p>
          ) : (
            <div className="study-buddies-cards">
            {studyBuddies
              .sort((a, b) => b.commonCourses.length - a.commonCourses.length)
              .map((buddy, index) => (
                <StudyBuddyCard key={index} buddy={buddy} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyBuddiesList;
