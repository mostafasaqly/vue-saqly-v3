// api/axios.js — Axios instance with interceptors
// إعداد Axios مع interceptors للطلبات والردود
// npm install axios

import axios from 'axios'

// Create Axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request Interceptor — runs before every request
api.interceptors.request.use(
  (config) => {
    // Add Authorization header if token exists
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`)
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor — runs on every response
api.interceptors.response.use(
  (response) => {
    // Return just the data (not the full Axios response)
    return response.data
  },
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    switch (status) {
      case 401:
        // Token expired — redirect to login
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
        break
      case 403:
        console.error('[API] Forbidden — غير مصرح لك')
        break
      case 404:
        console.error('[API] Resource not found — المورد غير موجود')
        break
      case 500:
        console.error('[API] Server Error — خطأ في السيرفر')
        break
      default:
        console.error(`[API] Error ${status}: ${message}`)
    }

    return Promise.reject({
      status,
      message,
      originalError: error,
    })
  }
)

export default api
