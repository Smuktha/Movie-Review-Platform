import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const fetchMovies = createAsyncThunk('movies/fetch', async (params) => {
  const { data } = await api.get('/movies', { params })
  return data
})
export const fetchMovie = createAsyncThunk('movies/one', async (id) => {
  const { data } = await api.get(`/movies/${id}`)
  return data
})

const slice = createSlice({
  name: 'movies',
  initialState: { list: null, current: null, loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMovies.pending, (s) => { s.loading = true; s.error = null })
     .addCase(fetchMovies.fulfilled, (s, a) => { s.loading = false; s.list = a.payload })
     .addCase(fetchMovies.rejected, (s, a) => { s.loading = false; s.error = a.error.message })
     .addCase(fetchMovie.fulfilled, (s, a) => { s.current = a.payload })
  }
})

export default slice.reducer
