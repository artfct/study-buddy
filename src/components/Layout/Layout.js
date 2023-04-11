import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="logo-container">
          <Link to="/">
            <p>HOME</p>
            {/* <img src="/path/to/your/logo.png" alt="Logo" className="logo" /> */}
          </Link>
        </div>
      </header>
      <main className="layout-main">{children}</main>
    </div>
  );
};

export default Layout;
