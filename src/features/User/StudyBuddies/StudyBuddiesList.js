import React from 'react';
import StudyBuddyCard from './StudyBuddyCard';

const StudyBuddiesList = ({ studyBuddies }) => {
  return (
    <div>
      {studyBuddies && (
        <div>
          <h2>Study Buddies</h2>
          {studyBuddies.length === 0 || studyBuddies[0]?.noMatches ? (
            <p>No matches were found.</p>
          ) : (
            studyBuddies
              .sort((a, b) => b.commonCourses.length - a.commonCourses.length)
              .map((buddy, index) => (
                <StudyBuddyCard key={index} buddy={buddy} />
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default StudyBuddiesList;
