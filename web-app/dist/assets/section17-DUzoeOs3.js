const e={id:17,title:"الأداء وأفضل الممارسات",titleEn:"Performance & Best Practices",level:"متقدم",levelEn:"Advanced",lessons:["نظرة عامة على رسم Vue","أداء قوائم v-for","key في v-for","computed مقابل Methods","Lazy Loading Routes","Async Components وSuspense","v-memo","تجنب الـ Watchers غير الضرورية","تحسين حجم الـ Bundle","Vapor Mode (تجريبي)","أفضل ممارسات Vue"],lessonsEn:["Vue Rendering Overview","List Rendering Performance","key in v-for","computed vs Methods","Lazy Loading Routes","Async Components and Suspense","v-memo","Avoiding Unnecessary Watchers","Bundle Optimization","Vapor Mode (experimental)","Vue Best Practices"],intro:"نتعلم كيف نجعل تطبيقات Vue سريعة — من استخدام computed بذكاء إلى Vapor Mode التجريبي.",introEn:"Learn how to make Vue apps fast — from smart computed use to experimental Vapor Mode.",content:[{type:"heading",text:"computed مقابل Methods — الفرق في الأداء"},{type:"code",code:`<script setup>
import { ref, computed } from 'vue'
const items = ref([...large array...])

// ❌ method — تُنفَّذ في كل render
function filteredMethod() {
  return items.value.filter(i => i.active)
}

// ✅ computed — تُحسَّب مرة وتُخزَّن حتى تتغير items
const filteredComputed = computed(() =>
  items.value.filter(i => i.active)
)
<\/script>`},{type:"heading",text:"v-memo — تذكّر قطاع من الـ Template"},{type:"code",code:`<!-- يُعيد الرسم فقط إذا تغيرت القيم المحددة -->
<div v-for="item in list" :key="item.id" v-memo="[item.id, item.selected]">
  <p>{{ item.name }}</p>
  <span>{{ item.description }}</span>
</div>`},{type:"tip",text:"v-memo مفيدة مع قوائم ضخمة جداً حيث تحتاج تجنب إعادة رسم عناصر لم تتغير فعلياً."},{type:"heading",text:"Async Components وSuspense"},{type:"code",code:`// تحميل component بشكل ديناميكي
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent(() =>
  import('./HeavyChart.vue')
)

// مع Suspense في الـ template
<Suspense>
  <template #default>
    <HeavyChart />
  </template>
  <template #fallback>
    <div>جارٍ تحميل الرسم البياني...</div>
  </template>
</Suspense>`},{type:"heading",text:"تحسين حجم الـ Bundle"},{type:"list",items:["استخدم Lazy Loading للـ routes — كل صفحة chunk منفصل","استخدم defineAsyncComponent للـ components الثقيلة","تجنب استيراد مكتبات كاملة — استورد فقط ما تحتاجه","حلّل حجم الـ bundle بـ rollup-plugin-visualizer","فعّل الـ tree-shaking (Vite يفعله تلقائياً)"]},{type:"heading",text:"Vapor Mode — مستقبل Vue"},{type:"paragraph",text:"Vapor Mode هو استراتيجية ترجمة جديدة قيد التطوير في Vue 3.6 تتخطى Virtual DOM وتولّد كوداً أصغر وأسرع. لا تزال في مرحلة بيتا — لمعرفتها مسبقاً فقط."},{type:"heading",text:"أفضل ممارسات Vue"},{type:"list",items:["استخدم <script setup> دائماً","اختر ref على reactive للاتساق","اتبع اتفاقية useXxx للـ composables","عزّل منطق جلب البيانات في API service layer","أضف :key صحيحة في كل v-for","استخدم computed بدلاً من method للحسابات المعقدة","نظّف الـ event listeners وsetInterval في onUnmounted"]},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"لماذا computed أفضل من method للقيم المشتقة؟",answer:"computed تُخزّن النتيجة مؤقتاً (cache) وتُعيد الحساب فقط عند تغيّر المدخلات. method تُنفَّذ في كل render حتى لو لم تتغير البيانات — أبطأ مع العمليات الثقيلة."},{type:"qa",question:"متى تستخدم defineAsyncComponent؟",answer:"عند وجود component ثقيل (رسوم بيانية، محررات نصوص، خرائط) لا يحتاجه المستخدم دائماً. تحميله بشكل ديناميكي يُحسّن وقت التحميل الأول."}],contentEn:[{type:"heading",text:"computed vs Methods"},{type:"code",code:`// ❌ method — runs on every render
function filteredMethod() { return items.value.filter(i => i.active) }

// ✅ computed — cached, only recomputes when items changes
const filtered = computed(() => items.value.filter(i => i.active))`},{type:"heading",text:"Async Components & Suspense"},{type:"code",code:`import { defineAsyncComponent } from 'vue'
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'))

// In template
<Suspense>
  <HeavyChart />
  <template #fallback>Loading chart...</template>
</Suspense>`},{type:"heading",text:"Vue Best Practices"},{type:"list",items:["Always use <script setup>","Prefer ref over reactive for consistency","Follow useXxx naming for composables","Keep API calls in a service layer","Always add proper :key in v-for","Use computed over methods for derived values","Clean up listeners and intervals in onUnmounted"]},{type:"heading",text:"✅ Review"},{type:"qa",question:"Why is computed better than a method for derived values?",answer:"computed caches its result and only recomputes when its reactive dependencies change. A method runs on every render even if the data hasn't changed."}]};export{e as default};
