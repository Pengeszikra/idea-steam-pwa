import { useState, useEffect } from 'react';
import useInterval from '../utils/useInterval';

export default (gainScore, questResultIs, gain, itsOver ,tick = 0.005, delay = 100) => {
  const [isPaused, pause] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1);

  useInterval(() => {
    setTimeLeft(time => time - tick);
  }, timeLeft > 0 && !isPaused ? delay : null);

  useEffect(() => {
    pause((isNaN(gain) || itsOver));
  }, [gain, itsOver]);

  useEffect(() => {
    if (timeLeft <= 0) {
      gainScore('Lejárt az idő!');
      questResultIs(false);
    }
  }, [timeLeft]);

  return timeLeft;
}