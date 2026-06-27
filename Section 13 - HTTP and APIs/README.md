# القسم 13: HTTP والـ APIs
# Section 13: HTTP & APIs

> **Vue 3 Course — 23 Sections** | القسم 13 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | Fetch API الأصلي | Native Fetch API |
| 2 | تثبيت Axios | Installing Axios |
| 3 | طلبات GET | GET Requests |
| 4 | طلبات POST و PUT و DELETE | POST, PUT, DELETE Requests |
| 5 | حالات التحميل والأخطاء | Loading & Error States |
| 6 | API Service Layer | API Service Layer Pattern |
| 7 | Composable للـ API | Generic API Composable (useApi) |

## المفاهيم الرئيسية | Key Concepts

- **`axios.create()`** — إنشاء Axios instance بإعدادات مشتركة (baseURL, headers) / Creates an Axios instance with shared configuration.
- **Interceptors** — دوال تعمل على كل request أو response قبل معالجتها / Functions that run on every request/response before processing.
- **API Service Layer** — تنظيم كل API calls في ملفات منفصلة بدلاً من استدعائها مباشرة في المكونات / Organize all API calls in separate files.
- **`useApi` Composable** — composable عام يتعامل مع loading/error/data لأي API call / Generic composable handling loading/error/data for any API call.

## أمثلة مرجعية | Code Reference

```js
// api/axios.js — Axios instance with interceptors
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor — add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — handle errors globally
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

## أسئلة المراجعة | Review Q&A

**س: ما الفرق بين Fetch API و Axios؟**
ج: Fetch هو API أصلي في المتصفح. Axios يوفر interceptors، تحويل JSON تلقائي، إلغاء الطلبات، ودعم أفضل للأخطاء.

**Q: What is the difference between Fetch API and Axios?**
A: Fetch is native to the browser. Axios provides interceptors, automatic JSON transformation, request cancellation, and better error handling.

**س: لماذا نستخدم API Service Layer؟**
ج: يُمركز كل API calls في مكان واحد، يسهّل التغيير والاختبار، ويمنع تكرار الكود في المكونات.

**Q: Why use an API Service Layer?**
A: It centralizes all API calls in one place, makes changes and testing easier, and prevents code duplication in components.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 12 — Routing with Vue Router
**التالي | Next:** Section 14 — State Management with Pinia
