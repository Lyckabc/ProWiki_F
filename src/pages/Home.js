// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function Home() {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>Welcome to ProWiki</h1>
          <p>This is the home page of our application.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;