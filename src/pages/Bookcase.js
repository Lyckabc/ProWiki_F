import React from 'react';
import Header from '../components/Header';
import FolderSelector from '../components/bookcase/FolderSelector';
import FolderStructure from '../components/bookcase/FolderStructure';
import MainContent from '../components/bookcase/MainContent';
import SearchBook from '../components/bookcase/searchBook';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import '../styles/Bookcase.css'; // 북케이스 페이지 전용 스타일 파일

const WhiteLineDivider = styled(Divider)(({ theme }) => ({
  '&::before, &::after': {
    borderColor: 'white',
  },
}));


function Bookcase() {
  return (
    <div className="bookcase-page">
      <Header />
      <div className="bookcase-content">
        {/* <Sidebar /> */}
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
          <WhiteLineDivider textAlign="right">RIGHT</WhiteLineDivider>
          <MainContent />
        </div>
      </div>
      <FolderSelector />
    </div>
  );
}

export default Bookcase;