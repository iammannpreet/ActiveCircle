import './tailwind.css';
import Home from './pages/Home';
import AddActivityPage from './pages/AddActivityPage';
import AddEventPage from './pages/AddEventPage';
import HappeningNowPage from './pages/HappeningNowPage';
import NotFoundPage from './pages/NotFoundPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='bg-lightGray'> {/* Fallback color */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-activity" element={<AddActivityPage />} />
          <Route path="/add-event" element={<AddEventPage />} />
          <Route path="/happening-now" element={<HappeningNowPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
