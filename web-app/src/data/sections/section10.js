export default {
  id: 10,
  title: "Composition API",
  titleEn: "Composition API",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: [
    "ما هو Composition API ولماذا وُجد؟",
    "setup() مقابل <script setup>",
    "الـ State التفاعلية",
    "computed وwatch في setup",
    "Composables — إعادة استخدام المنطق",
    "بناء useCounter",
    "بناء useFetch مع toValue()",
    "بناء useLocalStorage",
    "useId (Vue 3.5)",
    "Composables مقابل Mixins",
  ],
  lessonsEn: [
    "What is Composition API and Why?",
    "setup() vs <script setup>",
    "Reactive State",
    "computed & watch in setup",
    "Composables — Reusing Logic",
    "Building useCounter",
    "Building useFetch with toValue()",
    "Building useLocalStorage",
    "useId (Vue 3.5)",
    "Composables vs Mixins",
  ],
  intro: "نتعمق في Composition API — الأسلوب الحديث لتنظيم الكود في Vue 3، وكيف نبني Composables لإعادة الاستخدام عبر المشروع كله.",
  introEn: "Deep dive into Composition API — the modern way to organize Vue 3 code, and how to build Composables for reuse across the entire project.",
  content: [
    { type: "heading", text: "ما هو Composition API ولماذا وُجد؟" },
    { type: "paragraph", text: "Composition API وُجد لحل مشكلة Options API في المشاريع الكبيرة: عندما يكبر الـ component تتشتت المنطق المتعلق بميزة واحدة بين data وmethods وcomputed. Composition API يُجمّع المنطق حسب الميزة ويجعل استخراجه كـ Composable سهلاً." },
    { type: "code", code: `// Options API — المنطق مُشتَّت (البحث مع Sorting مثلاً)
export default {
  data() {
    return { query: '', results: [], sortBy: 'name' }
  },
  computed: {
    sortedResults() { /* ... */ }
  },
  methods: {
    async search() { /* ... */ },
    setSort(key) { /* ... */ }
  },
  watch: {
    query(newVal) { this.search() }
  }
}

// Composition API — كل ما يخص البحث في مكان واحد
// composables/useSearch.js
export function useSearch() {
  const query = ref('')
  const results = ref([])
  const sortBy = ref('name')
  const sortedResults = computed(() => /* ... */)
  async function search() { /* ... */ }
  watch(query, search)
  return { query, sortedResults, sortBy, setSort }
}` },
    { type: "heading", text: "setup() مقابل <script setup>" },
    { type: "code", code: `// دالة setup() الصريحة
export default {
  setup(props, { emit, slots, attrs }) {
    const count = ref(0)
    return { count } // يجب إرجاع ما تريد استخدامه في template
  }
}

// <script setup> — compiler sugar (مُستحسن دائماً)
// لا return، كل المتغيرات مكشوفة تلقائياً
// Compiler Macros (defineProps, defineEmits) متاحة
// أداء أفضل` },
    { type: "heading", text: "بناء useCounter — أبسط Composable" },
    { type: "code", code: `// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initial = 0, { min = -Infinity, max = Infinity } = {}) {
  const count = ref(initial)
  const doubled = computed(() => count.value * 2)
  const isAtMin = computed(() => count.value <= min)
  const isAtMax = computed(() => count.value >= max)

  function increment(step = 1) {
    count.value = Math.min(count.value + step, max)
  }
  function decrement(step = 1) {
    count.value = Math.max(count.value - step, min)
  }
  function reset() { count.value = initial }
  function set(val) { count.value = Math.min(Math.max(val, min), max) }

  return { count, doubled, isAtMin, isAtMax, increment, decrement, reset, set }
}` },
    { type: "code", code: `// استخدام useCounter في أي component
<script setup>
import { useCounter } from '@/composables/useCounter'

const { count, doubled, increment, decrement, reset, isAtMin } = useCounter(0, {
  min: 0,
  max: 10,
})
</script>

<template>
  <p>{{ count }} (ضعف: {{ doubled }})</p>
  <button @click="decrement" :disabled="isAtMin">−</button>
  <button @click="reset">إعادة</button>
  <button @click="increment">+</button>
</template>` },
    { type: "heading", text: "بناء useFetch مع toValue()" },
    { type: "code", code: `// composables/useFetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  watchEffect(async () => {
    // toValue() يحوّل ref أو getter أو قيمة عادية إلى قيمة
    const resolvedUrl = toValue(url)
    if (!resolvedUrl) return

    data.value = null
    loading.value = true
    error.value = null

    try {
      const res = await fetch(resolvedUrl)
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}` },
    { type: "code", code: `// يعمل مع URL ثابت، ref، أو computed
const { data, loading } = useFetch('https://api.example.com/posts')

// URL ديناميكي — يُعيد الجلب تلقائياً عند التغيير
const userId = ref(1)
const { data: user } = useFetch(() => '/api/users/' + userId.value)` },
    { type: "heading", text: "بناء useLocalStorage" },
    { type: "code", code: `// composables/useLocalStorage.js
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue = null) {
  const stored = localStorage.getItem(key)
  const data = ref(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (val) => {
    if (val === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(val))
    }
  }, { deep: true })

  return data
}

// استخدام
const theme = useLocalStorage('app_theme', 'light')
const user = useLocalStorage('auth_user', null)
theme.value = 'dark' // يُحفظ تلقائياً في localStorage` },
    { type: "heading", text: "useId (Vue 3.5)" },
    { type: "code", code: `<script setup>
import { useId } from 'vue'

// يولّد ID فريد مستقر لكل instance — مفيد لـ labels وaria-*
const id = useId()  // ':r0:', ':r1:' ...
</script>

<template>
  <label :for="id">الاسم</label>
  <input :id="id" v-model="name" :aria-describedby="id + '-hint'" />
  <p :id="id + '-hint'">أدخل اسمك الكامل</p>
</template>` },
    { type: "tip", text: "useId آمن مع SSR — يضمن نفس الـ ID على الـ server والـ client. لا تستخدم Math.random() أو Date.now() لتوليد IDs لأنها تختلف بين الـ server والـ client." },
    { type: "heading", text: "Composables مقابل Mixins" },
    { type: "list", items: [
      "Composables: مصدر البيانات واضح — تعرف من أين جاء كل متغير",
      "Mixins: تلوث الـ namespace — تعارض في الأسماء صعب تتبعه",
      "Composables: يمكن تمرير arguments — مرونة أعلى",
      "Mixins: لا تستطيع تمرير arguments",
      "Composables: TypeScript ممتاز",
      "Mixins: ضعف في TypeScript support",
      "الخلاصة: Composables تحل كل مشاكل Mixins — استخدم Composables دائماً في Vue 3",
    ]},
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين Composable وComponent؟", answer: "Component هو قطعة UI مرئية (Template + Logic + Style). Composable هو منطق فقط بدون Template — يمكن استخدامه في أي component بدون عرض أي HTML." },
    { type: "qa", question: "لماذا يُفضَّل <script setup> على دالة setup()؟", answer: "<script setup> أبسط في الكتابة (لا return statement)، أفضل أداءً (Compiler يُحوّله لكود محسّن)، ويدعم Compiler Macros مثل defineProps وdefineEmits وdefineModel مباشرة." },
    { type: "qa", question: "ما هو toValue() ولماذا هو مفيد في Composables؟", answer: "toValue() (Vue 3.3+) يقبل ref، reactive getter، أو قيمة عادية ويُحوّلها لقيمة فعلية. يجعل الـ Composable مرناً — يعمل مع useFetch('/url') ومع useFetch(urlRef) ومع useFetch(() => '/users/' + id.value)." },
    { type: "qa", question: "لماذا Composables تحل مشاكل Mixins؟", answer: "Mixins تخلط الـ data والـ methods في الـ component بدون وضوح المصدر — إذا وجدت name في template لا تعرف من أي mixin جاء. Composables: const { name } = useMixin() — المصدر واضح. أيضاً لا تعارض في الأسماء ودعم TypeScript أفضل." },
  ],
  contentEn: [
    { type: "heading", text: "Composition API vs Options API" },
    { type: "code", code: `// Composition API — logic organized by feature
<script setup>
import { ref, computed, onMounted } from 'vue'

// Everything related to search — together
const query = ref('')
const results = ref([])
async function search() { /* ... */ }
watch(query, search)

// Everything related to user — together
const user = ref(null)
onMounted(async () => { user.value = await fetchUser() })
</script>` },
    { type: "heading", text: "Building useCounter Composable" },
    { type: "code", code: `// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initial = 0, { min = -Infinity, max = Infinity } = {}) {
  const count = ref(initial)
  const doubled = computed(() => count.value * 2)

  function increment(step = 1) { count.value = Math.min(count.value + step, max) }
  function decrement(step = 1) { count.value = Math.max(count.value - step, min) }
  function reset() { count.value = initial }

  return { count, doubled, increment, decrement, reset }
}

// Usage
const { count, increment } = useCounter(0, { min: 0, max: 10 })` },
    { type: "heading", text: "Building useFetch with toValue()" },
    { type: "code", code: `// composables/useFetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  watchEffect(async () => {
    const resolvedUrl = toValue(url) // accepts ref, getter, or plain string
    if (!resolvedUrl) return

    loading.value = true
    try {
      const res = await fetch(resolvedUrl)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}

// Dynamic URL — auto re-fetches when userId changes
const userId = ref(1)
const { data: user } = useFetch(() => '/api/users/' + userId.value)` },
    { type: "tip", text: "Composables always start with 'use' (useCounter, useFetch, useLocalStorage) — a Vue convention that signals reusable stateful logic." },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between a Composable and a Component?", answer: "A Component is a visible UI piece (Template + Logic + Style). A Composable is logic only without a Template — it can be used in any component without rendering any HTML." },
    { type: "qa", question: "Why is <script setup> preferred over the setup() function?", answer: "<script setup> is simpler (no return statement needed), performs better (compiler produces optimized code), and enables Compiler Macros like defineProps, defineEmits, and defineModel." },
    { type: "qa", question: "What is toValue() and why is it useful in Composables?", answer: "toValue() accepts a ref, a reactive getter, or a plain value and returns the raw value. It makes composables flexible — useFetch works with useFetch('/url'), useFetch(urlRef), or useFetch(() => '/users/' + id.value)." },
  ],
};
