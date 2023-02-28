import React, { useEffect } from 'react';

//setInterval(ClockTime, 1000); // frame time
//updateClock();

const ClockTime = () => {
  const [clock, setClock] = React.useState(0);

  //setClock(updateClock());
  //updateClock();

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const time = new Intl.DateTimeFormat('ru-Ru', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(date);
      setClock(time);
    }, 1000);

    return () => clearInterval(interval);
  }, [clock]);

  return <div className="clockT">{clock}</div>;
};
export default ClockTime;
