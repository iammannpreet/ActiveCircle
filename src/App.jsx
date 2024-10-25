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
      <div>
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home Page Route */}
          <Route path="/add-activity" element={<AddActivityPage />} />  {/* Add Activity Page */}
          <Route path="/add-event" element={<AddEventPage />} />  {/* Add Event Page */}
          <Route path="/happening-now" element={<HappeningNowPage />} />  {/* Happening Now Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
