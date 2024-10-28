import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/utils/ProtectedRoute';
import Home from './pages/Home';
// import About from './pages/About';
import Bookcase from './pages/Bookcase';
import Calendar from './pages/Calendar';
import Quest from './pages/Quest';
import Arena from './pages/Arena';
import Map from './pages/Map';
import './styles/App.css';
import Login from './pages/Login';
import Sign from './pages/Sign';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          {/* <Route path="/about" element={<About />} /> */}
                    <Route path="/bookcase" element={
                        <ProtectedRoute>
                            <Bookcase />
                        </ProtectedRoute>
                    } />
                    <Route path="/calendar" element={
                        <ProtectedRoute>
                            <Calendar />
                        </ProtectedRoute>
                    } />
                    <Route path="/quest" element={
                        <ProtectedRoute>
                            <Quest />
                        </ProtectedRoute>
                    } />
                    <Route path="/arena" element={
                        <ProtectedRoute>
                            <Arena />
                        </ProtectedRoute>
                    } />
                    <Route path="/map" element={
                        <ProtectedRoute>
                            <Map />
                        </ProtectedRoute>
                    } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;