import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
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
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        Create Your Account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto'}}>
        <TextField
          label="Student Name"
          variant="outlined"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <TextField
          label="Student ID"
          variant="outlined"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default SignupPage1;
