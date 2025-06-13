import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TripDetails from './pages/TripDetails';
import TripForm from './pages/TripForm';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trip/new" element={<TripForm />} />
          <Route path="/trip/edit/:id" element={<TripForm />} />
          <Route path="/trip/:id" element={<TripDetails />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;