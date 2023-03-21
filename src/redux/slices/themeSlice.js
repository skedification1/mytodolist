import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'Themes',
  initialState: {
    theme: false,
  },

  reducers: {
    setTheme: (state, action) => {
      //state.popup = action.payload;
      state.theme = action.payload;
      console.log('THEEEEMEEEEEEEE', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
