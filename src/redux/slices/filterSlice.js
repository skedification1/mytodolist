import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'counter',
  initialState: {
    filter: 'all',
  },

  reducers: {
    setFilterAll: (state) => {
      state.filter = 'all';
    },
    setFilterActive: (state) => {
      state.filter = 'active';
    },
    setFilterCompleted: (state) => {
      state.filter = 'completed';
    },
  },
});

export const { setFilterActive, setFilterCompleted, setFilterAll } = filterSlice.actions;

export default filterSlice.reducer;
