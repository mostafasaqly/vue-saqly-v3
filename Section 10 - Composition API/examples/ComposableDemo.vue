<script setup>
// ComposableDemo.vue — Using composables in a component
// عرض استخدام Composables في مكون
import { ref, computed, useId } from 'vue'
import { useCounter } from './useCounter'
import { useFetch } from './useFetch'

// useId (Vue 3.5) — unique ID for accessibility
const id = useId()

// useCounter composable
const { count, doubleCount, isPositive, increment, decrement, reset } = useCounter(5, 2)

// useFetch composable
const currentPage = ref(1)
const apiUrl = computed(() => `https://jsonplaceholder.typicode.com/posts?_page=${currentPage.value}&_limit=3`)
const { data: posts, isLoading, error, refetch } = useFetch(apiUrl)
</script>

<template>
  <div class="demo" dir="rtl">
    <h1>Composition API & Composables Demo</h1>
    <p class="id-demo">Component ID (useId): <code>{{ id }}</code></p>

    <!-- Counter Composable -->
    <section>
      <h2>useCounter — عداد رياكتيف</h2>
      <p>القيمة: <strong>{{ count }}</strong></p>
      <p>ضعف القيمة: <strong>{{ doubleCount }}</strong></p>
      <p>موجب؟ <strong>{{ isPositive ? 'نعم' : 'لا' }}</strong></p>
      <div class="controls">
        <button @click="decrement">−2</button>
        <button @click="reset">Reset</button>
        <button @click="increment">+2</button>
      </div>
    </section>

    <!-- Fetch Composable -->
    <section>
      <h2>useFetch — جلب البيانات</h2>
      <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage <= 1">السابق</button>
        <span>صفحة {{ currentPage }}</span>
        <button @click="currentPage++">التالي</button>
        <button @click="refetch">إعادة التحميل</button>
      </div>

      <div v-if="isLoading" class="loading">⏳ جاري التحميل...</div>
      <div v-else-if="error" class="error">❌ خطأ: {{ error }}</div>
      <div v-else>
        <article v-for="post in posts" :key="post.id" class="post-card">
          <h3>#{{ post.id }} — {{ post.title }}</h3>
          <p>{{ post.body.slice(0, 80) }}...</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo {
  max-width: 700px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
}

section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

h2 { color: #42b883; margin-bottom: 1rem; }

.id-demo {
  background: #f0f9f4;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.controls, .pagination {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

button {
  padding: 0.4rem 0.9rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled { background: #ccc; cursor: not-allowed; }

.loading { padding: 2rem; text-align: center; color: #999; }
.error { padding: 1rem; background: #ffebee; color: #c62828; border-radius: 6px; }

.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.post-card h3 { font-size: 0.95rem; color: #333; margin-bottom: 0.4rem; }
.post-card p { color: #666; font-size: 0.85rem; }
</style>
