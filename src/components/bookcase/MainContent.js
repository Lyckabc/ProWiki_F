import React, { useState } from 'react';
import ChangeItemShow from './ChangeItemShow';
import PageView from './PageView';
import '../../styles/MainContent.css';

function MainContent() {
  const [currentView, setCurrentView] = useState('grid');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleView = (view) => {
    setCurrentView(view);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`main-content ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="fullscreen-toggle" onClick={toggleFullscreen}>
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </div>
      {isFullscreen ? (
        <div className="fullscreen-content">
          <PageView />
        </div>
      ) : (
        <div className="content-wrapper">
          <div className="left-section">
            <ChangeItemShow currentView={currentView} toggleView={toggleView} />
          </div>
          <div className="right-section">
            <PageView />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;