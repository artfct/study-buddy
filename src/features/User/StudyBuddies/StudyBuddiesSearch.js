import React from 'react';
import findStudyBuddies from '../../scheduling/findStudyBuddies';
import './StudyBuddiesSearch.css';

const StudyBuddiesSearch = ({ searchTerm, setSearchTerm, setStudyBuddies, user, firestore }) => {
  const handleSearch = (term) => {
    setSearchTerm(term);
    findStudyBuddies(user.uid, setStudyBuddies, term, firestore);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => handleSearch(searchTerm)}>Search</button>
    </div>
  );
};

export default StudyBuddiesSearch;
