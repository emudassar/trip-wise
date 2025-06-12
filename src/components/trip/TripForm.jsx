import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../common/Button';
import Input from '../common/Input';
import useLocalStorage from '../../hooks/useLocalStorage';

const TripForm = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useLocalStorage('tripwise_trips', []);
  const [form, setForm] = useState({
    id: `tw_${Date.now()}`,
    title: '',
    destination: '',
    startDate: new Date(),
    endDate: new Date(),
    notes: '',
    packingList: [],
    todoList: [],
    itinerary: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrips([...trips, form]);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Trip Name"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <Input
        label="Destination"
        value={form.destination}
        onChange={(e) => setForm({ ...form, destination: e.target.value })}
        required
      />
      <div>
        <label className="block text-sm font-medium">Start Date</label>
        <DatePicker
          selected={form.startDate}
          onChange={(date) => setForm({ ...form, startDate: date })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">End Date</label>
        <DatePicker
          selected={form.endDate}
          onChange={(date) => setForm({ ...form, endDate: date })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Notes</label>
        <textarea
          rows="4"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <Button type="submit">Save Trip</Button>
    </form>
  );
};

export default TripForm;