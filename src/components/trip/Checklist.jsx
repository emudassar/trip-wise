import { useState, useCallback } from 'react';
import { CheckSquare } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import useLocalStorage from '../../hooks/useLocalStorage';

const Checklist = ({ type, tripId, onUpdate }) => {
  const [trips, setTrips] = useLocalStorage('tripwise_trips', []);
  const [newItem, setNewItem] = useState('');
  const trip = trips.find((t) => t.id === tripId);
  const items = trip ? (type === 'packing' ? trip.packingList : trip.todoList) || [] : [];

  const updateTrip = useCallback((updatedTrips) => {
    setTrips(updatedTrips);
    onUpdate();
  }, [setTrips, onUpdate]);

  const handleAdd = () => {
    if (!newItem.trim()) return;
    const updatedTrips = trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            [type === 'packing' ? 'packingList' : 'todoList']: [
              ...(t[type === 'packing' ? 'packingList' : 'todoList'] || []),
              { id: crypto.randomUUID(), item: newItem, checked: false },
            ],
          }
        : t
    );
    updateTrip(updatedTrips);
    setNewItem('');
  };

  const handleToggle = (itemId) => {
    const updatedTrips = trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            [type === 'packing' ? 'packingList' : 'todoList']: t[
              type === 'packing' ? 'packingList' : 'todoList'
            ].map((item) =>
              item.id === itemId ? { ...item, checked: !item.checked } : item
            ),
          }
        : t
    );
    updateTrip(updatedTrips);
  };

  const handleDelete = (itemId) => {
    const updatedTrips = trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            [type === 'packing' ? 'packingList' : 'todoList']: t[
              type === 'packing' ? 'packingList' : 'todoList'
            ].filter((item) => item.id !== itemId),
          }
        : t
    );
    updateTrip(updatedTrips);
  };

  const suggestions = type === 'packing'
    ? ['Camera', 'Travel Adapter', 'Clothing', 'Toiletries']
    : ['Book Flights', 'Reserve Hotel', 'Check Visa', 'Install Translation App'];

  return (
    <div className="p-4 bg-cream dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold flex items-center text-primary">
        <CheckSquare size={20} className="mr-2" />
        {type === 'packing' ? 'Packing List' : 'To-Do List'}
      </h2>
      <div className="flex mb-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item"
          className="mr-2"
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setNewItem(suggestion)}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {suggestion}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggle(item.id)}
                className="mr-2"
              />
              <span className={item.checked ? 'line-through' : ''}>{item.item}</span>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;