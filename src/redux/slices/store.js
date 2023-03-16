import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';
import popupSlice from './popupSlice';

export default configureStore({
  reducer: { reduxtest: filterSlice, reduxpopup: popupSlice },
});
