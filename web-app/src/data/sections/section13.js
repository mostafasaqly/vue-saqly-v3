export default {
  id: 13,
  title: "HTTP والـ APIs",
  titleEn: "HTTP & APIs",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: [
    "نظرة عامة على جلب البيانات",
    "Fetch API المدمجة",
    "تثبيت وإعداد Axios",
    "Axios Interceptors",
    "طبقة API Service",
    "CRUD كامل (GET/POST/PUT/DELETE)",
    "حالات التحميل والأخطاء",
    "Composable — useApi",
    "متغيرات البيئة .env",
    "Fetch مقابل Axios",
  ],
  lessonsEn: [
    "Data Fetching Overview",
    "Browser Fetch API",
    "Installing & Setting up Axios",
    "Axios Interceptors",
    "API Service Layer",
    "Full CRUD (GET/POST/PUT/DELETE)",
    "Loading & Error States",
    "useApi Composable",
    "Environment Variables (.env)",
    "Fetch vs Axios",
  ],
  intro: "نتعلم جلب البيانات من APIs في Vue — من Fetch API إلى Axios مع Interceptors وطبقة Service وmutğيرات البيئة.",
  introEn: "Learn data fetching from APIs in Vue — from Fetch API to Axios with interceptors, service layer, and environment variables.",
  content: [
    { type: "heading", text: "Fetch API — المدمجة في المتصفح" },
    { type: "code", code: `<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    if (!res.ok) throw new Error('HTTP ' + res.status)
    posts.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">جارٍ التحميل...</div>
  <p v-else-if="error" class="error">{{ error }}</p>
  <ul v-else>
    <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>
</template>` },
    { type: "heading", text: "تثبيت وإعداد Axios" },
    { type: "code", code: `$ npm install axios` },
    { type: "code", code: `// src/api/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Request Interceptor — إضافة token لكل طلب
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = \`Bearer \${token}\`
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor — معالجة موحّدة للأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      // انتهت الجلسة — إعادة التوجيه لتسجيل الدخول
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    if (status === 403) {
      console.error('ليس لديك صلاحية')
    }
    return Promise.reject(error)
  }
)

export default api` },
    { type: "heading", text: "طبقة API Service" },
    { type: "paragraph", text: "نفصل كل الـ API calls في ملفات service — يُسهّل إعادة الاستخدام والاختبار:" },
    { type: "code", code: `// src/api/posts.js
import api from './axios'

export const postsAPI = {
  getAll: (params = {}) => api.get('/posts', { params }),
  getById: (id) => api.get(\`/posts/\${id}\`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(\`/posts/\${id}\`, data),
  patch: (id, data) => api.patch(\`/posts/\${id}\`, data),
  delete: (id) => api.delete(\`/posts/\${id}\`),
}

// src/api/users.js
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(\`/users/\${id}\`),
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
}` },
    { type: "heading", text: "CRUD كامل في Component" },
    { type: "code", code: `<!-- PostsView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { postsAPI } from '@/api/posts'

const posts = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchPosts() {
  loading.value = true
  try {
    const { data } = await postsAPI.getAll({ _limit: 10 })
    posts.value = data
  } catch (e) {
    error.value = e.response?.data?.message || e.message
  } finally {
    loading.value = false
  }
}

async function createPost(formData) {
  const { data } = await postsAPI.create(formData)
  posts.value.unshift(data) // أضف للأعلى
}

async function updatePost(id, formData) {
  const { data } = await postsAPI.update(id, formData)
  const idx = posts.value.findIndex(p => p.id === id)
  if (idx !== -1) posts.value[idx] = data
}

async function deletePost(id) {
  await postsAPI.delete(id)
  posts.value = posts.value.filter(p => p.id !== id)
}

onMounted(fetchPosts)
</script>

<template>
  <div v-if="loading" class="loading">⏳ جارٍ التحميل...</div>
  <p v-else-if="error" class="error">{{ error }}</p>
  <ul v-else>
    <li v-for="post in posts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <button @click="deletePost(post.id)">حذف</button>
    </li>
  </ul>
</template>` },
    { type: "heading", text: "useApi Composable" },
    { type: "code", code: `// composables/useApi.js
import { ref } from 'vue'

export function useApi(apiFn) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function execute(...args) {
    loading.value = true
    error.value = null
    try {
      const res = await apiFn(...args)
      data.value = res.data
      return res.data
    } catch (e) {
      error.value = e.response?.data?.message || e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}

// الاستخدام — نظيف جداً
const { data: posts, loading, error, execute: fetchPosts } = useApi(postsAPI.getAll)
const { execute: deletePostFn } = useApi(postsAPI.delete)

onMounted(fetchPosts)
async function remove(id) {
  await deletePostFn(id)
  posts.value = posts.value?.filter(p => p.id !== id)
}` },
    { type: "heading", text: "متغيرات البيئة (.env)" },
    { type: "code", code: `# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=My Vue App (Dev)

# .env.production
VITE_API_URL=https://api.myapp.com
VITE_APP_TITLE=My Vue App

# .env.local (مُتجاهَل من git — للإعدادات الشخصية)
VITE_DEV_TOKEN=my_personal_dev_token` },
    { type: "warning", text: "فقط المتغيرات التي تبدأ بـ VITE_ تُضمَّن في الكود. لا تضع API secrets أو كلمات مرور في VITE_ — كل من يفحص الـ JavaScript bundle سيراها." },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما مزايا Axios على Fetch API؟", answer: "Axios يُحوّل JSON تلقائياً (لا .json() يدوياً)، يدعم Interceptors للـ requests والـ responses، يُلغي الطلبات بـ AbortController مُدمج، يتعامل مع status codes كأخطاء تلقائياً (response.status >= 400 يُلقي error)، ولا يحتاج import في كل مكان." },
    { type: "qa", question: "ما هي API Service Layer ولماذا تستخدمها؟", answer: "هي طبقة تجمع كل API calls في ملفات منفصلة (posts.js, users.js) بعيداً عن الـ components. مزايا: إعادة استخدام، سهولة اختبار (تستطيع mock الـ service file)، تغيير الـ endpoint في مكان واحد." },
    { type: "qa", question: "لماذا نستخدم Interceptors مع Axios؟", answer: "Interceptors تُعالج كل request وresponse مركزياً: إضافة token لكل request، إعادة التوجيه عند 401، logging، معالجة أخطاء موحّدة — بدلاً من تكرار نفس الكود في كل API call." },
    { type: "qa", question: "لماذا لا تضع API keys في VITE_ env variables؟", answer: "VITE_ prefix يجعل المتغير مُضمَّناً في JavaScript bundle — أي شخص يفتح Chrome DevTools → Sources → يمكنه رؤيته. ضع API secrets في backend server ليس في الـ client-side code." },
  ],
  contentEn: [
    { type: "heading", text: "Setting up Axios" },
    { type: "code", code: `// src/api/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

// Add auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = \`Bearer \${token}\`
  return config
})

// Handle auth errors globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api` },
    { type: "heading", text: "API Service Layer" },
    { type: "code", code: `// src/api/posts.js
import api from './axios'

export const postsAPI = {
  getAll: (params = {}) => api.get('/posts', { params }),
  getById: (id) => api.get(\`/posts/\${id}\`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(\`/posts/\${id}\`, data),
  delete: (id) => api.delete(\`/posts/\${id}\`),
}` },
    { type: "heading", text: "useApi Composable" },
    { type: "code", code: `// composables/useApi.js
import { ref } from 'vue'

export function useApi(apiFn) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function execute(...args) {
    loading.value = true
    error.value = null
    try {
      const res = await apiFn(...args)
      data.value = res.data
      return res.data
    } catch (e) {
      error.value = e.response?.data?.message || e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}

// Clean usage
const { data: posts, loading, error, execute: fetchPosts } = useApi(postsAPI.getAll)
onMounted(fetchPosts)` },
    { type: "heading", text: "Environment Variables" },
    { type: "code", code: `# .env.development
VITE_API_URL=http://localhost:3000/api

# .env.production
VITE_API_URL=https://api.myapp.com

# In code:
const apiUrl = import.meta.env.VITE_API_URL` },
    { type: "warning", text: "Only VITE_ prefixed variables are included in the client bundle — anyone can read them in DevTools. Never put API secrets in VITE_ variables." },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What are the advantages of Axios over Fetch API?", answer: "Axios auto-transforms JSON (no manual .json() call), supports interceptors, treats error status codes as errors automatically (fetch doesn't), has built-in timeout support, and makes cancellation straightforward." },
    { type: "qa", question: "What is an API Service Layer and why use it?", answer: "A service layer collects all API calls in separate files (posts.js, users.js) away from components. Benefits: reuse, easier testing (mock the service file), and a single place to change endpoints." },
    { type: "qa", question: "Why use Axios interceptors?", answer: "Interceptors handle every request and response centrally: add auth token to every request, redirect on 401, centralized error handling, logging — instead of repeating the same code in every API call." },
  ],
};
