import React, { useState } from 'react';
import StudyBuddiesList from './StudyBuddiesList';
import StudyBuddiesSearch from './StudyBuddiesSearch';
import './StudyBuddies.css';

const StudyBuddies = ({ user, firestore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studyBuddies, setStudyBuddies] = useState([]);

  return (
    <div className='StudyBuddies'>
      <h3>Find Study Buddies</h3>
      <StudyBuddiesSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setStudyBuddies={setStudyBuddies}
        user={user}
        firestore={firestore}
      />
      <StudyBuddiesList studyBuddies={studyBuddies} />
    </div>
  );
};

export default StudyBuddies;
