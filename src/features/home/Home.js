import React, { useState } from 'react';
import signInWithEmailPassword from '../../services/signInWithEmailPassword';
import { useNavigate } from 'react-router-dom';
import BuddyCard from '../../mockup/BuddyCard';
import BuddyCard2 from '../../mockup/BuddyCard2';

function Home({ auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (email, password, auth) => {
    try {
      await signInWithEmailPassword(email, password, auth);
      navigate('/user');
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSignIn(email, password, auth);
      }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={handleSignupClick}>Signup</button>
      {/* <BuddyCard/> */}
      <BuddyCard2/>
    </div>
  );
}

export default Home;
