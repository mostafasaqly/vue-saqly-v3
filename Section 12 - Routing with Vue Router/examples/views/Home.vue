<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goToUser = (id) => router.push({ name: 'UserDetail', params: { id } })
const goToSearch = (query) => router.push({ name: 'Search', query: { q: query } })
</script>

<template>
  <div class="home" dir="rtl">
    <h1>الصفحة الرئيسية 🏠</h1>
    <p>مرحباً بك في تطبيق Vue Router Demo</p>

    <section>
      <h2>التنقل البرمجي | Programmatic Navigation</h2>
      <div class="nav-buttons">
        <button @click="goToUser(1)">عرض المستخدم #1</button>
        <button @click="goToUser(2)">عرض المستخدم #2</button>
        <button @click="goToSearch('vue')">البحث عن Vue</button>
        <RouterLink to="/about" class="link-btn">عن التطبيق</RouterLink>
      </div>
    </section>

    <section>
      <h2>معلومات الـ Route الحالي | Current Route Info</h2>
      <pre>{{ JSON.stringify({ path: route.path, name: route.name, query: route.query }, null, 2) }}</pre>
    </section>
  </div>
</template>

<style scoped>
.home { max-width: 600px; margin: 2rem auto; padding: 1.5rem; font-family: 'Segoe UI', sans-serif; }
h1 { color: #42b883; }
section { border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.25rem; margin-top: 1.5rem; }
.nav-buttons { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.75rem; }
button, .link-btn {
  padding: 0.5rem 1.1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
}
pre { background: #f5f5f5; padding: 1rem; border-radius: 6px; font-size: 0.85rem; }
</style>
