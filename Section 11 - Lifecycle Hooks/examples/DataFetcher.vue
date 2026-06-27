<script setup>
// DataFetcher.vue — onMounted fetch + cleanup demonstration
// جلب البيانات في onMounted مع التنظيف في onUnmounted
import { ref, onMounted, onUnmounted, onUpdated } from 'vue'

const props = defineProps({
  userId: {
    type: Number,
    default: 1,
  },
})

const user = ref(null)
const posts = ref([])
const isLoading = ref(false)
const error = ref(null)
const lifecycleLog = ref([])
const updateCount = ref(0)

// AbortController for canceling fetch requests
let abortController = null

const log = (msg) => {
  const time = new Date().toLocaleTimeString('ar-EG')
  lifecycleLog.value.unshift(`[${time}] ${msg}`)
}

const fetchUserData = async (userId) => {
  // Cancel previous request if any
  if (abortController) abortController.abort()
  abortController = new AbortController()

  isLoading.value = true
  error.value = null

  try {
    const [userRes, postsRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        signal: abortController.signal,
      }),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=3`, {
        signal: abortController.signal,
      }),
    ])

    user.value = await userRes.json()
    posts.value = await postsRes.json()
    log(`✅ تم جلب بيانات المستخدم ${userId}`)
  } catch (e) {
    if (e.name === 'AbortError') {
      log('⚠️ تم إلغاء الطلب السابق')
    } else {
      error.value = e.message
      log(`❌ خطأ: ${e.message}`)
    }
  } finally {
    isLoading.value = false
  }
}

// Lifecycle Hooks
onMounted(() => {
  log('🟢 onMounted — المكون جاهز')
  fetchUserData(props.userId)
})

onUpdated(() => {
  updateCount.value++
  log(`🔄 onUpdated — تحديث رقم ${updateCount.value}`)
})

onUnmounted(() => {
  // Cancel any pending fetch
  if (abortController) abortController.abort()
  log('🔴 onUnmounted — تم التنظيف')
})
</script>

<template>
  <div class="data-fetcher" dir="rtl">
    <h2>DataFetcher — Lifecycle Hooks Demo</h2>

    <!-- User Info -->
    <div v-if="isLoading" class="loading">⏳ جاري التحميل...</div>
    <div v-else-if="error" class="error">❌ خطأ: {{ error }}</div>
    <div v-else-if="user" class="user-info">
      <h3>👤 {{ user.name }}</h3>
      <p>📧 {{ user.email }}</p>
      <p>🌐 {{ user.website }}</p>
      <p>🏢 {{ user.company?.name }}</p>
    </div>

    <!-- User Posts -->
    <div v-if="posts.length" class="posts">
      <h4>أحدث المنشورات:</h4>
      <div v-for="post in posts" :key="post.id" class="post-card">
        <strong>{{ post.title }}</strong>
        <p>{{ post.body.slice(0, 60) }}...</p>
      </div>
    </div>

    <!-- Lifecycle Log -->
    <div class="lifecycle-log">
      <h4>🔁 سجل دورة الحياة:</h4>
      <div class="log-box">
        <p v-for="(entry, i) in lifecycleLog" :key="i" class="log-entry">{{ entry }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-fetcher {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
}

.loading { color: #999; padding: 1rem; }
.error { color: #c62828; background: #ffebee; padding: 1rem; border-radius: 8px; }

.user-info {
  background: #f0f9f4;
  padding: 1.25rem;
  border-radius: 10px;
  border-left: 4px solid #42b883;
  margin-bottom: 1rem;
}

.user-info h3 { margin: 0 0 0.5rem; }
.user-info p { margin: 0.25rem 0; color: #555; }

.posts { margin-bottom: 1.5rem; }

.post-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

.post-card strong { font-size: 0.9rem; }
.post-card p { color: #666; font-size: 0.82rem; margin: 0.25rem 0 0; }

.lifecycle-log h4 { color: #333; margin-bottom: 0.5rem; }

.log-box {
  background: #1e1e1e;
  color: #a8ff78;
  border-radius: 8px;
  padding: 1rem;
  font-family: monospace;
  font-size: 0.82rem;
  max-height: 180px;
  overflow-y: auto;
}

.log-entry { margin-bottom: 0.3rem; }
</style>
