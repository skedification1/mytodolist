import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';
import popupSlice from './popupSlice';
import themeSlice from './themeSlice';

export default configureStore({
  reducer: { reduxtest: filterSlice, reduxpopup: popupSlice, reduxtheme: themeSlice },
});
