export default {
  id: 14,
  title: "إدارة الـ State بـ Pinia",
  titleEn: "State Management with Pinia",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: ["ما هو الـ State Management؟", "الـ State المحلي مقابل العالمي", "تثبيت Pinia", "إنشاء Store", "Setup Stores مقابل Option Stores", "الـ State", "الـ Getters", "الـ Actions", "استخدام Store داخل Components", "حفظ الـ State", "أفضل ممارسات Pinia"],
  lessonsEn: ["What is State Management?", "Local vs Global State", "Installing Pinia", "Creating a Store", "Setup Stores vs Option Stores", "State", "Getters", "Actions", "Using a Store in Components", "Persisting State", "Pinia Best Practices"],
  intro: "Pinia هي مكتبة الـ state management الرسمية في Vue 3 — أبسط وأقوى من Vuex.",
  introEn: "Pinia is the official state management library for Vue 3 — simpler and more powerful than Vuex.",
  content: [
    { type: "heading", text: "متى تحتاج State Management؟" },
    { type: "paragraph", text: "عندما تحتاج عدة components غير مترابطة لنفس البيانات — مثل بيانات المستخدم المسجّل أو سلة التسوق. بدلاً من تمرير props عميقاً، تضع البيانات في Store مركزي." },
    { type: "heading", text: "تثبيت Pinia" },
    { type: "code", code: `$ npm install pinia` },
    { type: "code", code: `// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')` },
    { type: "heading", text: "إنشاء Store — Setup Style (الموصى به)" },
    { type: "code", code: `// stores/useCounterStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)

  // Getters
  const doubled = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)

  // Actions
  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = 0 }

  return { count, doubled, isPositive, increment, decrement, reset }
})` },
    { type: "tip", text: "Setup Store أشبه بـ Composable — نفس أسلوب Composition API، مما يجعله سهل الفهم إذا تعلّمت Composition API." },
    { type: "heading", text: "استخدام Store في Component" },
    { type: "code", code: `<script setup>
import { useCounterStore } from '@/stores/useCounterStore'
import { storeToRefs } from 'pinia'

const counter = useCounterStore()

// storeToRefs للحصول على refs reactive من الـ store
const { count, doubled } = storeToRefs(counter)

// actions تؤخذ مباشرة (ليست reactive)
const { increment, decrement, reset } = counter
</script>

<template>
  <p>العدد: {{ count }} (ضعف: {{ doubled }})</p>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
  <button @click="reset">إعادة</button>
</template>` },
    { type: "warning", text: "لا تُفكّك الـ store state مباشرة (const { count } = counter) — ستفقد الـ reactivity. استخدم storeToRefs بدلاً من ذلك." },
    { type: "heading", text: "مثال عملي — Cart Store" },
    { type: "code", code: `// stores/useCartStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )
  const count = computed(() =>
    items.value.reduce((sum, item) => sum + item.qty, 0)
  )

  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) existing.qty++
    else items.value.push({ ...product, qty: 1 })
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function updateQty(id, qty) {
    const item = items.value.find(i => i.id === id)
    if (item) item.qty = qty
  }

  function clearCart() { items.value = [] }

  return { items, total, count, addItem, removeItem, updateQty, clearCart }
})` },
    { type: "heading", text: "حفظ الـ State (Persistence)" },
    { type: "code", code: `// stores/useCartStore.js مع persistence
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(
    JSON.parse(localStorage.getItem('cart') || '[]')
  )

  // حفظ تلقائي عند كل تغيير
  watch(items, (val) => {
    localStorage.setItem('cart', JSON.stringify(val))
  }, { deep: true })

  // ... بقية الكود
})` },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "لماذا نستخدم storeToRefs عند تفكيك Store في Vue؟", answer: "لأن تفكيك الـ store مباشرة يكسر الـ reactivity. storeToRefs تُحوّل كل خاصية إلى ref تحافظ على اتصالها بالـ store." },
    { type: "qa", question: "ما الفرق بين Pinia وVuex؟", answer: "Pinia أبسط (بدون mutations)، يدعم TypeScript بشكل أفضل، يدعم Composition API، وهو الحل الرسمي الموصى به لـ Vue 3. Vuex لا تزال تعمل لكنها لم تعد الموصى بها للمشاريع الجديدة." },
  ],
  contentEn: [
    { type: "heading", text: "Creating a Store — Setup Style" },
    { type: "code", code: `// stores/useCartStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )
  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) existing.qty++
    else items.value.push({ ...product, qty: 1 })
  }
  return { items, total, addItem }
})` },
    { type: "heading", text: "Using the Store" },
    { type: "code", code: `<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { storeToRefs } from 'pinia'

const cart = useCartStore()
const { items, total } = storeToRefs(cart)
const { addItem } = cart
</script>` },
    { type: "warning", text: "Don't destructure store state directly — use storeToRefs to keep reactivity." },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "Why use storeToRefs when destructuring a Pinia store?", answer: "Direct destructuring breaks reactivity. storeToRefs converts each property into a reactive ref that stays connected to the store." },
  ],
};
