# Section 13: HTTP & APIs

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Native Fetch API |
| 2 | Installing Axios |
| 3 | GET Requests |
| 4 | POST, PUT, DELETE Requests |
| 5 | Loading & Error States |
| 6 | API Service Layer Pattern |
| 7 | Generic API Composable (useApi) |

## Key Concepts

- **`axios.create()`** — Creates an Axios instance with shared configuration.
- **Interceptors** — Functions that run on every request or response before processing.
- **API Service Layer** — Organize all API calls in separate files instead of calling them directly inside components.
- **`useApi` Composable** — Generic composable handling loading/error/data for any API call.

## Code Reference

```js
// api/axios.js — Axios instance with interceptors
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error)
  }
)

export default api
```

```js
// api/posts.js — Posts API service
import api from './axios'

export const postsAPI = {
  getAll: (params) => api.get('/posts', { params }),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
}
```

## Review Q&A

**Q: What is the difference between Fetch API and Axios?**
A: Fetch is native to the browser. Axios provides interceptors, automatic JSON transformation, request cancellation, and better error handling.

**Q: Why use an API Service Layer?**
A: It centralizes all API calls in one place, makes changes and testing easier, and prevents code duplication in components.

## Examples Folder

This section's examples are in `Section 13 - HTTP and APIs/examples/`:

- `examples/useApi.js`

Open `Section 13 - HTTP and APIs/examples/` to view the runnable example.

---

**Prev:** Section 12 — Routing with Vue Router
**Next:** Section 14 — State Management with Pinia
