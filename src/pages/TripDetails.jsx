import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import Button from '../components/common/Button';
import Countdown from '../components/dashboard/Countdown';
import Checklist from '../components/trip/Checklist';
import Itinerary from '../components/trip/Itinerary';
import useLocalStorage from '../hooks/useLocalStorage';

const TripDetails = () => {
  const { id } = useParams();
  const [trips, setTrips] = useLocalStorage('tripwise_trips', []);
  const trip = trips.find((t) => t.id === id);

  const handleDelete = () => {
    setTrips(trips.filter((t) => t.id !== id));
    window.location.href = '/';
  };

  if (!trip) return <div className="container mx-auto p-4">Trip not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{trip.title}</h1>
        <Button onClick={handleDelete} className="bg-red-500">
          <Trash2 size={20} />
        </Button>
      </div>
      <div className="space-y-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Details</h2>
          <p><strong>Destination:</strong> {trip.destination}</p>
          <p><strong>Dates:</strong> {trip.startDate} to {trip.endDate}</p>
          <p><strong>Notes:</strong> {trip.notes || 'No notes'}</p>
        </div>
        <Countdown startDate={trip.startDate} endDate={trip.endDate} />
        <Checklist type="packing" items={trip.packingList} tripId={trip.id} />
        <Checklist type="todo" items={trip.todoList} tripId={trip.id} />
        <Itinerary items={trip.itinerary} tripId={trip.id} />
        <Link to="/">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default TripDetails;