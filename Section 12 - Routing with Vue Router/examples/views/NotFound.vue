<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="not-found" dir="rtl">
    <div class="content">
      <h1 class="code">404</h1>
      <h2>الصفحة غير موجودة!</h2>
      <p>عذراً، الصفحة التي تبحث عنها غير موجودة:</p>
      <code>{{ route.path }}</code>
      <div class="actions">
        <button @click="router.push('/')" class="btn-home">الرئيسية 🏠</button>
        <button @click="router.back()" class="btn-back">رجوع ←</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
  direction: rtl;
}

.content { padding: 2rem; }

.code {
  font-size: 8rem;
  color: #42b883;
  margin: 0;
  line-height: 1;
}

h2 { color: #333; margin: 0.5rem 0; }
p { color: #666; }
code { background: #f5f5f5; padding: 0.4rem 0.9rem; border-radius: 6px; color: #c62828; }

.actions { display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; }

button {
  padding: 0.65rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-home { background: #42b883; color: white; }
.btn-back { background: #f5f5f5; color: #333; }
</style>
