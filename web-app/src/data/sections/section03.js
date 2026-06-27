export default {
  id: 3,
  title: "أساسيات Vue",
  titleEn: "Vue Fundamentals",
  level: "مبتدئ",
  levelEn: "Beginner",
  lessons: ["ما هو Vue؟", "مثيل التطبيق createApp", "Single File Components", "قسم الـ Template", "قسم الـ Script", "قسم الـ Style", "Composition API كأسلوب افتراضي", "Options API مقابل Composition API", "مقدمة لـ <script setup>", "Compiler Macros"],
  lessonsEn: ["What is Vue?", "Vue App Instance (createApp)", "Single File Components", "Template Section", "Script Section", "Style Section", "Composition API as Default", "Options API vs Composition API", "Introduction to <script setup>", "Compiler Macros Overview"],
  intro: "في هذا القسم نتعرف على المفاهيم الأساسية في Vue 3 — من createApp إلى SFC إلى الفرق بين Composition API وOptions API.",
  introEn: "This section covers Vue 3 core concepts — from createApp to SFCs to the difference between Composition API and Options API.",
  content: [
    { type: "heading", text: "ما هو Vue؟" },
    { type: "paragraph", text: "Vue (تُنطق /vjuː/ مثل 'view') هو Framework تقدمي (Progressive) لبناء واجهات المستخدم. 'تقدمي' تعني أنك تستطيع اعتماده جزئياً في صفحة HTML عادية أو بناء SPA كامل." },
    { type: "list", items: ["Declarative Rendering — تصف ما تريد، Vue يتكفل بالتحديث", "Component System — واجهة المستخدم مقسّمة إلى قطع صغيرة قابلة لإعادة الاستخدام", "Reactivity — البيانات تتغير، الواجهة تتحدث تلقائياً"] },
    { type: "heading", text: "مثيل التطبيق — createApp" },
    { type: "code", code: `import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')` },
    { type: "paragraph", text: "كل تطبيق Vue يبدأ بإنشاء مثيل باستخدام createApp ثم ربطه بعنصر في DOM." },
    { type: "heading", text: "Single File Components (SFC)" },
    { type: "paragraph", text: "SFC هو ملف .vue يجمع الـ Template والـ Script والـ Style في مكان واحد — وهذا أقوى ما في Vue." },
    { type: "code", code: `<!-- Counter.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">
    العدد: {{ count }}
  </button>
</template>

<style scoped>
button { padding: 8px 16px; }
</style>` },
    { type: "heading", text: "Composition API مقابل Options API" },
    { type: "paragraph", text: "Vue 3 يدعم أسلوبين لكتابة الـ components:" },
    { type: "code", code: `// Options API (Vue 2 style)
export default {
  data() { return { count: 0 } },
  methods: { increment() { this.count++ } }
}

// Composition API (Vue 3 recommended)
<script setup>
import { ref } from 'vue'
const count = ref(0)
function increment() { count.value++ }
</script>` },
    { type: "tip", text: "هذا الكورس يستخدم Composition API مع <script setup> بشكل كامل — وهو الأسلوب الموصى به رسمياً في Vue 3." },
    { type: "heading", text: "Compiler Macros في <script setup>" },
    { type: "paragraph", text: "الـ macros هي دوال تُعالج وقت البناء (compile time) ولا يلزم استيرادها:" },
    { type: "list", items: ["defineProps() — تعريف الـ props المستقبَلة", "defineEmits() — تعريف الأحداث المُصدَرة", "defineModel() — ربط ثنائي الاتجاه مبسّط (Vue 3.4+)", "defineExpose() — كشف خصائص للـ parent", "defineOptions() — ضبط خيارات الـ component"] },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما معنى أن Vue 'Progressive Framework'؟", answer: "يعني أنك تستطيع اعتماده تدريجياً — إما كمكتبة صغيرة في صفحة HTML موجودة، أو كإطار عمل كامل لبناء SPA. لا يلزمك استخدامه بالكامل دفعة واحدة." },
    { type: "qa", question: "ما الفرق الرئيسي بين Composition API وOptions API؟", answer: "Options API تنظّم الكود حسب النوع (data, methods, computed). Composition API تنظّمه حسب الوظيفة، مما يجعل إعادة استخدام المنطق (Composables) أسهل." },
  ],
  contentEn: [
    { type: "heading", text: "What is Vue?" },
    { type: "paragraph", text: "Vue (pronounced /vjuː/, like 'view') is a Progressive Framework for building UIs. 'Progressive' means you can adopt it partially in a plain HTML page or use it to build a full SPA." },
    { type: "list", items: ["Declarative Rendering — describe what you want, Vue handles the DOM updates", "Component System — UI is split into small reusable pieces", "Reactivity — data changes, UI updates automatically"] },
    { type: "heading", text: "Composition API vs Options API" },
    { type: "code", code: `// Options API (Vue 2 style)
export default {
  data() { return { count: 0 } },
  methods: { increment() { this.count++ } }
}

// Composition API (Vue 3 recommended)
<script setup>
import { ref } from 'vue'
const count = ref(0)
function increment() { count.value++ }
</script>` },
    { type: "tip", text: "This course uses Composition API with <script setup> — the officially recommended style for Vue 3." },
    { type: "heading", text: "Compiler Macros in <script setup>" },
    { type: "list", items: ["defineProps() — declare received props", "defineEmits() — declare emitted events", "defineModel() — simplified two-way binding (Vue 3.4+)", "defineExpose() — expose properties to parent", "defineOptions() — set component options"] },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What does 'Progressive Framework' mean for Vue?", answer: "It means you can adopt Vue incrementally — as a small library in an existing HTML page, or as a full framework for a SPA. You don't need to go all-in at once." },
  ],
};
