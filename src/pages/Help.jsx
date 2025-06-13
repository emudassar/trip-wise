import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

function Help() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-primary mb-6">Help & Support</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold text-primary">How to Create a Trip</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Go to the Dashboard and click "Add Trip" to start planning. Enter your trip name, destination, dates, and notes, then save.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary">Managing Checklists</h2>
          <p className="text-gray-600 dark:text-gray-400">
            In the Trip Details page, use the Packing List or To-Do List to add, check, or delete items. Click suggestion buttons for quick additions.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary">Planning Your Itinerary</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add events to your itinerary on the Trip Details page by entering a title, date, time, and location, then click "Add Event."
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary">Switching Themes</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Toggle between light and dark mode using the sun/moon icon in the navbar.
          </p>
        </section>
      </div>
      <Link to="/">
        <Button className="mt-6">Back to Dashboard</Button>
      </Link>
    </div>
  );
}

export default Help;