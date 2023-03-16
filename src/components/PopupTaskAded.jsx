import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPopups } from '../redux/slices/popupSlice';

const PopupTaskAded = ({ popupClass, setPopupClass }) => {
  const popup = useSelector((state) => state.reduxpopup.popup);
  const popuptext = useSelector((state) => state.reduxpopup.popupredaxtext);
  const dispatch = useDispatch();

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

  return <div className={`popup ${popupClass}`}>{popuptext}</div>;
};

export default PopupTaskAded;
