import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import TripCard from '../components/trip/TripCard';
import Button from '../components/common/Button';

function Dashboard() {
  const [trips, setTrips] = useLocalStorage('tripwise_trips', []);

  const handleDelete = (id) => {
    const updatedTrips = trips.filter((trip) => trip.id !== id);
    setTrips(updatedTrips);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Your Trips</h1>
        <Link to="/trip/new">
          <Button className="flex items-center">
            <Plus size={20} className="mr-2" />
            Add Trip
          </Button>
        </Link>
      </div>
      {trips.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No trips yet. Start planning your adventure!</p>
          <Link to="/trip/new">
            <Button className="mt-4">Create Your First Trip</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;