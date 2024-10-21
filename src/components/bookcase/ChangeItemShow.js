import React from 'react';
import GridView from './GridView';
import ListView from './ListView';

function ChangeItemShow({ currentView, toggleView }) {
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
    </main>
  );
}

export default ChangeItemShow;