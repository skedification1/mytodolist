import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPopups } from '../redux/slices/popupSlice';

const PopupTaskAded = ({ popupClass, setPopupClass }) => {
  const theme = useSelector((state) => state.reduxtheme.theme);
  const popuptext = useSelector((state) => state.reduxpopup.popupredaxtext);

  useEffect(() => {
    if (popupClass === 'restart') {
      console.log('RESTARTTTT');

      setPopupClass('popup_active');
    }

    // setTimeout(() => {
    //   // STOP AFTER 5
    //   if (popupClass === 'popup_active') {
    //     setPopupClass('');
    //   }
    // }, 5000);
  }, [popupClass]); //popupClass

  return (
    <div className={theme ? `popup active ${popupClass}` : `popup  ${popupClass}`}>{popuptext}</div>
  );
};

export default PopupTaskAded;
