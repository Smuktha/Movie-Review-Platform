import { configureStore } from '@reduxjs/toolkit'
import auth from './authSlice'
import movies from './moviesSlice'

export default configureStore({
  reducer: { auth, movies }
})
