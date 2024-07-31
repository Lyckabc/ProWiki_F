import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import FolderSelector from './components/FolderSelector';
import FolderStructure from './components/FolderStructure';
import './styles/App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Header />
        <div className="content">
          <Sidebar />
          <MainContent />
          <FolderStructure />
        </div>
        <FolderSelector />
      </div>
    </QueryClientProvider>
  );
}

export default App;