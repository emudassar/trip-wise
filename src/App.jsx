import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import NewTrip from './pages/NewTrip';
import TripDetails from './pages/TripDetails';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-trip" element={<NewTrip />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;