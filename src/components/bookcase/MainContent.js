// components/MainContent.js
import React, { useState } from 'react';
import ChangeItemShow from './ChangeItemShow';

function MainContent() {
  const [currentView, setCurrentView] = useState('grid');

  const toggleView = (view) => {
    setCurrentView(view);
  };

  return (
    <ChangeItemShow currentView={currentView} toggleView={toggleView} />
  );
}

export default MainContent;