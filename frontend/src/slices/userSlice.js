// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  watchlist: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
    },
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { setUser, addToWatchlist, removeFromWatchlist } = userSlice.actions;
export default userSlice.reducer;
