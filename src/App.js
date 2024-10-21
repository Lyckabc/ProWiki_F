import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import FolderSelector from './components/FolderSelector';
import FolderStructure from './components/FolderStructure';
import './styles/App.css';
import User from './pages/Login';

const queryClient = new QueryClient();

function App() {
  return (
<<<<<<< Updated upstream
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Header />
        <div className="content">
          <Sidebar />
          <MainContent />
          <FolderStructure />
        </div>
        <FolderSelector />
=======
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/bookcase" element={<Bookcase />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<User />} />
        </Routes>
>>>>>>> Stashed changes
      </div>
    </QueryClientProvider>
  );
}

export default App;