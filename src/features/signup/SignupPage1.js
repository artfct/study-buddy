import React, { useState } from 'react';
import { checkEmailAndStudentId } from '../../services/signUpWithEmailPassword';

function SignupPage1({ userData, onNext }) {
  const [email, setEmail] = useState(userData.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [studentName, setStudentName] = useState(userData.studentName || '');
  const [studentId, setStudentId] = useState(userData.studentId || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !studentName || !studentId) {
      alert('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const { emailExists, idExists } = await checkEmailAndStudentId(email, studentId);

    if (emailExists) {
      alert('Email already in use.');
      return;
    }

    if (idExists) {
      alert('Student ID already in use.');
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default SignupPage1;
