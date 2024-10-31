import React, { useState, useEffect } from 'react';

function Countdown() {
  const averageTime = 1
  const totalTime = averageTime * 60;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const deadline = Date.now() + 3 * 60 * 60 * 1000;
    const time = deadline - Date.now();

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  const timer = () => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const percentageComplete = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div>
      <h1>Contagem Regressiva: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h1>
      <p>Porcentagem Completa: {percentageComplete.toFixed(2)}%</p>
    </div>
  );
}

export default Countdown;