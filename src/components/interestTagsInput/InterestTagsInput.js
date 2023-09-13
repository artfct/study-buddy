import React, { useState } from 'react';
import { TextField, Chip } from '@mui/material';

export default function InterestTagsInput({ defaultTags, initialInterests, onInterestsChange }) {
  const [interestTags, setInterestTags] = useState(defaultTags);
  const [userInterests, setUserInterests] = useState(initialInterests || []);
  const [newInterest, setNewInterest] = useState('');

  const handleAddInterest = (interest) => {
    if (userInterests.length < 5 && !userInterests.includes(interest)) {
      setUserInterests(prevInterests => [...prevInterests, interest]);
      onInterestsChange([...userInterests, interest]);
    }
  };

  const handleDeleteInterest = (interest) => {
    const newInterests = userInterests.filter(tag => tag !== interest);
    setUserInterests(newInterests);
    onInterestsChange(newInterests);
  };

  const handleNewInterestChange = (e) => {
    setNewInterest(e.target.value);
  };

  const handleNewInterestAdd = () => {
    if (newInterest) {
      handleAddInterest(newInterest);
      setNewInterest('');
    }
  };

  return (
    <div>
      <h3>Select Interests</h3>
      {interestTags.map(tag => (
        <Chip key={tag} label={tag} clickable color={userInterests.includes(tag) ? 'primary' : 'default'} onClick={() => handleAddInterest(tag)} />
      ))}
      <Chip
        label={newInterest ? newInterest : '+'}
        color='default'
        onClick={handleNewInterestAdd}
        onDelete={handleNewInterestAdd}
        variant="outlined"
      />
      <TextField
        label="New Interest"
        variant="outlined"
        value={newInterest}
        onChange={handleNewInterestChange}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleNewInterestAdd();
          }
        }}
      />
      <h3>Added Interests</h3>
      {userInterests.map(tag => (
        <Chip key={tag} label={tag} onDelete={() => handleDeleteInterest(tag)} />
      ))}
    </div>
  );
}
