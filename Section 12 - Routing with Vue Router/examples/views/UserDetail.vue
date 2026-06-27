<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '../../Section 10 - Composition API/examples/useFetch'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

// route.params as props (when props: true in router config)
const props = defineProps({
  id: [String, Number],
})

const userId = computed(() => props.id || route.params.id)
const apiUrl = computed(() => `https://jsonplaceholder.typicode.com/users/${userId.value}`)

const { data: user, isLoading, error } = useFetch(apiUrl)

const goBack = () => router.back()
const goToNextUser = () => {
  router.push({ name: 'UserDetail', params: { id: Number(userId.value) + 1 } })
}
</script>

<template>
  <div class="user-detail" dir="rtl">
    <button @click="goBack" class="back-btn">← رجوع</button>

    <div v-if="isLoading" class="loading">⏳ جاري التحميل...</div>
    <div v-else-if="error" class="error">❌ خطأ: {{ error }}</div>
    <div v-else-if="user" class="user-card">
      <h1>👤 {{ user.name }}</h1>
      <div class="details">
        <p>📧 <strong>الإيميل:</strong> {{ user.email }}</p>
        <p>📞 <strong>الهاتف:</strong> {{ user.phone }}</p>
        <p>🌐 <strong>الموقع:</strong> {{ user.website }}</p>
        <p>🏢 <strong>الشركة:</strong> {{ user.company?.name }}</p>
        <p>📍 <strong>المدينة:</strong> {{ user.address?.city }}</p>
      </div>
      <div class="route-info">
        <small>Route Params: id = {{ route.params.id }}</small>
      </div>
      <button @click="goToNextUser" class="next-btn">المستخدم التالي ←</button>
    </div>
  </div>
</template>

<style scoped>
.user-detail { max-width: 500px; margin: 2rem auto; padding: 1.5rem; font-family: 'Segoe UI', sans-serif; }
.back-btn, .next-btn {
  padding: 0.5rem 1.1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
}
.next-btn { margin-top: 1rem; }
.user-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.details { margin: 1rem 0; }
.details p { margin: 0.5rem 0; }
.route-info { font-size: 0.75rem; color: #999; margin: 1rem 0; }
.loading { color: #999; }
.error { color: #c62828; background: #ffebee; padding: 1rem; border-radius: 8px; }
</style>
