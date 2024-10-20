import './tailwind.css';
import Home from './pages/Home';
import AddActivityPage from './pages/AddActivityPage'; // Import the new Add Activity page
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components

function App() {
  return (
    <Router>
      <div>
        {/* Define Routes for your pages */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page Route */}
          <Route path="/add-activity" element={<AddActivityPage />} /> {/* Add Activity Page Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
