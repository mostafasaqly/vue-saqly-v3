export default {
  id: 6,
  title: "أساسيات الـ Reactivity",
  titleEn: "Reactivity Fundamentals",
  level: "مبتدئ",
  levelEn: "Beginner",
  lessons: ["ما هي الـ Reactivity؟", "ref", "قراءة وتحديث الـ Refs", "reactive", "ref مقابل reactive", "الـ Computed Properties", "الـ Watchers (watch)", "watchEffect", "تنظيف الـ Watcher بـ onWatcherCleanup", "أخطاء الـ Reactivity الشائعة"],
  lessonsEn: ["What is Reactivity?", "ref", "Reading & Updating Refs", "reactive", "ref vs reactive", "Computed Properties", "Watchers (watch)", "watchEffect", "Watcher Cleanup with onWatcherCleanup", "Common Reactivity Mistakes"],
  intro: "نظام الـ Reactivity هو قلب Vue — نتعلم ref وreactive وcomputed وwatch لبناء واجهات تتحدث تلقائياً.",
  introEn: "Vue's reactivity system is its heart — learn ref, reactive, computed, and watch to build UIs that update automatically.",
  content: [
    { type: "heading", text: "ما هي الـ Reactivity؟" },
    { type: "paragraph", text: "الـ Reactivity تعني أن Vue يراقب البيانات، فإذا تغيّرت يُحدّث الـ Template تلقائياً بدون أن تتدخل أنت. هذا هو الفرق الجوهري بين Vue وكتابة JavaScript عادية." },
    { type: "heading", text: "ref — لقيم بسيطة" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'

const count = ref(0)       // رقم
const name = ref('Vue')    // نص
const isOpen = ref(false)  // boolean

// القراءة والتحديث داخل script تحتاج .value
console.log(count.value)  // 0
count.value++              // تحديث

// في الـ Template لا تحتاج .value
</script>

<template>
  <p>{{ count }}</p>
  <button @click="count++">+1</button>
</template>` },
    { type: "warning", text: "لا تنسَ .value عند التعامل مع ref داخل <script setup>. في الـ Template Vue يضيفها تلقائياً." },
    { type: "heading", text: "reactive — للكائنات والمصفوفات" },
    { type: "code", code: `<script setup>
import { reactive } from 'vue'

const user = reactive({
  name: 'مصطفى',
  age: 30,
  skills: ['Vue', 'JavaScript']
})

// التحديث مباشر بدون .value
user.name = 'أحمد'
user.skills.push('TypeScript')
</script>

<template>
  <p>{{ user.name }} — {{ user.age }}</p>
  <li v-for="s in user.skills" :key="s">{{ s }}</li>
</template>` },
    { type: "heading", text: "ref مقابل reactive — متى تستخدم أيهما؟" },
    { type: "list", items: ["ref: لقيم بسيطة (string, number, boolean) أو لـ arrays وobjects تريد إعادة تعيينها بالكامل", "reactive: لكائنات معقدة لا تحتاج إعادة تعيين كاملة", "التوجيه الرسمي: استخدم ref دائماً — أبسط وأكثر اتساقاً"] },
    { type: "heading", text: "computed — خصائص محسوبة" },
    { type: "code", code: `<script setup>
import { ref, computed } from 'vue'

const firstName = ref('مصطفى')
const lastName = ref('سقلى')

// computed تُحسب مرة وتُخزن مؤقتاً حتى تتغير المدخلات
const fullName = computed(() => firstName.value + ' ' + lastName.value)

const items = ref([1, 2, 3, 4, 5])
const evenItems = computed(() => items.value.filter(n => n % 2 === 0))
</script>

<template>
  <p>{{ fullName }}</p>
  <p>{{ evenItems }}</p>
</template>` },
    { type: "tip", text: "computed يُخزّن النتيجة مؤقتاً (cache) — لا يُعيد الحساب إلا إذا تغيّرت المدخلات. Method عادية تُنفَّذ في كل رسم." },
    { type: "heading", text: "watch — مراقبة التغييرات" },
    { type: "code", code: `<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])

// مراقبة ref واحدة
watch(query, async (newVal, oldVal) => {
  if (newVal.length < 2) { results.value = []; return }
  results.value = await searchAPI(newVal)
})

// مراقبة عدة مصادر
const a = ref(1), b = ref(2)
watch([a, b], ([newA, newB]) => {
  console.log('تغيّر:', newA, newB)
})
</script>` },
    { type: "heading", text: "watchEffect — مراقبة تلقائية" },
    { type: "code", code: `<script setup>
import { ref, watchEffect } from 'vue'

const id = ref(1)

// يُنفَّذ فوراً ويتتبع التبعيات تلقائياً
watchEffect(async () => {
  const data = await fetch('/api/users/' + id.value)
  // يُعاد التنفيذ كلما تغيّرت id.value
})
</script>` },
    { type: "heading", text: "onWatcherCleanup (Vue 3.5)" },
    { type: "code", code: `import { ref, watch, onWatcherCleanup } from 'vue'

const id = ref(1)

watch(id, (newId) => {
  const controller = new AbortController()

  onWatcherCleanup(() => {
    controller.abort() // يُلغي الطلب القديم عند تغيير id
  })

  fetch('/api/users/' + newId, { signal: controller.signal })
})` },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "لماذا تحتاج .value مع ref داخل script لكن ليس في template؟", answer: "Vue يُغلّف القيمة داخل كائن ref لجعلها reactive. في الـ template، Vue يُطبّق unwrapping تلقائياً. في الـ script تتعامل مع الكائن مباشرة لذا تحتاج .value." },
    { type: "qa", question: "ما الفرق بين watch وwatchEffect؟", answer: "watch تستمع لمصادر محددة تصرّح بها. watchEffect تتتبع كل reactive dependency تستخدمها تلقائياً وتُنفَّذ فوراً." },
  ],
  contentEn: [
    { type: "heading", text: "ref — for primitive values" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const count = ref(0)
// In script, use .value
count.value++
// In template, Vue unwraps automatically
</script>

<template>
  <p>{{ count }}</p>
  <button @click="count++">+1</button>
</template>` },
    { type: "heading", text: "computed — Cached Derived Values" },
    { type: "code", code: `<script setup>
import { ref, computed } from 'vue'
const firstName = ref('Mostafa')
const lastName = ref('Saqly')
const fullName = computed(() => firstName.value + ' ' + lastName.value)
</script>` },
    { type: "tip", text: "computed caches its result and only recomputes when its reactive dependencies change — unlike a plain method." },
    { type: "heading", text: "watch vs watchEffect" },
    { type: "code", code: `// watch — explicit sources
watch(query, (newVal) => { /* runs when query changes */ })

// watchEffect — tracks automatically, runs immediately
watchEffect(() => { console.log(query.value) })` },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "Why do you need .value with ref inside script but not in template?", answer: "Vue wraps the value in a ref object to make it reactive. In the template, Vue automatically unwraps refs. In the script you work with the object directly, so .value is required." },
  ],
};
