import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FolderSelector from '../components/bookcase/FolderSelector';
import FolderStructure from '../components/bookcase/FolderStructure';
import MainContent from '../components/bookcase/MainContent';
import SearchBook from '../components/bookcase/searchBook';
import Dividers from '../components/bookcase/Dividers';
import '../styles/Bookcase.css';

function Bookcase() {
  return (
    <div>
      <Header />
      <div className="bookcase-page">
        <div className="bookcase-content">
          <Sidebar />
          <div className="main-area">
            <div className="top-section">
              <FolderStructure />
              <div className="right-section">
                <div className="view-toggle">
                  <button className="grid-view-btn">Grid View</button>
                  <button className="list-view-btn">List View</button>
                </div>
                <SearchBook />
              </div>
            </div>
            <Dividers />
            <div className="main-content-wrapper">
              <MainContent />
            </div>
          </div>
        </div>
        <FolderSelector />
      </div>
    </div>
  );
}

export default Bookcase;