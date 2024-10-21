import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = () => { setIsLogin(true); };
  const handleLogout = () => { setIsLogin(false); };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Main Hole</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/bookcase">Bookcase</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/quest">Quest</Link></li>
          <li><Link to="/arena">Arena</Link></li>
          <li><Link to="/map">Map</Link></li>
        </ul>
      </nav>
      <div className="user">
        {isLogin ? (<div className="login-user">
          <span>Lyckabc</span>
          <button><Link to="/user" className='user-menu' onClick={handleLogout}>My Menu</Link></button>
        </div>) : (
          <div className="customer-user">
            <button><Link to="/login" className='user-menu' onClick={handleLogin}>Login</Link></button>
          </div>
        )
        }
      </div>
    </header>
  );
} export default Header;