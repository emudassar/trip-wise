import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { MapPin, Calendar, Edit, Trash2 } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import Checklist from '../components/trip/Checklist';
import Countdown from '../components/trip/Countdown';
import Itinerary from '../components/trip/Itinerary';
import Button from '../components/common/Button';
import { format } from 'date-fns';

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trips, setTrips] = useLocalStorage('tripwise_trips', []);
  const [trip, setTrip] = useState(null);

  const updateTrip = useCallback(() => {
    const foundTrip = trips.find((t) => t.id === id);
    setTrip(foundTrip);
  }, [id, trips]);

  useEffect(() => {
    updateTrip();
  }, [updateTrip]);

  const handleDelete = () => {
    const updatedTrips = trips.filter((t) => t.id !== id);
    setTrips(updatedTrips);
    navigate('/');
  };

  if (!trip) {
    return <div className="text-center py-12">Trip not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">{trip.name}</h1>
        <div className="flex space-x-2">
          <Link to={`/trip/edit/${id}`}>
            <Button className="flex items-center">
              <Edit size={20} className="mr-2" />
              Edit
            </Button>
          </Link>
          <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
            <Trash2 size={20} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
      <div className="p-4 bg-cream dark:bg-gray-800 rounded-lg shadow">
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
          <MapPin size={20} className="mr-2" />
          <span>{trip.destination}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Calendar size={20} className="mr-2" />
          <span>{format(new Date(trip.startDate), 'MMM d, yyyy')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}</span>
        </div>
      </div>
      <Countdown startDate={trip.startDate} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Checklist type="packing" tripId={id} onUpdate={updateTrip} />
        <Checklist type="todo" tripId={id} onUpdate={updateTrip} />
      </div>
      <Itinerary tripId={id} onUpdate={updateTrip} />
    </div>
  );
}

export default TripDetails;