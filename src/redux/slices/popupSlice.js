import { createSlice } from '@reduxjs/toolkit';

export const popupSlice = createSlice({
  name: 'popups',
  initialState: {
    popup: 'init',
    popupredaxtext: 'all',
  },

  reducers: {
    setPopups: (state, action) => {
      //state.popup = action.payload;
      state.popupredaxtext = action.payload;
      console.log('_______1', action.payload);
      console.log('_______2', action);
    },
  },
});

export const { setPopups } = popupSlice.actions;

export default popupSlice.reducer;
