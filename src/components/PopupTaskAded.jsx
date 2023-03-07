import React, { useEffect } from 'react';

const PopupTaskAded = ({ popupClass, setPopupClass, popupText }) => {
  useEffect(() => {
    if (popupClass === 'restart') {
      setPopupClass('popup_active');
    }

    // setTimeout(() => {
    //   // STOP AFTER 5
    //   if (popupClass === 'popup_active') {
    //     setPopupClass('');
    //   }
    // }, 5000);
  }, [popupClass]);

  return <div className={`popup ${popupClass}`}>{popupText}</div>;
};

export default PopupTaskAded;
