import { useState, useCallback } from 'react';
import { Calendar } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import useLocalStorage from '../../hooks/useLocalStorage';
import { format } from 'date-fns';

function Itinerary({ tripId, onUpdate }) {
  const [trips, setTrips] = useLocalStorage('tripwise_trips', []);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '' });
  const trip = trips.find((t) => t.id === tripId);
  const itinerary = trip ? trip.itinerary || [] : [];

  const updateTrip = useCallback((updatedTrips) => {
    setTrips(updatedTrips);
    onUpdate();
  }, [setTrips, onUpdate]);

  const handleAdd = () => {
    if (!newEvent.title || !newEvent.date) return;
    const updatedTrips = trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            itinerary: [
              ...(t.itinerary || []),
              { id: crypto.randomUUID(), ...newEvent },
            ],
          }
        : t
    );
    updateTrip(updatedTrips);
    setNewEvent({ title: '', date: '', time: '', location: '' });
  };

  const handleDelete = (eventId) => {
    const updatedTrips = trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            itinerary: t.itinerary.filter((event) => event.id !== eventId),
          }
        : t
    );
    updateTrip(updatedTrips);
  };

  return (
    <div className="p-4 bg-cream dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold flex items-center text-primary">
        <Calendar size={20} className="mr-2" />
        Itinerary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        <Input
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          placeholder="Event title"
        />
        <Input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <Input
          type="time"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        />
        <Input
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          placeholder="Location"
        />
      </div>
      <Button onClick={handleAdd} className="mb-2">Add Event</Button>
      <ul className="space-y-2">
        {itinerary.map((event) => (
          <li key={event.id} className="flex items-center justify-between">
            <div>
              <span className="font-medium">{event.title}</span>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {format(new Date(event.date), 'MMM d, yyyy')}
                {event.time && ` at ${event.time}`}
                {event.location && ` - ${event.location}`}
              </div>
            </div>
            <button
              onClick={() => handleDelete(event.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Itinerary;