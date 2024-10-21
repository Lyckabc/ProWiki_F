import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Bookcase from './pages/Bookcase';
import Calendar from './pages/Calendar';
import Quest from './pages/Quest';
import Arena from './pages/Arena';
import Map from './pages/Map';
import './styles/App.css';
import Login from './pages/Login';

function App() {
  return (
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
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;