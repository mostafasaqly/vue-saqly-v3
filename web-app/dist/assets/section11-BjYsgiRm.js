const e={id:11,title:"دورة حياة الـ Component",titleEn:"Lifecycle Hooks",level:"متوسط",levelEn:"Intermediate",lessons:["نظرة عامة على دورة الحياة","onMounted","onUpdated","onUnmounted","جلب البيانات عند الـ Mount","منطق التنظيف","أفضل ممارسات الـ Lifecycle"],lessonsEn:["Vue Component Lifecycle Overview","onMounted","onUpdated","onUnmounted","Fetching Data on Mount","Cleanup Logic","Lifecycle Best Practices"],intro:"كل component في Vue له دورة حياة من الإنشاء إلى الإزالة — نتعلم كيف نستفيد من كل مرحلة.",introEn:"Every Vue component has a lifecycle from creation to removal — learn how to tap into each phase.",content:[{type:"heading",text:"نظرة عامة على دورة الحياة"},{type:"list",items:["setup() / <script setup> — يُنفَّذ أولاً قبل كل شيء","onBeforeMount — قبل رسم الـ DOM الأول","onMounted — بعد رسم الـ DOM (الأكثر استخداماً)","onBeforeUpdate — قبل كل تحديث","onUpdated — بعد كل تحديث","onBeforeUnmount — قبل إزالة الـ component","onUnmounted — بعد الإزالة (لتنظيف الموارد)"]},{type:"heading",text:"onMounted — الأكثر استخداماً"},{type:"code",code:`<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    posts.value = await res.json()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
<\/script>

<template>
  <div v-if="loading">جارٍ التحميل...</div>
  <ul v-else>
    <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>
</template>`},{type:"tip",text:"onMounted هو المكان المناسب لجلب البيانات لأن الـ DOM موجود ومُهيَّأ. لا تجلب البيانات في setup مباشرة إذا كنت تحتاج الـ DOM."},{type:"heading",text:"onUpdated — بعد كل تحديث"},{type:"code",code:`<script setup>
import { ref, onUpdated } from 'vue'

const list = ref([])

onUpdated(() => {
  // يُنفَّذ بعد كل تحديث للـ DOM
  console.log('تحديث:', list.value.length, 'عنصر')
})
<\/script>`},{type:"warning",text:"لا تُعدّل الـ reactive state داخل onUpdated بدون شرط — سيسبب حلقة لا نهائية."},{type:"heading",text:"onUnmounted — تنظيف الموارد"},{type:"code",code:`<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const position = ref({ x: 0, y: 0 })

function updatePosition(e) {
  position.value = { x: e.clientX, y: e.clientY }
}

onMounted(() => {
  window.addEventListener('mousemove', updatePosition)
})

onUnmounted(() => {
  // تنظيف ضروري — تجنب memory leaks
  window.removeEventListener('mousemove', updatePosition)
})
<\/script>

<template>
  <p>X: {{ position.x }} | Y: {{ position.y }}</p>
</template>`},{type:"heading",text:"Lifecycle في Composable"},{type:"code",code:`// composables/useMousePosition.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const position = ref({ x: 0, y: 0 })

  function update(e) {
    position.value = { x: e.clientX, y: e.clientY }
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return position
}

// يمكن استخدامه في أي component
const mouse = useMousePosition()`},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"لماذا نُنظّف الـ Event Listeners في onUnmounted؟",answer:"لأنه عند إزالة الـ component من DOM، الـ Event Listeners لا تُزال تلقائياً — وتستمر في العمل وتستهلك ذاكرة (memory leak). التنظيف في onUnmounted يمنع هذه المشكلة."},{type:"qa",question:"ما الفرق بين onMounted وonUpdated؟",answer:"onMounted يُنفَّذ مرة واحدة فقط بعد أول رسم للـ component. onUpdated يُنفَّذ بعد كل تحديث للـ DOM الناتج عن تغيير في البيانات."}],contentEn:[{type:"heading",text:"Lifecycle Overview"},{type:"list",items:["setup() — runs first","onMounted — after DOM is ready (most common)","onUpdated — after each DOM update","onUnmounted — after removal (cleanup)"]},{type:"heading",text:"onMounted — Fetching Data"},{type:"code",code:`<script setup>
import { ref, onMounted } from 'vue'
const posts = ref([])

onMounted(async () => {
  const res = await fetch('/api/posts')
  posts.value = await res.json()
})
<\/script>`},{type:"heading",text:"onUnmounted — Cleanup"},{type:"code",code:`onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))`},{type:"heading",text:"✅ Review"},{type:"qa",question:"Why must we clean up Event Listeners in onUnmounted?",answer:"Because when a component is removed from the DOM, event listeners don't get removed automatically — they keep running and consuming memory (memory leak). Cleaning them in onUnmounted prevents this."}]};export{e as default};
