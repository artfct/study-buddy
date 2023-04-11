import React, { useState } from 'react';
import StudyBuddiesList from './StudyBuddiesList';
import StudyBuddiesSearch from './StudyBuddiesSearch';

const StudyBuddies = ({ user, rtdb }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studyBuddies, setStudyBuddies] = useState([]);

  return (
    <div>
      <h3>Find Study Buddies</h3>
      <StudyBuddiesSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setStudyBuddies={setStudyBuddies}
        user={user}
        rtdb={rtdb}
      />
      <StudyBuddiesList studyBuddies={studyBuddies} />
    </div>
  );
};

export default StudyBuddies;
