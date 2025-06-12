import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Button from '../components/common/Button';
import ThemeToggle from '../components/common/ThemeToggle';
import TripCard from '../components/dashboard/TripCard';
import useLocalStorage from '../hooks/useLocalStorage';

const Dashboard = () => {
  const [trips] = useLocalStorage('tripwise_trips', []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <MapPin size={28} className="mr-2" />
          TripWise
        </h1>
        <div className="flex gap-2">
          <ThemeToggle />
          <Link to="/settings">
            <Button>Settings</Button>
          </Link>
        </div>
      </div>
      <Link to="/new-trip">
        <Button>Add New Trip</Button>
      </Link>
      <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.length ? (
          trips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <p className="text-center text-gray-500">No trips yet. Plan your adventure!</p>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;