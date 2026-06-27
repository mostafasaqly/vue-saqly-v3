# Section 13: HTTP & APIs

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Native Fetch API |
| 2 | Installing Axios |
| 3 | Creating an Axios Instance |
| 4 | GET Requests |
| 5 | POST, PUT, PATCH, DELETE Requests |
| 6 | Loading & Error States |
| 7 | Request & Response Interceptors |
| 8 | API Service Layer Pattern |
| 9 | Generic `useApi` Composable |
| 10 | Environment Variables for API URLs |

## Key Concepts

- **`fetch()`** — The native browser API for HTTP requests. Returns a `Promise<Response>`. You must call `.json()` to parse the body — a 404 response does **not** throw, you must check `res.ok`.
- **Axios** — A popular HTTP library that automatically parses JSON, throws on non-2xx status codes, supports interceptors, and works in Node.js.
- **`axios.create()`** — Creates a configured Axios instance with a shared `baseURL`, `headers`, and `timeout` — so individual API calls stay concise.
- **Interceptors** — Functions that run on every outgoing request or incoming response. Use them to attach auth tokens (request) or handle 401 errors globally (response).
- **API Service Layer** — Organize all API calls in dedicated files (`api/posts.js`) instead of calling axios directly inside components. Makes changes and testing much easier.
- **`useApi` Composable** — A generic composable that wraps any API call with reactive `data`, `error`, and `isLoading` state.
- **Environment Variables** — Store API URLs in `.env` files as `VITE_API_URL=...`. Vite exposes them at `import.meta.env.VITE_API_URL`.

## Code Reference

```js
// api/axios.js — shared Axios instance
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor — attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — handle global errors
api.interceptors.response.use(
  (response) => response.data,  // unwrap .data so callers get data directly
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    if (status === 403) {
      console.error('Forbidden — not enough permissions')
    }

    return Promise.reject(error)
  }
)

export default api
```

```js
// api/posts.js — Posts API service layer
import api from './axios'

export const postsAPI = {
  getAll: (params = {}) => api.get('/posts', { params }),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  patch: (id, data) => api.patch(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
}
```

```js
// api/users.js — Users API service layer
import api from './axios'

export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
}
```

```js
// composables/useApi.js — generic async composable
import { ref } from 'vue'

export function useApi(apiFn) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const execute = async (...args) => {
    isLoading.value = true
    error.value = null
    try {
      data.value = await apiFn(...args)
    } catch (e) {
      error.value = e.response?.data?.message ?? e.message
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, execute }
}
```

```vue
<!-- PostsView.vue — using the API service + useApi composable -->
<script setup>
import { onMounted, ref } from 'vue'
import { postsAPI } from '@/api/posts'
import { useApi } from '@/composables/useApi'

// List posts
const { data: posts, isLoading, error, execute: fetchPosts } = useApi(postsAPI.getAll)
onMounted(() => fetchPosts())

// Create a post
const { isLoading: isCreating, execute: createPost } = useApi(postsAPI.create)

const newPostTitle = ref('')

const handleCreate = async () => {
  await createPost({ title: newPostTitle.value, body: '...', userId: 1 })
  newPostTitle.value = ''
  fetchPosts()  // refresh list
}

// Delete a post
const { execute: deletePost } = useApi(postsAPI.delete)

const handleDelete = async (id) => {
  await deletePost(id)
  fetchPosts()
}
</script>

<template>
  <div>
    <h2>Posts</h2>

    <!-- Create form -->
    <form @submit.prevent="handleCreate">
      <input v-model="newPostTitle" placeholder="New post title" />
      <button type="submit" :disabled="isCreating">
        {{ isCreating ? 'Creating...' : 'Add Post' }}
      </button>
    </form>

    <!-- List -->
    <div v-if="isLoading">Loading posts...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    <ul v-else>
      <li v-for="post in posts" :key="post.id">
        <strong>{{ post.title }}</strong>
        <button @click="handleDelete(post.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
```

```bash
# .env — API base URL (never commit secrets to git!)
VITE_API_URL=https://api.myapp.com

# .env.development — override for local development
VITE_API_URL=http://localhost:3000

# Access in code:
# import.meta.env.VITE_API_URL
```

## Fetch vs Axios

| | `fetch` | `axios` |
|--|---------|---------|
| Built-in | ✅ Yes | Requires install |
| Auto JSON parse | ✗ `.json()` required | ✅ Automatic |
| Throws on 4xx/5xx | ✗ Must check `res.ok` | ✅ Throws automatically |
| Interceptors | ✗ Must wrap manually | ✅ Built-in |
| Request cancellation | `AbortController` | `AbortController` / `CancelToken` |
| Progress | ✗ Limited | ✅ `onUploadProgress` |
| Node.js | ✅ v18+ | ✅ Always |

## Review Q&A

**Q: What is the difference between Fetch and Axios?**
A: Fetch is native but requires manual JSON parsing and doesn't throw on HTTP errors (4xx/5xx) — you must check `res.ok`. Axios auto-parses JSON, throws on non-2xx, and has built-in interceptors and request cancellation.

**Q: Why use an API Service Layer?**
A: Centralizing API calls in files like `api/posts.js` means components never know the URL structure. If the endpoint changes, you update one place. Components stay focused on rendering, not networking details.

**Q: What is the `useApi` composable for?**
A: It wraps any async API call with reactive `data`, `error`, and `isLoading` state. Instead of repeating these three refs in every component that makes API calls, you get them from a single composable and just pass the function to call.

**Q: Why do I need `VITE_` prefix for env variables?**
A: Vite only exposes env variables prefixed with `VITE_` to client-side code for security — you don't accidentally leak server-side secrets to the browser. Variables without the prefix are available only in Vite config files (server-side only).

## Examples Folder

- `examples/useApi.js` — generic API composable with data/error/isLoading

---

**Prev:** [Section 12 — Routing with Vue Router](../Section%2012%20-%20Routing%20with%20Vue%20Router/README.md)
**Next:** [Section 14 — State Management with Pinia](../Section%2014%20-%20State%20Management%20with%20Pinia/README.md)
