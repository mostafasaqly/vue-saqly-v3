export default {
  id: 17,
  title: "الأداء وأفضل الممارسات",
  titleEn: "Performance & Best Practices",
  level: "متقدم",
  levelEn: "Advanced",
  lessons: [
    "كيف يرسم Vue؟ Virtual DOM",
    "computed مقابل Methods — الفرق في الأداء",
    "v-memo — تذكّر قطاع من الـ Template",
    "shallowRef وshallowReactive",
    "Lazy Loading Routes",
    "defineAsyncComponent",
    "Suspense",
    "تحسين حجم الـ Bundle",
    "Vapor Mode (تجريبي)",
    "قائمة أفضل الممارسات",
  ],
  lessonsEn: [
    "How Vue Renders — Virtual DOM",
    "computed vs Methods — Performance Difference",
    "v-memo — Memoize Template Sections",
    "shallowRef & shallowReactive",
    "Lazy Loading Routes",
    "defineAsyncComponent",
    "Suspense",
    "Bundle Size Optimization",
    "Vapor Mode (Experimental)",
    "Best Practices Checklist",
  ],
  intro: "نتعلم كيف نجعل تطبيقات Vue سريعة — من استخدام computed بذكاء إلى Lazy Loading وAsync Components وتحسين الـ Bundle.",
  introEn: "Learn how to make Vue apps fast — from smart computed use to lazy loading, async components, and bundle optimization.",
  content: [
    { type: "heading", text: "كيف يرسم Vue؟ Virtual DOM" },
    { type: "paragraph", text: "Vue لا يُحدّث الـ DOM الحقيقي مباشرة — يبني Virtual DOM (VDOM) أولاً، يُقارن بالقديم (diffing)، ثم يُطبّق فقط التغييرات الضرورية. هذا يُقلّل عمليات DOM الباهظة." },
    { type: "heading", text: "computed مقابل Methods — الفرق في الأداء" },
    { type: "code", code: `<script setup>
import { ref, computed } from 'vue'

const items = ref(Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: 'Item ' + i,
  active: i % 2 === 0,
})))

// ❌ method — تُنفَّذ في كل render cycle
function filteredMethod() {
  console.log('method called!')
  return items.value.filter(i => i.active)
}

// ✅ computed — تُحسَّب مرة وتُخزَّن حتى تتغير items.value
const filteredComputed = computed(() => {
  console.log('computed called!') // يُطبع مرة فقط حتى يتغير items
  return items.value.filter(i => i.active)
})
</script>

<template>
  <!-- كل مرة يُرسم الـ template، method تُنفَّذ -->
  <p>بـ method: {{ filteredMethod().length }}</p>

  <!-- computed يُخزَّن — لا يُعيد الحساب إلا إذا تغيّرت items -->
  <p>بـ computed: {{ filteredComputed.length }}</p>
</template>` },
    { type: "heading", text: "v-memo — تذكّر قطاع من الـ Template" },
    { type: "code", code: `<!-- v-memo يُعيد الرسم فقط إذا تغيرت القيم المحددة -->
<ul>
  <li
    v-for="item in bigList"
    :key="item.id"
    v-memo="[item.id, item.selected, item.title]"
  >
    <!-- رسم مُعقّد — لن يُعاد إلا إذا تغيّر أحد القيم الثلاثة -->
    <ExpensiveUserCard :item="item" />
    <Chart :data="item.chartData" />
  </li>
</ul>` },
    { type: "tip", text: "v-memo مفيدة مع قوائم ضخمة (500+ عنصر) حيث تحتاج تجنب إعادة رسم عناصر لم تتغير. للقوائم الصغيرة، Vue محسّن بما يكفي." },
    { type: "heading", text: "shallowRef وshallowReactive" },
    { type: "code", code: `import { shallowRef, shallowReactive } from 'vue'

// shallowRef: reactivity على المستوى الأول فقط
const bigData = shallowRef({ items: [...largeArray], meta: {} })
// تغيير bigData.value نفسه يُحرّك الـ UI
// تغيير bigData.value.items[0] لا يُحرّكه — للعمد أحياناً

// shallowReactive: reactivity على المستوى الأول من الكائن
const state = shallowReactive({
  count: 0,           // reactive
  nested: { x: 1 }   // nested.x ليس reactive
})` },
    { type: "heading", text: "defineAsyncComponent — تحميل ديناميكي" },
    { type: "code", code: `import { defineAsyncComponent } from 'vue'

// بسيط
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'))

// مع خيارات كاملة
const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: LoadingSpinner,    // يُعرض أثناء التحميل
  errorComponent: ErrorDisplay,        // يُعرض عند الخطأ
  delay: 200,                          // تأخير قبل عرض loading (ms)
  timeout: 5000,                       // timeout → خطأ بعد 5 ثواني
})` },
    { type: "code", code: `<!-- الاستخدام مع Suspense -->
<template>
  <Suspense>
    <template #default>
      <HeavyChart :data="chartData" />
    </template>
    <template #fallback>
      <div class="skeleton-chart">⏳ جارٍ تحميل الرسم البياني...</div>
    </template>
  </Suspense>
</template>` },
    { type: "heading", text: "تحسين حجم الـ Bundle" },
    { type: "list", items: [
      "Lazy Loading للـ routes — كل صفحة chunk منفصل يُحمَّل عند الحاجة",
      "defineAsyncComponent للـ components الثقيلة (charts, editors, maps)",
      "استورد فقط ما تحتاج: import { ref } from 'vue' لا import * from 'vue'",
      "قل بديل لـ lodash: استخدم native methods أو lodash-es مع tree-shaking",
      "rollup-plugin-visualizer — لتحليل حجم الـ bundle وإيجاد الـ culprits",
    ]},
    { type: "code", code: `// vite.config.js — تحسين الـ bundle
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({ open: true }), // يفتح تقرير HTML بعد البناء
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // فصل libraries كبيرة عن الكود الرئيسي
          vendor: ['vue', 'vue-router', 'pinia'],
          charts: ['chart.js'],
        }
      }
    }
  }
})` },
    { type: "heading", text: "Vapor Mode — مستقبل Vue (تجريبي)" },
    { type: "paragraph", text: "Vapor Mode (Vue 3.6+) هو compiler جديد يُولّد كوداً يتخطى Virtual DOM كلياً — يُعالج التحديثات مباشرة على الـ DOM الحقيقي. يُنتج bundle أصغر وأداء أسرع بكثير. لا تزال في مرحلة تجريبية." },
    { type: "heading", text: "✅ قائمة أفضل الممارسات" },
    { type: "list", items: [
      "استخدم <script setup> دائماً بدلاً من Options API",
      "اختر ref على reactive للاتساق في الكود",
      "اتبع اتفاقية useXxx للـ composables",
      "عزّل منطق API في service layer (api/posts.js)",
      "أضف :key صحيحة وفريدة في كل v-for",
      "استخدم computed بدلاً من method للاشتقاقات",
      "نظّف event listeners وsetInterval في onUnmounted",
      "Lazy load جميع الـ routes والـ components الثقيلة",
      "لا تُفكّك Pinia store مباشرة — استخدم storeToRefs",
      "اختبر composables مستقلة — أسهل من اختبار الـ component كله",
    ]},
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "لماذا computed أفضل من method للقيم المشتقة؟", answer: "computed تُخزّن النتيجة مؤقتاً (cache) وتُعيد الحساب فقط عند تغيّر المدخلات الـ reactive. method تُنفَّذ في كل render حتى لو لم تتغير البيانات — أبطأ مع العمليات الثقيلة أو القوائم الكبيرة." },
    { type: "qa", question: "متى تستخدم defineAsyncComponent؟", answer: "عند وجود component ثقيل (رسوم بيانية بـ chart.js، محررات نصوص كـ TinyMCE، خرائط بـ Leaflet) لا يحتاجه المستخدم دائماً. تحميله بشكل ديناميكي يُحسّن وقت التحميل الأول (Time to Interactive)." },
    { type: "qa", question: "ما هو Suspense ومتى تستخدمه؟", answer: "Suspense component يُتيح عرض محتوى بديل (fallback) أثناء انتظار تحميل async component أو setup() يحتوي await. تستخدمه مع defineAsyncComponent أو async setup لعرض loading skeleton بدلاً من مؤشر تحميل بسيط." },
    { type: "qa", question: "ما هو v-memo ومتى يكون مفيداً؟", answer: "v-memo يُخبر Vue بعدم إعادة رسم العنصر إلا إذا تغيرت القيم المحددة. مفيد مع قوائم ضخمة جداً (500+ عنصر) حيث كل تحديث يُعيد رسم كل القائمة. للقوائم الصغيرة، Vue محسّن بما يكفي بدون v-memo." },
  ],
  contentEn: [
    { type: "heading", text: "computed vs Methods — Performance" },
    { type: "code", code: `const items = ref([...largeArray])

// ❌ method — runs on every render
function filteredMethod() {
  return items.value.filter(i => i.active)
}

// ✅ computed — cached, recomputes only when items changes
const filteredComputed = computed(() =>
  items.value.filter(i => i.active)
)` },
    { type: "heading", text: "v-memo — Memoize Template Sections" },
    { type: "code", code: `<li
  v-for="item in bigList"
  :key="item.id"
  v-memo="[item.id, item.selected]"
>
  <!-- Only re-renders when item.id or item.selected changes -->
  <ExpensiveComponent :item="item" />
</li>` },
    { type: "heading", text: "Async Components & Suspense" },
    { type: "code", code: `import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: Spinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 5000,
})

// In template:
<Suspense>
  <HeavyChart :data="chartData" />
  <template #fallback>Loading chart...</template>
</Suspense>` },
    { type: "heading", text: "Best Practices Checklist" },
    { type: "list", items: [
      "Always use <script setup>",
      "Prefer ref over reactive for consistency",
      "Follow useXxx naming for composables",
      "Keep API calls in a service layer",
      "Always add proper unique :key in v-for",
      "Use computed over methods for derived values",
      "Clean up listeners and intervals in onUnmounted",
      "Lazy-load all routes and heavy components",
      "Use storeToRefs when destructuring Pinia stores",
      "Test composables independently — easier than testing components",
    ]},
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "Why is computed better than a method for derived values?", answer: "computed caches its result and only recomputes when its reactive dependencies change. A method re-runs on every render even if data hasn't changed — slower for expensive computations or large lists." },
    { type: "qa", question: "When should you use defineAsyncComponent?", answer: "For heavy components (charts with chart.js, rich text editors, maps with Leaflet) that aren't needed immediately. Lazy-loading them improves Time to Interactive for the initial page load." },
  ],
};
