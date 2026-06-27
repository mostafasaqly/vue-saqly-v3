export default {
  id: 14,
  title: "إدارة الـ State بـ Pinia",
  titleEn: "State Management with Pinia",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: [
    "متى تحتاج State Management؟",
    "تثبيت Pinia",
    "Setup Store — الأسلوب الموصى به",
    "State وGetters وActions",
    "استخدام Store في Components",
    "storeToRefs — حفظ الـ Reactivity",
    "مثال عملي — useCartStore",
    "مثال عملي — useAuthStore",
    "حفظ الـ State بـ localStorage",
    "مكتبة pinia-plugin-persistedstate",
    "Pinia مقابل Vuex",
  ],
  lessonsEn: [
    "When Do You Need State Management?",
    "Installing Pinia",
    "Setup Store — Recommended Style",
    "State, Getters & Actions",
    "Using Store in Components",
    "storeToRefs — Keeping Reactivity",
    "Practical — useCartStore",
    "Practical — useAuthStore",
    "Persisting State with localStorage",
    "pinia-plugin-persistedstate Library",
    "Pinia vs Vuex",
  ],
  intro: "Pinia هي مكتبة الـ state management الرسمية في Vue 3 — أبسط وأقوى من Vuex وبدون mutations.",
  introEn: "Pinia is the official state management library for Vue 3 — simpler and more powerful than Vuex, with no mutations.",
  content: [
    { type: "heading", text: "متى تحتاج State Management؟" },
    { type: "paragraph", text: "تحتاج Pinia عندما تحتاج عدة components غير مترابطة لنفس البيانات. الأمثلة الشائعة:" },
    { type: "list", items: [
      "بيانات المستخدم المسجّل (الاسم، الصورة، الصلاحيات) — تحتاجها Navbar وDashboard وSettings",
      "سلة التسوق — ProductCard وNavbar وCheckout",
      "الإشعارات — تظهر في Navbar وتُدار من أي page",
      "نتائج API مخزّنة لتجنب طلبات متكررة",
    ]},
    { type: "heading", text: "تثبيت وإعداد Pinia" },
    { type: "code", code: `$ npm install pinia

# main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')` },
    { type: "heading", text: "إنشاء Store — Setup Style" },
    { type: "code", code: `// stores/useCounterStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State — نفس أسلوب Composition API
  const count = ref(0)
  const step = ref(1)

  // Getters — computed properties
  const doubled = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)

  // Actions — عمليات تعديل الـ state
  function increment() { count.value += step.value }
  function decrement() { count.value -= step.value }
  function reset() { count.value = 0 }
  function setStep(val) { step.value = val }

  return { count, step, doubled, isPositive, increment, decrement, reset, setStep }
})` },
    { type: "tip", text: "Setup Store أشبه تماماً بـ Composable — نفس أسلوب Composition API. إذا تعلّمت Composition API، أنت تعرف Setup Store تقريباً." },
    { type: "heading", text: "استخدام Store في Component" },
    { type: "code", code: `<script setup>
import { useCounterStore } from '@/stores/useCounterStore'
import { storeToRefs } from 'pinia'

const counter = useCounterStore()

// storeToRefs: تُحوّل state وgetters إلى refs تحافظ على الـ reactivity
const { count, doubled, isPositive } = storeToRefs(counter)

// Actions تؤخذ مباشرة من الـ store (ليست refs)
const { increment, decrement, reset } = counter
</script>

<template>
  <p>العدد: {{ count }} (ضعف: {{ doubled }})</p>
  <span v-if="isPositive">موجب ✅</span>
  <button @click="decrement" :disabled="!isPositive">−</button>
  <button @click="reset">إعادة</button>
  <button @click="increment">+</button>
</template>` },
    { type: "warning", text: "لا تُفكّك الـ store state مباشرة: const { count } = counter — ستفقد الـ reactivity وتحصل على نسخة ثابتة. استخدم storeToRefs دائماً للـ state والـ getters." },
    { type: "heading", text: "مثال عملي — useCartStore" },
    { type: "code", code: `// stores/useCartStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.qty, 0)
  )
  const isEmpty = computed(() => items.value.length === 0)
  const shippingCost = computed(() => total.value >= 200 ? 0 : 25)
  const grandTotal = computed(() => total.value + shippingCost.value)

  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...product, qty: 1 })
    }
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function updateQty(id, qty) {
    if (qty <= 0) { removeItem(id); return }
    const item = items.value.find(i => i.id === id)
    if (item) item.qty = qty
  }

  function clearCart() { items.value = [] }

  return {
    items, total, itemCount, isEmpty, shippingCost, grandTotal,
    addItem, removeItem, updateQty, clearCart,
  }
})` },
    { type: "heading", text: "مثال عملي — useAuthStore" },
    { type: "code", code: `// stores/useAuthStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usersAPI } from '@/api/users'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token') || null)

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(credentials) {
    const { data } = await usersAPI.login(credentials)
    token.value = data.token
    user.value = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push({ name: 'dashboard' })
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push({ name: 'login' })
  }

  return { user, token, isLoggedIn, isAdmin, login, logout }
})` },
    { type: "heading", text: "حفظ الـ State بـ localStorage" },
    { type: "code", code: `// الطريقة اليدوية داخل store
import { watch } from 'vue'

const cart = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

  watch(items, (val) => {
    localStorage.setItem('cart', JSON.stringify(val))
  }, { deep: true })

  // ...
})

// الطريقة الأفضل — pinia-plugin-persistedstate
// npm install pinia-plugin-persistedstate

// main.js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// stores/useCartStore.js
export const useCartStore = defineStore('cart', () => {
  // ...
}, {
  persist: true, // يحفظ كل الـ state تلقائياً
  // persist: { key: 'my-cart', paths: ['items'] } // حفظ محدد
})` },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "لماذا نستخدم storeToRefs عند تفكيك Store في Vue؟", answer: "لأن Pinia store هو reactive object — تفكيكه المباشر ينسخ القيم كـ plain values فتفقد الـ reactivity. storeToRefs تُحوّل كل خاصية إلى ref تحافظ على اتصالها بالـ store." },
    { type: "qa", question: "ما الفرق بين Pinia وVuex؟", answer: "Pinia أبسط (بدون mutations — actions تُعدّل الـ state مباشرة)، TypeScript ممتاز، يدعم Composition API وهو الحل الرسمي الموصى به لـ Vue 3. Vuex لا تزال تعمل لكنها لم تعد الموصى بها للمشاريع الجديدة." },
    { type: "qa", question: "لماذا الـ state يمكن تعديله مباشرة في Pinia بدون mutations؟", answer: "Pinia يستخدم Vue's reactivity system (Proxy) مباشرة — أي تعديل على الـ state يتتبعه Vue تلقائياً ويُحدّث الـ UI. Vuex كان يحتاج mutations لأن Redux's immutability pattern ليس ضرورياً مع Vue's reactive system." },
    { type: "qa", question: "متى تستخدم Pinia ومتى تكتفي بـ local state؟", answer: "استخدم local state (ref داخل component) للبيانات المحلية التي لا تحتاجها components أخرى. استخدم Pinia عندما: بيانات تشاركها components غير مترابطة، بيانات تبقى بين التنقلات (navigation)، أو بيانات تحتاج persistence." },
  ],
  contentEn: [
    { type: "heading", text: "Creating a Store — Setup Style" },
    { type: "code", code: `// stores/useCounterStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  // Getters
  const doubled = computed(() => count.value * 2)
  // Actions
  function increment() { count.value++ }
  function reset() { count.value = 0 }

  return { count, doubled, increment, reset }
})` },
    { type: "heading", text: "Using the Store in a Component" },
    { type: "code", code: `<script setup>
import { useCounterStore } from '@/stores/useCounterStore'
import { storeToRefs } from 'pinia'

const counter = useCounterStore()

// storeToRefs: converts state/getters to reactive refs
const { count, doubled } = storeToRefs(counter)
// Actions: take directly from store (not refs)
const { increment, reset } = counter
</script>` },
    { type: "warning", text: "Don't destructure store state directly — use storeToRefs to keep reactivity." },
    { type: "heading", text: "Cart Store Example" },
    { type: "code", code: `// stores/useCartStore.js
export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))
  const itemCount = computed(() => items.value.reduce((s, i) => s + i.qty, 0))

  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) existing.qty++
    else items.value.push({ ...product, qty: 1 })
  }
  function removeItem(id) { items.value = items.value.filter(i => i.id !== id) }
  function clearCart() { items.value = [] }

  return { items, total, itemCount, addItem, removeItem, clearCart }
})` },
    { type: "heading", text: "Persisting State" },
    { type: "code", code: `// Manual: watch + localStorage
watch(items, (val) => localStorage.setItem('cart', JSON.stringify(val)), { deep: true })

// Better: pinia-plugin-persistedstate
// npm install pinia-plugin-persistedstate
// main.js: pinia.use(piniaPluginPersistedstate)
// store: }, { persist: true })` },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "Why use storeToRefs when destructuring a Pinia store?", answer: "Direct destructuring copies values as plain (non-reactive) values that lose their connection to the store. storeToRefs converts each property into a reactive ref that stays connected to the store." },
    { type: "qa", question: "What is the difference between Pinia and Vuex?", answer: "Pinia has no mutations (actions modify state directly), excellent TypeScript support, Composition API style, and is the officially recommended library for Vue 3. Vuex still works but is no longer recommended for new projects." },
  ],
};
