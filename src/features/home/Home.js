import React, { useState, useEffect } from 'react';
import signInWithEmailPassword from '../../services/signInWithEmailPassword';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Container, Typography, TextField, Button, Box, Alert, List, ListItem } from '@mui/material';
import LoadingAnimation from '../../components/animation/LoadingAnimation';
import { fetchEventsForFeed } from '../../services/api/eventServices';
import PostCard from '../../components/cards/PostCard';
import './Home.css'

function Home({ auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchEvents = async (currentPage) => {
    try {
      const fetchedEvents = await fetchEventsForFeed();
      setEvents(fetchedEvents);
    } catch (error) {
      console.log('Error fetching events:', error.message);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchEvents(1);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchEvents(1).finally(() => setRefreshing(false));
  };

  const handleSignIn = async (email, password, auth) => {
    try {
      const userCredential = await signInWithEmailPassword(email, password, auth);
      console.log('User credential:', userCredential);
      navigate('/user');
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.message);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Container sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <LoadingAnimation />
      <Container sx={{ width: '100%', mb: 4, justifyContent: 'center', alignItems: 'center' }}>
        {isLoggedIn ? (
          <Container sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: '70px' }}>
            {/* Use paddingTop to adjust the starting point */}
            <List>
              {events.map((item, index) => (
                <ListItem key={index} className="centered-list-item">
                  <PostCard {...item} />
                </ListItem>
              ))}
            </List>
          </Container>
        ) : (
          // Render your login content here
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
      </Container>
    </Container>
  );
}

export default Home;
