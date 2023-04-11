import React, { useState } from 'react';

function ProfileEdit({ studentInfo, onSave, onCancel }) {
  const [username, setUsername] = useState(studentInfo.username);
  const [bio, setBio] = useState(studentInfo.bio);
  // Add more fields to edit here

  const handleSave = () => {
    const updatedInfo = {
      ...studentInfo,
      username,
      bio,
      // Add more updated fields here
    };
    onSave(updatedInfo);
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Bio:
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </label>
      {/* Add more input fields to edit here */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default ProfileEdit;
