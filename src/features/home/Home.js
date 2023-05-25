import React, { useState, useEffect } from 'react';
import signInWithEmailPassword from '../../services/signInWithEmailPassword';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Container, Typography, TextField, Button, Box, Alert, Paper } from '@mui/material';
import LoadingAnimation from '../../components/animation/LoadingAnimation';

function Home({ auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(''); // added this state to handle error
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleSignIn = async (email, password, auth) => {
    try {
      const userCredential = await signInWithEmailPassword(email, password, auth);
      console.log('User credential:', userCredential);
      navigate('/user');
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.message); // set the error message
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Container sx={{ overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <LoadingAnimation/>
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400, mb: 4 }}>
          {isLoggedIn ? (
            <Typography variant="h5">Successfully Logged In</Typography>
          ) : (
            <>
              <Typography variant="h5">Sign In</Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignIn(email, password, auth);
                }}
              >
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" type="submit" sx={{ mt: 2, width: '100%' }}>
                  Sign In
                </Button>
              </form>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Don't have an account? Sign up here:</Typography>
                <Button variant="outlined" onClick={handleSignupClick} sx={{ mt: 1, width: '100%' }}>
                  Sign Up
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default Home;
