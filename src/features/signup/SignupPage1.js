import React, { useState } from 'react';

function SignupPage1({ onNext }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !studentName || !studentId) {
      alert('All fields are required.');
      return;
    }
    onNext({ email, password, studentName, studentId });
  };

  return (
    <div>
      <h2>Signup Page 1</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default SignupPage1;
