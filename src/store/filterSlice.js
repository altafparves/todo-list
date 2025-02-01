import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: null, // Store the selected date
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setDateFilter: (state, action) => {
      state.date = action.payload; // Set the selected date
    },
    clearDateFilter: (state) => {
      state.date = null; // Clear the selected date
    },
  },
});

export const { setDateFilter, clearDateFilter } = filterSlice.actions;
export default filterSlice.reducer;
