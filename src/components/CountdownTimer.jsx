import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // 1. Set up an interval to run every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // 2. The crucial cleanup function
    // This runs when the component is unmounted
    return () => clearInterval(timer);
  }, [targetDate]); // Re-run effect if the targetDate prop changes

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="text-center">
        <span className="text-4xl font-bold text-amber-300">{timeLeft[interval]}</span>
        <span className="block text-sm text-amber-50 uppercase">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex justify-center space-x-4 my-4">
      {timerComponents.length ? timerComponents : <span>Event has started!</span>}
    </div>
  );
};

export default CountdownTimer;