import axios from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";

export const API_IRL = 'http://localhost:5000'

const api = axios.create({
  withCredentials: true,
  baseURL: API_IRL
})

api.interceptors.request.use((config = {}) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

  }
  return config
})
api.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const originalReq = error.config
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalReq._isRetry = true
    try {
      const res = await axios.get<AuthResponse>(`${API_IRL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', res.data.accessToken)
      return api.request(originalReq)
    }
    catch (e) {
      console.error('Пользователь не авторизован')
    }
  }
  throw error
})

export default api