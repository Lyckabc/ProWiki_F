<<<<<<< Updated upstream
import React from 'react';
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
>>>>>>> Stashed changes

function Header() {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
  };

  return (
    <header>
      <nav>
        <ul>
          <li>Main Hole (Logo)</li>
          <li>Bookcase</li>
          <li>Calendar</li>
          <li>Quest</li>
          <li>Arena</li>
          <li>Map</li>
        </ul>
      </nav>
<<<<<<< Updated upstream
      <div className="search">
        <input type="text" placeholder="Search here" />
=======
      <div className="user">
        {isLogin ? (
          <div className="login-user">
            <span>Lyckabc</span>
            <button><Link to="/user" className='user-menu' onClick={handleLogout}>My Menu</Link></button>
          </div>
        ) : (
          <div className="customer-user">
            <button><Link to="/login" className='user-menu' onClick={handleLogin}>Login</Link></button>
          </div>
        )}
>>>>>>> Stashed changes
      </div>
      <div className="user">Lyckabc</div>
    </header>
  );
}

export default Header;