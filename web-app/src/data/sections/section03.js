export default {
  id: 3,
  title: "أساسيات Vue",
  titleEn: "Vue Fundamentals",
  level: "مبتدئ",
  levelEn: "Beginner",
  lessons: [
    "ما هو Vue؟",
    "مثيل التطبيق createApp",
    "Single File Components",
    "قسم الـ Template",
    "قسم الـ Script",
    "قسم الـ Style",
    "Composition API كأسلوب افتراضي",
    "Options API مقابل Composition API",
    "مقدمة لـ <script setup>",
    "Compiler Macros",
  ],
  lessonsEn: [
    "What is Vue?",
    "Vue App Instance (createApp)",
    "Single File Components",
    "Template Section",
    "Script Section",
    "Style Section",
    "Composition API as Default",
    "Options API vs Composition API",
    "Introduction to <script setup>",
    "Compiler Macros Overview",
  ],
  intro: "في هذا القسم نتعرف على المفاهيم الأساسية في Vue 3 — من createApp إلى SFC إلى الفرق بين Composition API وOptions API، ولماذا <script setup> هو الأسلوب المُوصى به.",
  introEn: "This section covers Vue 3 core concepts — from createApp to SFCs to the difference between Composition API and Options API, and why <script setup> is the recommended style.",
  content: [
    { type: "heading", text: "ما هو Vue؟" },
    { type: "paragraph", text: "Vue (تُنطق /vjuː/ مثل 'view') هو Framework تقدمي (Progressive) لبناء واجهات المستخدم. 'تقدمي' تعني أنك تستطيع اعتماده جزئياً في صفحة HTML عادية أو بناء SPA كامل — أنت من يختار." },
    { type: "list", items: [
      "Declarative Rendering — تصف ما تريد عرضه، Vue يتكفل بتحديث DOM",
      "Component System — الواجهة مقسّمة إلى قطع صغيرة قابلة لإعادة الاستخدام",
      "Reactivity — البيانات تتغير، الواجهة تتحدث تلقائياً بدون تدخل منك",
    ]},
    { type: "heading", text: "مثيل التطبيق — createApp" },
    { type: "code", code: `// src/main.js — نقطة دخول كل تطبيق Vue
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')  // ربطه بـ <div id="app"> في index.html` },
    { type: "paragraph", text: "كل تطبيق Vue يبدأ بإنشاء مثيل باستخدام createApp ثم ربطه بعنصر في DOM." },
    { type: "heading", text: "Single File Components (SFC)" },
    { type: "paragraph", text: "SFC هو ملف .vue يجمع الـ Template والـ Script والـ Style في مكان واحد — وهذا أقوى ما في Vue. كل component عبارة عن ملف .vue مستقل." },
    { type: "code", code: `<!-- Counter.vue — مثال SFC كامل -->
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

function increment() { count.value++ }
function decrement() { count.value-- }
function reset() { count.value = 0 }
</script>

<template>
  <div class="counter">
    <h2>العداد: {{ count }}</h2>
    <p>{{ isEven ? 'زوجي ✓' : 'فردي' }}</p>
    <button @click="decrement" :disabled="count === 0">−</button>
    <button @click="reset">إعادة</button>
    <button @click="increment">+</button>
  </div>
</template>

<style scoped>
.counter { text-align: center; padding: 2rem; }
button { padding: 0.5rem 1.5rem; margin: 0.25rem; cursor: pointer; }
button:disabled { opacity: 0.4; }
</style>` },
    { type: "heading", text: "Composition API مقابل Options API" },
    { type: "paragraph", text: "Vue 3 يدعم أسلوبين لكتابة الـ components — الكورس يستخدم Composition API بالكامل:" },
    { type: "code", code: `// Options API — منظّم حسب النوع
export default {
  data() { return { count: 0 } },
  computed: {
    doubled() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  },
  mounted() {
    console.log('جاهز!')
  }
}

// Composition API مع <script setup> — منظّم حسب الوظيفة
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
function increment() { count.value++ }
onMounted(() => console.log('جاهز!'))` },
    { type: "tip", text: "هذا الكورس يستخدم Composition API مع <script setup> بشكل كامل — وهو الأسلوب الموصى به رسمياً في Vue 3. يجعل إعادة استخدام المنطق (Composables) أسهل بكثير." },
    { type: "heading", text: "لماذا Composition API أفضل للمشاريع الكبيرة؟" },
    { type: "list", items: [
      "المنطق المتعلق بميزة واحدة يبقى في مكان واحد (لا تشتت بين data/methods/computed)",
      "سهولة استخراج المنطق المشترك إلى Composables قابلة لإعادة الاستخدام",
      "دعم TypeScript ممتاز مقارنة بـ Options API",
      "لا مشكلة this — تتعامل مع دوال وقيم عادية",
    ]},
    { type: "heading", text: "Compiler Macros في <script setup>" },
    { type: "paragraph", text: "الـ macros هي دوال تُعالج وقت البناء (compile time) ولا يلزم استيرادها — تعمل فقط داخل <script setup>:" },
    { type: "list", items: [
      "defineProps() — تعريف الـ props المستقبَلة من الـ parent",
      "defineEmits() — تعريف الأحداث التي يُصدرها الـ component",
      "defineModel() — ربط ثنائي الاتجاه مبسّط (Vue 3.4+)",
      "defineExpose() — كشف خصائص ودوال للـ parent عبر template ref",
    ]},
    { type: "code", code: `<script setup>
// defineProps — بدون استيراد
const props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: 0 },
})

// defineEmits — بدون استيراد
const emit = defineEmits(['increment', 'reset'])

// defineModel — (Vue 3.4+) بدون استيراد
const model = defineModel()
</script>` },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما معنى أن Vue 'Progressive Framework'؟", answer: "يعني أنك تستطيع اعتماده تدريجياً — إما كمكتبة صغيرة في صفحة HTML موجودة (CDN)، أو كإطار عمل كامل لبناء SPA مع Vite. لا يلزمك استخدامه بالكامل دفعة واحدة." },
    { type: "qa", question: "ما الفرق الرئيسي بين Composition API وOptions API؟", answer: "Options API تنظّم الكود حسب النوع (data, methods, computed) — يُصعّب تتبع ميزة واحدة في component كبير. Composition API تنظّمه حسب الوظيفة — كل ما يخص ميزة في مكان واحد، ويمكن استخراجه كـ Composable." },
    { type: "qa", question: "متى تحتاج .value ومتى لا تحتاجها؟", answer: "داخل <script setup> (JavaScript): تحتاج .value دائماً للقراءة والكتابة على ref. داخل <template> (HTML): Vue يُطبّق unwrapping تلقائياً — تكتب {{ count }} لا {{ count.value }}." },
  ],
  contentEn: [
    { type: "heading", text: "What is Vue?" },
    { type: "paragraph", text: "Vue (pronounced /vjuː/, like 'view') is a Progressive Framework for building UIs. 'Progressive' means you can adopt it partially in a plain HTML page or use it to build a full SPA — you decide how much Vue you use." },
    { type: "list", items: [
      "Declarative Rendering — describe what you want to display, Vue handles the DOM updates",
      "Component System — UI is split into small reusable self-contained pieces",
      "Reactivity — data changes, UI updates automatically without you doing anything",
    ]},
    { type: "heading", text: "Single File Component (SFC)" },
    { type: "code", code: `<!-- Counter.vue — complete SFC example -->
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => (count.value = 0)
</script>

<template>
  <div class="counter">
    <h2>Count: {{ count }}</h2>
    <p>{{ isEven ? 'Even ✓' : 'Odd' }}</p>
    <button @click="decrement" :disabled="count === 0">−</button>
    <button @click="reset">Reset</button>
    <button @click="increment">+</button>
  </div>
</template>

<style scoped>
.counter { text-align: center; padding: 2rem; }
button { padding: 0.5rem 1.5rem; margin: 0.25rem; }
button:disabled { opacity: 0.4; }
</style>` },
    { type: "heading", text: "Composition API vs Options API" },
    { type: "code", code: `// Options API — organized by type
export default {
  data() { return { count: 0 } },
  computed: { doubled() { return this.count * 2 } },
  methods: { increment() { this.count++ } },
  mounted() { console.log('Ready!') }
}

// Composition API with <script setup> — organized by feature
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
const increment = () => count.value++
onMounted(() => console.log('Ready!'))` },
    { type: "tip", text: "This course uses Composition API with <script setup> — the officially recommended style for Vue 3. It makes logic reuse (Composables) much easier." },
    { type: "heading", text: "Compiler Macros in <script setup>" },
    { type: "list", items: [
      "defineProps() — declare received props from parent",
      "defineEmits() — declare events the component can emit",
      "defineModel() — simplified two-way binding (Vue 3.4+)",
      "defineExpose() — expose properties/methods to parent via template ref",
    ]},
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What does 'Progressive Framework' mean for Vue?", answer: "It means you can adopt Vue incrementally — as a small CDN library in an existing HTML page, or as a full framework for a SPA with Vite. You don't need to go all-in at once." },
    { type: "qa", question: "What is the main difference between Composition API and Options API?", answer: "Options API organizes code by type (data, methods, computed) — hard to track one feature in a large component. Composition API organizes by feature — everything for a feature stays together and can be extracted as a Composable." },
    { type: "qa", question: "What are Compiler Macros and why aren't they imported?", answer: "defineProps, defineEmits, and defineModel are processed by the Vue compiler at build time. They're recognized inside <script setup> and transformed into appropriate runtime code — nothing to import at runtime." },
  ],
};
