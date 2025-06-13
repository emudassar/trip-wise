import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

function TripForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trips, setTrips] = useLocalStorage('tripwise_trips', []);
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: new Date(),
    endDate: new Date(),
    notes: '',
  });

  useEffect(() => {
    if (id) {
      const trip = trips.find((t) => t.id === id);
      if (trip) {
        setFormData({
          name: trip.name,
          destination: trip.destination,
          startDate: new Date(trip.startDate),
          endDate: new Date(trip.endDate),
          notes: trip.notes || '',
        });
      }
    }
  }, [id, trips]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.destination) {
      alert('Please fill in all required fields');
      return;
    }

    const tripData = {
      id: id || crypto.randomUUID(),
      name: formData.name,
      destination: formData.destination,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      notes: formData.notes,
      packingList: id ? (trips.find((t) => t.id === id)?.packingList || []) : [],
      todoList: id ? (trips.find((t) => t.id === id)?.todoList || []) : [],
      itinerary: id ? (trips.find((t) => t.id === id)?.itinerary || []) : [],
    };

    if (id) {
      const updatedTrips = trips.map((t) => (t.id === id ? tripData : t));
      setTrips(updatedTrips);
    } else {
      setTrips([...trips, tripData]);
    }

    navigate(id ? `/trip/${id}` : '/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">
        {id ? 'Edit Trip' : 'Plan a New Trip'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trip Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter trip name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Destination</label>
          <Input
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => handleDateChange(date, 'startDate')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
          <DatePicker
            selected={formData.endDate}
            onChange={(date) => handleDateChange(date, 'endDate')}
            className="px-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full px-3 py-2 border border-gray-300 dark:border-gray"
            minDate={formData.startDate}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any additional notes..."
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
            rows={4}
          />
        </div>
        <div className="flex space-x-3">
          <Button type="submit">{id ? 'Update Trip' : 'Create Trip'}</Button>
          <Button
            type="button"
            onClick={() => navigate(id ? `/trip/${id}` : '/')}
            className="bg-gray-400 hover:bg-gray-500"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TripForm;