// src/slices/moviesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],   // all movies
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMovies, setLoading, setError } = moviesSlice.actions;
export default moviesSlice.reducer;
