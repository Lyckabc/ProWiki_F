// components/MainContent.js
import React, { useState } from 'react';
import GridView from './GridView';
import ListView from './ListView';
import FileExplorer from './FileExplorer';
import PageView from './PageView';

function MainContent() {
  const [currentView, setCurrentView] = useState('grid');

  const toggleView = (view) => {
    setCurrentView(view);
  };

  return (
    <main>
      <div className="view-toggle">
        <button 
          onClick={() => toggleView('grid')}
          className={currentView === 'grid' ? 'active' : ''}
        >
          Grid View
        </button>
        <button 
          onClick={() => toggleView('list')}
          className={currentView === 'list' ? 'active' : ''}
        >
          List View
        </button>
      </div>
      <div className="content-area">
        {currentView === 'grid' ? <GridView /> : <ListView />}
      </div>
      <div>
      <FileExplorer /> 
      </div>
      <div>
      <PageView /> 
      </div>
    </main>
  );
}

export default MainContent;