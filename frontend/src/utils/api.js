import axios from 'axios'
import store from '../store/store'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use((config) => {
  const state = store.getState()
  if (state.auth.token) {
    config.headers.Authorization = `Bearer ${state.auth.token}`
  }
  return config
})

export default api
