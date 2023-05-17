import React from 'react';
import findStudyBuddies from '../../scheduling/findStudyBuddies';
import { TextField, Button, Box } from '@mui/material';

const StudyBuddiesSearch = ({ searchTerm, setSearchTerm, setStudyBuddies, user, firestore }) => {
  const handleSearch = (term) => {
    setSearchTerm(term);
    findStudyBuddies(user.uid, setStudyBuddies, term, firestore);
  };

  return (
    <Box>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        label="Search by name"
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={() => handleSearch(searchTerm)}>Search</Button>
    </Box>
  );
};

export default StudyBuddiesSearch;
