import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FolderSelector from '../components/bookcase/FolderSelector';
import FolderStructure from '../components/bookcase/FolderStructure';
import MainContent from '../components/bookcase/MainContent';
import SearchBook from '../components/bookcase/searchBook';
import Dividers from '../components/bookcase/Dividers';
import '../styles/Bookcase.css';
import PageView from '../components/bookcase/PageView';

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
            <div>
              <Dividers />
            </div>
            <MainContent />
          </div>
        </div>
        <FolderSelector />
      </div>
      <div className="App">
      <PageView />
    </div>
    </div>
  );
}

export default Bookcase;