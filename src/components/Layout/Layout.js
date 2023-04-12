import React from 'react';
import { Link } from 'react-router-dom';
import logout from '../../services/logout';
import './Layout.css';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, user }) => {
  const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const signOut = logout();
            await signOut();
            navigate('/');
        } catch (error) {
            console.error("Error signing out:", error);
        }
        };

    return (
      <div className="layout-container">
        <header className="layout-header">
          <div className="logo-container">
            <Link to="/">
              <p>HOME</p>
            </Link>
          </div>
          {user && (
            <div className="user-navigation">
              <Link to="/user">
                <p>User</p>
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </header>
        <main className="layout-main">{children}</main>
      </div>
    );
  };

 export default Layout  
