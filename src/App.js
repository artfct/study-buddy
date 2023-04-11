import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';
import Home from './features/home/Home';
import User from './features/User/User';
import Profile from './features/profile/Profile';
import Signup from './features/signup/Signup';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const rtdb = getDatabase(app);
const firestore = getFirestore(app);

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home auth={auth} rtdb={rtdb} firestore={firestore} />} />
          <Route
            path="/user"
            element={user ? <User user={user} rtdb={rtdb} firestore={firestore} /> : <Home auth={auth} rtdb={rtdb} firestore={firestore} />}
          />
          <Route path="/profile/:userId" element={<Profile user={user} rtdb={rtdb} firestore={firestore} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
