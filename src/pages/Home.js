// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useLogon } from '../components/utils/Logon';
import '../styles/App.css';


function Home() {
  const { isLoggedIn, writerName } = useLogon();
  return (
    <div className="home-page">
        <Header />
        <div className="main-content">
            <Sidebar />
            <div className="content">
                <h1>Welcome to ProWiki</h1>
                {isLoggedIn ? (
                    <p>환영합니다, {writerName}님!</p>
                ) : (
                    <p>This is the home page of our application.</p>
                )}
            </div>
        </div>
    </div>
);
}

export default Home;