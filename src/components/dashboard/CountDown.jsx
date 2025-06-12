import useCountdown from '../../hooks/useCountdown';

const Countdown = ({ startDate, endDate }) => {
  const countdown = useCountdown(startDate, endDate);
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Countdown</h2>
      <p>{countdown}</p>
    </div>
  );
};

export default Countdown;