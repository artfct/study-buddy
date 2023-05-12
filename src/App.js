import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';
import Home from './features/home/Home';
import User from './features/User/User';
import Profile from './features/profile/Profile';
import Signup from './features/signup/Signup';
import Admin from './features/admin/Admin';

import { onAuthStateChanged } from 'firebase/auth';
import { firestore, storage, auth } from './firebase/firebase';

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
      <Layout user={user}>
        <Routes>
          <Route exact path="/" element={<Home auth={auth} firestore={firestore} storage={storage} />} />
          <Route
            path="/user"
            element={user ? <User user={user} firestore={firestore} storage={storage} /> : <Home auth={auth} firestore={firestore} storage={storage} />}
          />
          <Route path="/profile/:userId" element={<Profile user={user} firestore={firestore} storage={storage} />} />
          <Route path="/signup" element={<Signup firestore={firestore} user={user} auth={auth} />} />
          <Route path="/admin" element={user && user.email === 'admin@example.com' ? <Admin auth={auth} firestore={firestore} storage={storage} /> : null} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
