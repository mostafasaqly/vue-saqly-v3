const e={id:13,title:"HTTP والـ APIs",titleEn:"HTTP & APIs",level:"متوسط",levelEn:"Intermediate",lessons:["نظرة عامة على جلب البيانات","Fetch API","إعداد Axios","طلبات GET","طلبات POST","PUT وPATCH","DELETE","حالات التحميل","معالجة الأخطاء","طبقة API Service","useFetch من VueUse"],lessonsEn:["Data Fetching Overview","Fetch API","Axios Setup","GET Requests","POST Requests","PUT and PATCH","DELETE","Loading States","Error Handling","API Service Layer","VueUse useFetch"],intro:"نتعلم جلب البيانات من APIs في Vue — من Fetch API إلى Axios مع معالجة التحميل والأخطاء.",introEn:"Learn data fetching from APIs in Vue — from Fetch API to Axios with loading states and error handling.",content:[{type:"heading",text:"جلب البيانات في Vue"},{type:"paragraph",text:"Vue لا يوفر أداة جلب بيانات مدمجة — تستخدم إما Fetch API المدمجة في المتصفح أو Axios الشعبية."},{type:"heading",text:"Fetch API — المدمجة في المتصفح"},{type:"code",code:`<script setup>
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
<\/script>`},{type:"heading",text:"تثبيت وإعداد Axios"},{type:"code",code:"$ npm install axios"},{type:"code",code:`// src/api/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// Interceptor للـ requests (إضافة token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = \`Bearer \${token}\`
  return config
})

// Interceptor للـ responses (معالجة موحّدة للأخطاء)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // logout...
    }
    return Promise.reject(error)
  }
)

export default api`},{type:"heading",text:"طبقة API Service"},{type:"code",code:"// src/api/posts.js\nimport api from './axios'\n\nexport const postsAPI = {\n  getAll: () => api.get('/posts'),\n  getById: (id) => api.get(`/posts/${id}`),\n  create: (data) => api.post('/posts', data),\n  update: (id, data) => api.put(`/posts/${id}`, data),\n  patch: (id, data) => api.patch(`/posts/${id}`, data),\n  delete: (id) => api.delete(`/posts/${id}`),\n}"},{type:"heading",text:"CRUD كامل في Component"},{type:"code",code:`<script setup>
import { ref, onMounted } from 'vue'
import { postsAPI } from '@/api/posts'

const posts = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchPosts() {
  loading.value = true
  try {
    const { data } = await postsAPI.getAll()
    posts.value = data
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function createPost(formData) {
  const { data } = await postsAPI.create(formData)
  posts.value.unshift(data)
}

async function deletePost(id) {
  await postsAPI.delete(id)
  posts.value = posts.value.filter(p => p.id !== id)
}

onMounted(fetchPosts)
<\/script>`},{type:"heading",text:"Composable للـ API"},{type:"code",code:`// composables/useApi.js
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
    } catch (e) {
      error.value = e.response?.data?.message || e.message
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}

// الاستخدام
const { data: posts, loading, error, execute: fetchPosts } = useApi(postsAPI.getAll)
onMounted(fetchPosts)`},{type:"tip",text:"افصل منطق جلب البيانات في API service layer — يُسهّل الاختبار والتعديل لاحقاً."},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"ما مزايا Axios على Fetch API؟",answer:"Axios يُحوّل JSON تلقائياً، يدعم Interceptors للـ requests والـ responses، يُلغي الطلبات بسهولة، يتعامل مع status codes كأخطاء تلقائياً، ويدعم المتصفحات القديمة."},{type:"qa",question:"ما هي API Service Layer ولماذا تستخدمها؟",answer:"هي طبقة تجمع كل استدعاءات الـ API في ملفات منفصلة بعيداً عن الـ components. تُسهّل إعادة الاستخدام والاختبار وتغيير الـ endpoint لاحقاً."}],contentEn:[{type:"heading",text:"Setting up Axios"},{type:"code",code:`// src/api/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
})

export default api`},{type:"heading",text:"API Service Layer"},{type:"code",code:"// src/api/posts.js\nimport api from './axios'\n\nexport const postsAPI = {\n  getAll: () => api.get('/posts'),\n  getById: (id) => api.get(`/posts/${id}`),\n  create: (data) => api.post('/posts', data),\n  update: (id, data) => api.put(`/posts/${id}`, data),\n  delete: (id) => api.delete(`/posts/${id}`),\n}"},{type:"heading",text:"✅ Review"},{type:"qa",question:"What are the advantages of Axios over Fetch API?",answer:"Axios auto-transforms JSON, supports request/response interceptors, handles error status codes automatically, and supports request cancellation more easily."}]};export{e as default};
