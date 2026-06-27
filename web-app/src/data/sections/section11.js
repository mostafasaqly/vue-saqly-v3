export default {
  id: 11,
  title: "دورة حياة الـ Component",
  titleEn: "Lifecycle Hooks",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: [
    "نظرة عامة على دورة الحياة",
    "onBeforeMount وonMounted",
    "onBeforeUpdate وonUpdated",
    "onBeforeUnmount وonUnmounted",
    "جلب البيانات مع AbortController",
    "Cleanup في Composables",
    "useEventListener Composable",
    "useMousePosition Composable",
    "مرجع سريع لـ Lifecycle Hooks",
  ],
  lessonsEn: [
    "Lifecycle Overview",
    "onBeforeMount & onMounted",
    "onBeforeUpdate & onUpdated",
    "onBeforeUnmount & onUnmounted",
    "Data Fetching with AbortController",
    "Cleanup in Composables",
    "useEventListener Composable",
    "useMousePosition Composable",
    "Lifecycle Hooks Quick Reference",
  ],
  intro: "كل component في Vue له دورة حياة من الإنشاء إلى الإزالة — نتعلم كيف نستفيد من كل مرحلة ونتجنب memory leaks.",
  introEn: "Every Vue component has a lifecycle from creation to removal — learn how to tap into each phase and avoid memory leaks.",
  content: [
    { type: "heading", text: "نظرة عامة على دورة الحياة" },
    { type: "paragraph", text: "في Vue 3 مع Composition API، الـ lifecycle hooks دوال عادية تستوردها من 'vue':" },
    { type: "list", items: [
      "setup / <script setup> — يُنفَّذ أولاً (لا يوجد onSetup)",
      "onBeforeMount — قبل رسم الـ DOM الأول (لا يمكن الوصول للـ DOM)",
      "onMounted — بعد رسم الـ DOM ✅ (الأكثر استخداماً — جلب بيانات، DOM manipulation)",
      "onBeforeUpdate — قبل كل تحديث للـ DOM",
      "onUpdated — بعد كل تحديث للـ DOM",
      "onBeforeUnmount — قبل إزالة الـ component",
      "onUnmounted — بعد الإزالة ✅ (تنظيف event listeners، timers، subscriptions)",
      "onErrorCaptured — لالتقاط أخطاء الـ child components",
    ]},
    { type: "heading", text: "onMounted — جلب البيانات" },
    { type: "code", code: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const posts = ref([])
const loading = ref(true)
const error = ref(null)
let controller = null // نحفظ الـ AbortController

onMounted(async () => {
  controller = new AbortController()

  try {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=5',
      { signal: controller.signal }
    )
    if (!res.ok) throw new Error('فشل جلب البيانات')
    posts.value = await res.json()
  } catch (e) {
    if (e.name !== 'AbortError') {
      error.value = e.message
    }
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  controller?.abort() // إلغاء الطلب إذا غادر المستخدم
})
</script>

<template>
  <div v-if="loading">جارٍ التحميل...</div>
  <p v-else-if="error" class="error">{{ error }}</p>
  <ul v-else>
    <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>
</template>` },
    { type: "heading", text: "onUpdated — بعد كل تحديث" },
    { type: "code", code: `<script setup>
import { ref, onUpdated } from 'vue'

const list = ref([])
const listEl = ref(null) // يحتاج <ul ref="listEl">

onUpdated(() => {
  // يُنفَّذ بعد كل تحديث للـ DOM
  // مثلاً: تمرير للأسفل عند إضافة عنصر
  if (listEl.value) {
    listEl.value.scrollTop = listEl.value.scrollHeight
  }
})
</script>` },
    { type: "warning", text: "لا تُعدّل الـ reactive state داخل onUpdated بدون شرط — ستسبب حلقة لا نهائية (تحديث → onUpdated → تحديث → ...)." },
    { type: "heading", text: "onUnmounted — تنظيف الموارد" },
    { type: "code", code: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const position = ref({ x: 0, y: 0 })
let timer = null

function updatePosition(e) {
  position.value = { x: e.clientX, y: e.clientY }
}

onMounted(() => {
  window.addEventListener('mousemove', updatePosition)
  timer = setInterval(() => { /* ... */ }, 1000)
})

onUnmounted(() => {
  // ❌ نسيان التنظيف → memory leak
  // ✅ تنظيف كل شيء
  window.removeEventListener('mousemove', updatePosition)
  clearInterval(timer)
})
</script>` },
    { type: "heading", text: "useEventListener — Composable للـ Event Listeners" },
    { type: "code", code: `// composables/useEventListener.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, handler) {
  onMounted(() => target.addEventListener(event, handler))
  onUnmounted(() => target.removeEventListener(event, handler))
}

// استخدام — التنظيف يحدث تلقائياً
// composables/useMousePosition.js
import { ref } from 'vue'
import { useEventListener } from './useEventListener'

export function useMousePosition() {
  const position = ref({ x: 0, y: 0 })

  useEventListener(window, 'mousemove', (e) => {
    position.value = { x: e.clientX, y: e.clientY }
  })

  return position
}` },
    { type: "code", code: `<!-- MouseTracker.vue -->
<script setup>
import { useMousePosition } from '@/composables/useMousePosition'

const mouse = useMousePosition()
</script>

<template>
  <p>X: {{ mouse.x }} | Y: {{ mouse.y }}</p>
</template>` },
    { type: "tip", text: "عندما تُضيف lifecycle hooks داخل Composable، تُنفَّذ في سياق الـ component الذي يستدعيها — تنظيف onUnmounted يحدث عند إزالة الـ component تلقائياً." },
    { type: "heading", text: "مرجع سريع — متى تستخدم كل hook؟" },
    { type: "list", items: [
      "onMounted: جلب البيانات، DOM manipulation، إضافة event listeners، تهيئة libraries (chart.js, leaflet)",
      "onUpdated: التمرير التلقائي، قراءة حجم العنصر بعد التحديث",
      "onUnmounted: إزالة event listeners، إلغاء fetch requests، تنظيف timers/intervals",
      "onErrorCaptured: التعامل مع أخطاء الـ children، error boundaries",
    ]},
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "لماذا نُنظّف الـ Event Listeners في onUnmounted؟", answer: "لأنه عند إزالة الـ component من DOM، الـ Event Listeners لا تُزال تلقائياً — وتستمر في العمل وتستهلك ذاكرة (memory leak). إذا أُضيف الـ component مرات عدة يتراكم عدد الـ listeners." },
    { type: "qa", question: "ما الفرق بين onMounted وonUpdated؟", answer: "onMounted يُنفَّذ مرة واحدة فقط بعد أول رسم للـ component — مثالي لجلب البيانات وإضافة listeners. onUpdated يُنفَّذ بعد كل تحديث للـ DOM الناتج عن تغيير في البيانات — للتفاعل مع التغييرات." },
    { type: "qa", question: "لماذا نستخدم AbortController مع fetch في onMounted؟", answer: "إذا غادر المستخدم الصفحة قبل اكتمال الـ fetch، الطلب يكمل وقد يُحدّث state لـ component غير موجود (causing warnings). AbortController.abort() في onUnmounted يلغي الطلب." },
    { type: "qa", question: "هل يمكن استخدام lifecycle hooks داخل Composable؟", answer: "نعم. هذا من أقوى ميزات Composition API — يمكن وضع onMounted وonUnmounted داخل Composable. يُنفَّذان في سياق الـ component الذي يستدعي الـ Composable — الـ composable يُدير دورة حياته بنفسه." },
  ],
  contentEn: [
    { type: "heading", text: "Lifecycle Overview" },
    { type: "list", items: [
      "setup — runs first (no DOM access yet)",
      "onMounted — DOM is ready ✅ (fetch data, DOM refs, start listeners)",
      "onUpdated — after each reactive data change triggers a DOM update",
      "onUnmounted — cleanup ✅ (remove listeners, cancel requests, clear timers)",
      "onErrorCaptured — catch errors from child components",
    ]},
    { type: "heading", text: "onMounted — Data Fetching with AbortController" },
    { type: "code", code: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const posts = ref([])
const loading = ref(true)
let controller = null

onMounted(async () => {
  controller = new AbortController()
  try {
    const res = await fetch('/api/posts', { signal: controller.signal })
    posts.value = await res.json()
  } catch (e) {
    if (e.name !== 'AbortError') console.error(e)
  } finally {
    loading.value = false
  }
})

onUnmounted(() => controller?.abort())
</script>` },
    { type: "heading", text: "useEventListener Composable" },
    { type: "code", code: `// composables/useEventListener.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, handler) {
  onMounted(() => target.addEventListener(event, handler))
  onUnmounted(() => target.removeEventListener(event, handler))
}

// composables/useMousePosition.js
import { ref } from 'vue'
import { useEventListener } from './useEventListener'

export function useMousePosition() {
  const position = ref({ x: 0, y: 0 })
  useEventListener(window, 'mousemove', (e) => {
    position.value = { x: e.clientX, y: e.clientY }
  })
  return position
}

// Usage — cleanup is automatic
const mouse = useMousePosition()` },
    { type: "tip", text: "Lifecycle hooks inside a Composable run in the context of the calling component — onUnmounted cleanup fires automatically when that component is unmounted." },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "Why must we clean up event listeners in onUnmounted?", answer: "When a component is removed from the DOM, event listeners don't get removed automatically — they keep running and hold a reference to the component, causing memory leaks. If the component is mounted many times, listeners accumulate." },
    { type: "qa", question: "What is the difference between onMounted and onUpdated?", answer: "onMounted fires once after the initial DOM render — ideal for data fetching and adding listeners. onUpdated fires after every DOM update triggered by reactive data changes." },
    { type: "qa", question: "Can you use lifecycle hooks inside a Composable?", answer: "Yes — this is one of Composition API's most powerful features. onMounted and onUnmounted inside a Composable run in the context of the component that calls the composable. The composable manages its own lifecycle." },
  ],
};
