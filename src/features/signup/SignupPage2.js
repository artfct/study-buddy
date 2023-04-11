import React, { useState } from 'react';

function SignupPage2({ onNext, onBack }) {
  const [username, setUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ username, profilePhoto });
  };

  return (
    <div>
      <h2>Signup Page 2</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePhoto(e.target.files[0])}
        />
        <button onClick={onBack}>Back</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default SignupPage2;

