import React from 'react';

function Header() {
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
      <div className="search">
        <input type="text" placeholder="Search Hear" />
      </div>
      <div className="user">Lyckabc</div>
    </header>
  );
}

export default Header;