// src/App.js
import './tailwind.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddActivityPage from './pages/AddActivityPage';
import AddEventPage from './pages/AddEventPage';
import HappeningNowPage from './pages/HappeningNowPage';
import NotFoundPage from './pages/NotFoundPage';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} /> {/* Pass props */}
      <div className='bg-lightGray'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-activity" element={<AddActivityPage />} />
          <Route path="/add-event" element={<AddEventPage />} />
          <Route path="/happening-now" element={<HappeningNowPage />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
