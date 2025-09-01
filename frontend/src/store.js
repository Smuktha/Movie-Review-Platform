import { configureStore } from "@reduxjs/toolkit";

// Example empty reducers (you can add real ones later)
import moviesReducer from "./slices/moviesSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});

export default store;
