import React, { useState } from 'react';

function SignupPage3({ onNext, onBack }) {
  const [bio, setBio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ bio });
  };

  return (
    <div>
      <h2>Signup Page 3</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button onClick={onBack}>Back</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default SignupPage3;
