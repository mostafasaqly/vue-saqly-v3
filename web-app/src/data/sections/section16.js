export default {
  id: 16,
  title: "واجهة المستخدم والتنسيق",
  titleEn: "UI & Styling",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: [
    "CSS العام في Vue",
    "Scoped CSS — عزل التنسيق",
    "CSS Modules",
    "v-bind() في CSS — قيم ديناميكية",
    "Dynamic Classes وStyles",
    "Transitions — الانتقالات",
    "TransitionGroup — قوائم متحركة",
    "Tailwind CSS مع Vue",
    "PrimeVue / Vuetify — مكتبات Components",
    "مقارنة أساليب التنسيق",
  ],
  lessonsEn: [
    "Global CSS in Vue",
    "Scoped CSS — Style Isolation",
    "CSS Modules",
    "v-bind() in CSS — Dynamic Values",
    "Dynamic Classes & Styles",
    "Transitions",
    "TransitionGroup — Animated Lists",
    "Tailwind CSS with Vue",
    "PrimeVue / Vuetify — Component Libraries",
    "Styling Approaches Comparison",
  ],
  intro: "نتعلم كيف نُنسّق تطبيقات Vue — من Scoped CSS إلى v-bind في الـ style، إلى Tailwind والـ Transitions.",
  introEn: "Learn how to style Vue apps — from Scoped CSS to v-bind in styles, Tailwind, and animated transitions.",
  content: [
    { type: "heading", text: "Scoped CSS — CSS مُعزول" },
    { type: "paragraph", text: "scoped يُضيف attribute فريد للعناصر مثل [data-v-xxxxxxxx]، مما يجعل الـ CSS يؤثر فقط على عناصر هذا الـ component:" },
    { type: "code", code: `<!-- Card.vue -->
<template>
  <div class="card">
    <h2 class="card__title">العنوان</h2>
    <slot />
  </div>
</template>

<style scoped>
/* هذا الـ CSS يُطبَّق فقط على هذا الـ component */
.card {
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}
.card__title {
  color: #42b883;
  margin: 0 0 1rem;
}

/* :deep() للوصول لـ child components */
:deep(.child-class) {
  color: red;
}

/* :slotted() لتنسيق محتوى الـ slot */
:slotted(p) {
  line-height: 1.6;
}
</style>` },
    { type: "heading", text: "CSS Modules" },
    { type: "code", code: `<template>
  <div :class="$style.card">
    <h2 :class="[$style.title, $style.large]">العنوان</h2>
  </div>
</template>

<style module>
.card { padding: 1.5rem; border-radius: 12px; }
.title { color: #42b883; }
.large { font-size: 1.5rem; }
</style>` },
    { type: "heading", text: "v-bind() في CSS — قيم ديناميكية" },
    { type: "code", code: `<script setup>
import { ref, computed } from 'vue'

const primaryColor = ref('#42b883')
const fontSize = ref(16)
const spacing = ref('1rem')
const theme = ref('dark')

const bgColor = computed(() =>
  theme.value === 'dark' ? '#1a1a2e' : '#ffffff'
)
</script>

<template>
  <div class="themed-card">
    <h2 class="themed-title">مرحباً</h2>
  </div>
</template>

<style scoped>
.themed-card {
  background: v-bind(bgColor);
  padding: v-bind(spacing);
  transition: background 0.3s;
}
.themed-title {
  color: v-bind(primaryColor);
  font-size: v-bind(fontSize + 'px');
}
</style>` },
    { type: "tip", text: "v-bind() في CSS يستخدم CSS custom properties (variables) تحت الغطاء — أداء ممتاز ولا overhead." },
    { type: "heading", text: "Transitions — انتقالات ناعمة" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <button @click="show = !show">تبديل</button>

  <!-- Transition: تطبّق على عنصر واحد مع v-if/v-show -->
  <Transition name="fade">
    <div v-if="show" class="box">المحتوى</div>
  </Transition>

  <!-- Transition للانتقال بين عناصر -->
  <Transition name="slide" mode="out-in">
    <p v-if="show" key="yes">نعم</p>
    <p v-else key="no">لا</p>
  </Transition>
</template>

<style>
/* .fade-enter-active, .fade-leave-active — حالة الانتقال */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

/* .fade-enter-from, .fade-leave-to — الحالة الابتدائية/النهائية */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from { transform: translateX(-20px); opacity: 0; }
.slide-leave-to { transform: translateX(20px); opacity: 0; }
</style>` },
    { type: "heading", text: "TransitionGroup — قوائم متحركة" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const items = ref(['Vue', 'React', 'Angular'])

function addItem() { items.value.push('Svelte') }
function removeItem(i) { items.value.splice(i, 1) }
</script>

<template>
  <button @click="addItem">إضافة</button>

  <!-- TransitionGroup تطبّق على كل عنصر في القائمة -->
  <TransitionGroup name="list" tag="ul">
    <li v-for="(item, i) in items" :key="item">
      {{ item }}
      <button @click="removeItem(i)">✕</button>
    </li>
  </TransitionGroup>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* حركة ناعمة للعناصر الموجودة */
.list-move {
  transition: transform 0.3s ease;
}
</style>` },
    { type: "heading", text: "Tailwind CSS مع Vue" },
    { type: "code", code: `# تثبيت Tailwind
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p` },
    { type: "code", code: `// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',  // للـ dark mode
  theme: {
    extend: {
      colors: {
        primary: '#42b883',  // لون Vue
      }
    }
  },
}

// src/assets/main.css
@tailwind base;
@tailwind components;
@tailwind utilities;` },
    { type: "code", code: `<!-- استخدام Tailwind في Vue component -->
<template>
  <div class="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md">
    <img class="w-12 h-12 rounded-full object-cover" :src="user.avatar" :alt="user.name" />
    <div>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ user.name }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.role }}</p>
    </div>
    <span
      :class="[
        'ml-auto px-2 py-1 rounded-full text-xs font-medium',
        user.isAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
      ]"
    >
      {{ user.isAdmin ? 'Admin' : 'User' }}
    </span>
  </div>
</template>` },
    { type: "heading", text: "مقارنة أساليب التنسيق" },
    { type: "list", items: [
      "Scoped CSS: الأبسط — CSS عادي معزول في الـ component. للمشاريع الصغيرة والمتوسطة",
      "CSS Modules: أدق في العزل — class names مُولَّدة فريدة. للمشاريع الكبيرة مع فرق متعددة",
      "v-bind() في CSS: للـ theming الديناميكي — ربط قيم JS بـ CSS variables",
      "Tailwind CSS: utility-first — سرعة تطوير عالية، bundle صغير. الأشهر في مشاريع Vue الحديثة",
      "مكتبات Components (PrimeVue, Vuetify): components جاهزة — لتطبيقات كبيرة تحتاج design system",
    ]},
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين Scoped CSS وCSS Modules في Vue؟", answer: "كلاهما يعزل الـ CSS. scoped يستخدم attribute selectors مثل [data-v-xxx] وهو أبسط. CSS Modules يُنشئ class names فريدة مُولَّدة ويتيح استخدامها كـ object ($style.className) — أدق وأكثر مرونة." },
    { type: "qa", question: "ما هي v-bind() في CSS ومتى تستخدمها؟", answer: "v-bind() في CSS تتيح استخدام قيم JavaScript reactive مباشرة في CSS. Vue تُحوّلها لـ CSS custom property يُحدَّث تلقائياً. مفيدة للـ theming الديناميكي — تغيير ألوان الثيم، أحجام الخطوط، حسب إعدادات المستخدم." },
    { type: "qa", question: "ما الفرق بين Transition وTransitionGroup؟", answer: "Transition تُطبَّق على عنصر واحد مع v-if أو v-show — لإخفاء وإظهار عنصر بتأثير. TransitionGroup تُطبَّق على قائمة v-for — لكل عنصر يُضاف أو يُحذف أو يُعاد ترتيبه في القائمة." },
    { type: "qa", question: "ما هو :deep() في Scoped CSS ومتى تحتاجه؟", answer: ":deep() يتيح الوصول لعناصر داخل child components من scoped styles. تحتاجه عند استخدام مكتبة components خارجية (PrimeVue, Vuetify) وتريد تخصيص أنماطها من الـ parent component." },
  ],
  contentEn: [
    { type: "heading", text: "Scoped CSS" },
    { type: "code", code: `<style scoped>
.card { padding: 1.5rem; border-radius: 12px; }
/* :deep() to reach child component elements */
:deep(.child-class) { color: red; }
/* :slotted() to style slot content */
:slotted(p) { line-height: 1.6; }
</style>` },
    { type: "tip", text: "scoped adds a unique data-v-xxx attribute to elements, making CSS apply only to this component's elements." },
    { type: "heading", text: "v-bind() in CSS — Reactive Values" },
    { type: "code", code: `<script setup>
import { ref } from 'vue'
const primaryColor = ref('#42b883')
const fontSize = ref(16)
</script>

<style scoped>
.title {
  color: v-bind(primaryColor);
  font-size: v-bind(fontSize + 'px');
}
</style>` },
    { type: "heading", text: "Transitions" },
    { type: "code", code: `<Transition name="fade">
  <div v-if="show">Content</div>
</Transition>

<style>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>` },
    { type: "heading", text: "TransitionGroup — Animated Lists" },
    { type: "code", code: `<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">{{ item }}</li>
</TransitionGroup>

<style>
.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(30px); }
.list-move { transition: transform 0.3s ease; }
</style>` },
    { type: "heading", text: "Tailwind CSS with Vue" },
    { type: "code", code: `<template>
  <div class="flex items-center gap-4 p-4 rounded-xl shadow-md bg-white dark:bg-gray-800">
    <img class="w-12 h-12 rounded-full" :src="user.avatar" />
    <div>
      <h2 class="font-semibold text-gray-900 dark:text-white">{{ user.name }}</h2>
      <p class="text-sm text-gray-500">{{ user.role }}</p>
    </div>
  </div>
</template>` },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between Scoped CSS and CSS Modules in Vue?", answer: "Both isolate CSS. Scoped uses attribute selectors (data-v-xxx) and is simpler. CSS Modules generates unique class names and lets you use them as an object ($style.className) — more precise isolation and better for large teams." },
    { type: "qa", question: "What is v-bind() in CSS and when do you use it?", answer: "v-bind() in CSS lets you use reactive JavaScript values directly in CSS rules. Vue converts them to CSS custom properties that update automatically. Use it for dynamic theming — changing colors, font sizes, spacing based on user settings." },
    { type: "qa", question: "What is the difference between Transition and TransitionGroup?", answer: "Transition applies to a single element with v-if or v-show — for showing/hiding an element with an animation. TransitionGroup applies to a v-for list — each element added, removed, or reordered gets the transition animation." },
  ],
};
