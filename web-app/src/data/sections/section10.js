export default {
  id: 10,
  title: "Composition API",
  titleEn: "Composition API",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: ["ما هو Composition API؟", "دالة setup", "<script setup>", "الـ State التفاعلية", "الـ Methods", "computed", "watch", "توليد IDs بـ useId", "إنشاء Composables", "إعادة استخدام المنطق"],
  lessonsEn: ["What is Composition API?", "setup Function", "<script setup>", "Reactive State", "Methods", "Computed", "Watch", "Generating IDs with useId", "Creating Composables", "Reusing Logic with Composables"],
  intro: "نتعمق في Composition API — الأسلوب الحديث لتنظيم الكود في Vue 3، وكيف نبني Composables لإعادة الاستخدام.",
  introEn: "Deep dive into Composition API — the modern way to organize Vue 3 code, and how to build Composables for reuse.",
  content: [
    { type: "heading", text: "ما هو Composition API ولماذا وُجد؟" },
    { type: "paragraph", text: "Composition API وُجد لحل مشكلة Options API في المشاريع الكبيرة: عندما يكبر الـ component تتشتت المنطق المتعلق بميزة واحدة بين data وmethods وcomputed. Composition API يُجمّع المنطق المتعلق حسب الميزة." },
    { type: "code", code: `// Options API - المنطق مُشتَّت
export default {
  data() { return { count: 0, user: null } },
  computed: { doubled() { return this.count * 2 } },
  methods: { increment() { this.count++ } },
  mounted() { this.fetchUser() }
}

// Composition API - المنطق مُجمَّع
<script setup>
import { ref, computed, onMounted } from 'vue'

// كل ما يخص العداد مجتمع
const count = ref(0)
const doubled = computed(() => count.value * 2)
function increment() { count.value++ }

// كل ما يخص المستخدم مجتمع
const user = ref(null)
async function fetchUser() { user.value = await api.getUser() }
onMounted(fetchUser)
</script>` },
    { type: "heading", text: "setup مقابل <script setup>" },
    { type: "code", code: `// دالة setup الصريحة
export default {
  setup() {
    const count = ref(0)
    return { count } // يجب إرجاع ما تريد استخدامه
  }
}

// <script setup> — أبسط وأسرع (مُستحسن)
<script setup>
const count = ref(0)
// لا حاجة لـ return — كل شيء مكشوف تلقائياً
</script>` },
    { type: "heading", text: "useId (Vue 3.5)" },
    { type: "code", code: `<script setup>
import { useId } from 'vue'

// يولّد ID فريد مستقر — مفيد لربط input بـ label
const id = useId()
</script>

<template>
  <label :for="id">الاسم</label>
  <input :id="id" v-model="name" />
</template>` },
    { type: "heading", text: "إنشاء Composables — منطق قابل لإعادة الاستخدام" },
    { type: "code", code: `// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const doubled = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = initial }

  return { count, doubled, increment, decrement, reset }
}` },
    { type: "code", code: `// استخدامه في أي component
<script setup>
import { useCounter } from '@/composables/useCounter'

const { count, doubled, increment, reset } = useCounter(10)
</script>

<template>
  <p>{{ count }} (ضعف: {{ doubled }})</p>
  <button @click="increment">+1</button>
  <button @click="reset">إعادة</button>
</template>` },
    { type: "heading", text: "Composable عملي — useFetch" },
    { type: "code", code: `// composables/useFetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  fetch(url)
    .then(r => r.json())
    .then(d => { data.value = d })
    .catch(e => { error.value = e.message })
    .finally(() => { loading.value = false })

  return { data, loading, error }
}

// الاستخدام
const { data: posts, loading, error } = useFetch('/api/posts')` },
    { type: "tip", text: "الـ Composable يبدأ دائماً بـ use (useCounter, useFetch) — اتفاقية مهمة في Vue." },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين Composable وComponent؟", answer: "Component هو قطعة UI مرئية (Template + Logic). Composable هو منطق فقط بدون Template — يمكن استخدامه في أي component." },
    { type: "qa", question: "لماذا يُفضَّل <script setup> على دالة setup()؟", answer: "<script setup> أبسط في الكتابة (لا return)، أفضل أداءً (less overhead)، ويدعم Compiler Macros مثل defineProps وdefineEmits مباشرة." },
  ],
  contentEn: [
    { type: "heading", text: "Composition API vs Options API" },
    { type: "code", code: `// Composition API groups logic by feature
<script setup>
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
function increment() { count.value++ }
</script>` },
    { type: "heading", text: "Creating Composables" },
    { type: "code", code: `// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  function increment() { count.value++ }
  function reset() { count.value = initial }
  return { count, increment, reset }
}

// Usage in any component
import { useCounter } from '@/composables/useCounter'
const { count, increment } = useCounter(10)` },
    { type: "tip", text: "Composables always start with 'use' (useCounter, useFetch) — an important Vue convention." },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between a Composable and a Component?", answer: "A Component is a visible UI piece (Template + Logic). A Composable is logic only without a Template — it can be used in any component." },
  ],
};
