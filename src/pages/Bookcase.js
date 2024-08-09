import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FolderSelector from '../components/bookcase/FolderSelector';
import FolderStructure from '../components/bookcase/FolderStructure';
import MainContent from '../components/bookcase/MainContent';
import SearchBook from '../components/bookcase/searchBook';
import DottedLine from '../components/bookcase/dottedLine';
import '../styles/Bookcase.css'; // 북케이스 페이지 전용 스타일 파일

function Bookcase() {
  return (
    <div className="bookcase-page">
      <Header />
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
          <DottedLine />
          <MainContent />
        </div>
      </div>
      <FolderSelector />
    </div>
  );
}

export default Bookcase;