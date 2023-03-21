import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../redux/slices/themeSlice';

//setInterval(ClockTime, 1000); // frame time
//updateClock();

const ClockTime = () => {
  const theme = useSelector((state) => state.reduxtheme.theme);
  const dispatch = useDispatch();
  const [clock, setClock] = React.useState(0);

  //setClock(updateClock());
  //updateClock();

  function changeThemeFunc() {
    dispatch(setTheme(!theme));
  }

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

  return (
    <div className="clockT">
      {clock}
      <button
        className="btn_change"
        onClick={() => {
          changeThemeFunc();
        }}>
        Theme
      </button>
    </div>
  );
};
export default ClockTime;
