import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const loginThunk = createAsyncThunk('auth/login', async (payload) => {
  const { data } = await api.post('/auth/login', payload)
  return data.token
})
export const registerThunk = createAsyncThunk('auth/register', async (payload) => {
  await api.post('/auth/register', payload)
  const { data } = await api.post('/auth/login', { email: payload.email, password: payload.password })
  return data.token
})

const slice = createSlice({
  name: 'auth',
  initialState: { token: localStorage.getItem('token') || null },
  reducers: {
    logout(state) { state.token = null; localStorage.removeItem('token') }
  },
  extraReducers: (b) => {
    b.addCase(loginThunk.fulfilled, (s, a) => { s.token = a.payload; localStorage.setItem('token', a.payload) })
    b.addCase(registerThunk.fulfilled, (s, a) => { s.token = a.payload; localStorage.setItem('token', a.payload) })
  }
})

export const { logout } = slice.actions
export default slice.reducer
