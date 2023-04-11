import React from 'react';
import findStudyBuddies from '../../scheduling/findStudyBuddies';

const StudyBuddiesSearch = ({ searchTerm, setSearchTerm, setStudyBuddies, user, rtdb }) => {
  const handleSearch = (term) => {
    setSearchTerm(term);
    findStudyBuddies(user.uid, setStudyBuddies, term, rtdb);
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
