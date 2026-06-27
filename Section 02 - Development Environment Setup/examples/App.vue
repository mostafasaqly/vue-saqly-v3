<script setup>
// src/App.vue — Basic SFC Skeleton / هيكل مكون Vue أساسي
// This is the root component of every Vue application
// هذا هو المكون الجذري لأي تطبيق Vue

import { RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'

const appName = ref('تطبيق Vue 3 | Vue 3 App')
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">الرئيسية | Home</RouterLink>
      <RouterLink to="/about">عن التطبيق | About</RouterLink>
    </nav>
    <h1>{{ appName }}</h1>
  </header>

  <main>
    <!-- Pages are rendered here via Vue Router -->
    <!-- الصفحات تُعرض هنا عبر Vue Router -->
    <RouterView />
  </main>

  <footer>
    <p>مصطفى سقلى — Vue 3 Course 2024</p>
  </footer>
</template>

<style scoped>
header {
  background-color: #42b883;
  padding: 1rem;
  color: white;
}

nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

nav a.router-link-active {
  text-decoration: underline;
}

main {
  padding: 2rem;
  min-height: 80vh;
}

footer {
  text-align: center;
  padding: 1rem;
  background: #f0f0f0;
  font-size: 0.85rem;
}
</style>
