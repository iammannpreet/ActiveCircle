// src/App.js
import './tailwind.css';
import React, { useState } from 'react'; // Import useState
import Home from './pages/Home';
import AddActivityPage from './pages/AddActivityPage';
import AddEventPage from './pages/AddEventPage';
import HappeningNowPage from './pages/HappeningNowPage';
import NotFoundPage from './pages/NotFoundPage';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // Define state to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className='bg-lightGray'> {/* Fallback color */}
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
