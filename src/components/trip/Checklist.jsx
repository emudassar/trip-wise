import { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import useLocalStorage from '../../hooks/useLocalStorage';

const Checklist = ({ type, items, tripId }) => {
  const [trips, setTrips] = useLocalStorage('tripwise_trips', []);
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (!newItem) return;
    const updatedTrips = trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            [type === 'packing' ? 'packingList' : 'todoList']: [
              ...t[type === 'packing' ? 'packingList' : 'todoList'],
              { item: newItem, checked: false },
            ],
          }
        : t
    );
    setTrips(updatedTrips);
    setNewItem('');
  };

  const handleToggle = (index) => {
    const updatedTrips = trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            [type === 'packing' ? 'packingList' : 'todoList']: t[
              type === 'packing' ? 'packingList' : 'todoList'
            ].map((item, i) =>
              i === index ? { ...item, checked: !item.checked } : item
            ),
          }
        : t
    );
    setTrips(updatedTrips);
  };

  const handleDelete = (index) => {
    const updatedTrips = trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            [type === 'packing' ? 'packingList' : 'todoList']: t[
              type === 'packing' ? 'packingList' : 'todoList'
            ].filter((_, i) => i !== index),
          }
        : t
    );
    setTrips(updatedTrips);
  };

  const suggestions = type === 'packing'
    ? ['Camera', 'Travel Adapter', 'Clothing', 'Toiletries']
    : ['Book Flights', 'Reserve Hotel', 'Check Visa', 'Install Translation App'];

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold flex items-center">
        <CheckSquare size={20} className="mr-2" />
        {type === 'packing' ? ' Urolist' : 'To-Do List'}
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
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggle(index)}
                className="mr-2"
              />
              <span className={item.checked ? 'line-through' : ''}>{item.item}</span>
            </div>
            <button
              onClick={() => handleDelete(index)}
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