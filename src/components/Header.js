import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
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
      <div className="user-info">
        <span>Lyckabc</span>
        <button>User Menu</button>
      </div>
    </header>
  );
}
export default Header;