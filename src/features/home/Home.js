import React, { useState, useEffect } from 'react';
import signInWithEmailPassword from '../../services/signInWithEmailPassword';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Home({ auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      console.log('Navigating to /user...');
    } catch (error) {
      console.error('Error signing in:', error);
      const warningMessage = document.querySelector('#warning-message');
      warningMessage.textContent = error.message; // Display the custom error message
    }
  };
  

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      {isLoggedIn? (<h2>Successfully Logged In</h2>) : (
        <>
        <h2>Sign In</h2>
        <div id="warning-container">
          <p id="warning-message"></p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn(email, password, auth);
          }}
        >
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Sign In</button>
        </form>
        <p>Don't have an account? Sign up here:</p>
        <button onClick={handleSignupClick}>Sign Up</button>
        </>
      )}
      
    </div>
  );
}

export default Home;