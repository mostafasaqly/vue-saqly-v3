export default {
  id: 1,
  title: "مقدمة الكورس",
  titleEn: "Course Introduction",
  level: "مبتدئ",
  levelEn: "Beginner",
  lessons: [
    "مرحباً، أنا مصطفى سقلى",
    "ما الذي ستبنيه في هذا الكورس",
    "المتطلبات المسبقة",
    "خريطة الكورس",
    "نظرة عامة على Vue",
    "الجديد في Vue 3.3 – 3.5",
    "Vue مقابل React مقابل Angular",
    "متى تستخدم Vue",
  ],
  lessonsEn: [
    "Welcome — Meet Mostafa Saqly",
    "What You Will Build in This Course",
    "Course Prerequisites",
    "Course Roadmap",
    "Vue Overview",
    "What's New in Vue 3.3 – 3.5",
    "Vue vs React vs Angular",
    "When to Use Vue",
  ],
  intro: "أهلاً بك في كورس Vue 3 الشامل! هذا القسم يجهّزك للانطلاق — سنتعرف على ما هو Vue، ماذا ستبني، ما تحتاج معرفته قبل البدء، والجديد في Vue 3.5.",
  introEn: "Welcome to the complete Vue 3 course! This section sets the stage — we cover what Vue is, what you'll build, what you need to know before starting, and what's new in Vue 3.5.",
  content: [
    { type: "heading", text: "👋 مرحباً، أنا مصطفى سقلى" },
    { type: "paragraph", text: "حاولت من خلال هذا الكورس أن أساعدك تتعلم Vue 3 بالعربية بكل سهولة، مع أفضل الممارسات الحديثة في مكان واحد. هذا الكورس يغطي Vue 3.5 كاملاً من الصفر حتى بناء مشاريع حقيقية." },
    { type: "cta", text: "لو محتاج تدريب على مسارات متكاملة،", linkLabel: "ادخل من هنا →", link: "https://saqly.com/individual-training" },
    { type: "heading", text: "🎯 ما الذي ستبنيه في هذا الكورس" },
    { type: "paragraph", text: "في نهاية الكورس ستبني ثلاثة مشاريع كاملة جاهزة للـ Portfolio:" },
    { type: "list", items: [
      "🗂️ تطبيق إدارة مهام — Composables + Pinia + localStorage",
      "📊 لوحة منتجات — Axios + Vue Router + بحث وفلترة + CRUD",
      "🛒 متجر إلكتروني مصغّر — سلة تسوق بـ Pinia + Checkout + Persistence",
    ]},
    { type: "heading", text: "📋 المتطلبات المسبقة" },
    { type: "paragraph", text: "لا تحتاج خبرة سابقة في Vue، لكنك تحتاج إتقان هذه الأساسيات:" },
    { type: "list", items: [
      "HTML & CSS — هيكل الصفحات والتنسيق الأساسي",
      "JavaScript ES6+ — const/let، arrow functions، .map()، async/await، Modules، destructuring",
      "أي تجربة مع أي Framework ستساعد لكنها ليست مطلوبة",
    ]},
    { type: "heading", text: "🗺️ خريطة الكورس" },
    { type: "list", items: [
      "المرحلة 1 (1-2): المقدمة وإعداد بيئة التطوير",
      "المرحلة 2 (3-6): أساسيات Vue والـ Reactivity والـ Template",
      "المرحلة 3 (7-11): Components والـ Slots والـ Forms والـ Lifecycle",
      "المرحلة 4 (12-14): Routing وHTTP وPinia",
      "المرحلة 5 (15-17): TypeScript والتنسيق والأداء",
      "المرحلة 6 (18-23): المشاريع والاختبار والنشر",
    ]},
    { type: "heading", text: "⚡ نظرة عامة على Vue" },
    { type: "paragraph", text: "Vue هو Framework تدريجي (Progressive) لبناء واجهات المستخدم. 'تدريجي' يعني أنك تستطيع اعتماده جزئياً في صفحة HTML عادية أو بناء تطبيق SPA كامل. Vue يعتمد على نظام Reactivity يستخدم JavaScript Proxy تحت الغطاء." },
    { type: "code", code: `// تطبيق Vue أبسط ما يكون
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')` },
    { type: "code", code: `<!-- مكوّن Vue أساسي -->
<script setup>
import { ref } from 'vue'
const message = ref('مرحباً بك في Vue 3!')
</script>

<template>
  <h1>{{ message }}</h1>
</template>

<style scoped>
h1 { color: #42b883; }
</style>` },
    { type: "heading", text: "🆕 الجديد في Vue 3.3 – 3.5" },
    { type: "list", items: [
      "Vue 3.3: defineModel() مستقر، تحسينات TypeScript، Generic components",
      "Vue 3.4: same-name v-bind shorthand (:id بدل :id=\"id\")، تحسينات الأداء",
      "Vue 3.5: useTemplateRef()، Reactive Props Destructure مستقر، useId()، onWatcherCleanup()",
    ]},
    { type: "heading", text: "🆚 Vue مقابل React مقابل Angular" },
    { type: "list", items: [
      "Vue: منحنى تعلم أسهل، قوالب HTML طبيعية، Composition API رائع، مثالي للمشاريع المتوسطة",
      "React: مكتبة UI فقط، مرونة أعلى، JSX، مجتمع ضخم، يحتاج حلول إضافية",
      "Angular: Framework كامل، TypeScript أولاً، مناسب للشركات الكبيرة، منحنى تعلم أشد",
    ]},
    { type: "tip", text: "Vue يستخدم Composition API مع <script setup> كأسلوب افتراضي في هذا الكورس — وهو الأسلوب الموصى به رسمياً في Vue 3." },
    { type: "heading", text: "✅ مراجعة القسم" },
    { type: "qa", question: "ما هو الفرق الرئيسي بين Vue وReact وAngular؟", answer: "Vue إطار تقدمي بمنحنى تعلم سهل ونظام Reactivity ممتاز. React مكتبة UI مرنة تحتاج حلولاً خارجية للـ routing والـ state. Angular إطار كامل مع TypeScript مناسب للمشاريع الكبيرة لكن منحنى تعلمه أصعب." },
    { type: "qa", question: "ما الجديد الرئيسي في Vue 3.5؟", answer: "useTemplateRef() الطريقة الحديثة للوصول لـ template refs، Reactive Props Destructure أصبح مستقراً، useId() لتوليد IDs فريدة آمنة للـ SSR، وonWatcherCleanup() لتنظيف جانبي داخل الـ watchers." },
    { type: "qa", question: "هل أستطيع استخدام Vue بدون أدوات بناء (build tools)؟", answer: "نعم! يمكنك تحميل Vue من CDN واستخدامه مباشرة في HTML بدون أي أدوات. لكن للمشاريع الحقيقية يُنصح باستخدام Vite مع create-vue للحصول على SFCs وTypeScript وHMR وبناء إنتاجي محسّن." },
  ],
  contentEn: [
    { type: "heading", text: "👋 Welcome — Meet Mostafa Saqly" },
    { type: "paragraph", text: "This course is designed to help you learn Vue 3 with modern best practices all in one place, covering everything from the basics to building three real production-ready projects." },
    { type: "cta", text: "Need a structured learning path?", linkLabel: "Check it out →", link: "https://saqly.com/individual-training" },
    { type: "heading", text: "🎯 What You Will Build" },
    { type: "list", items: [
      "🗂️ Task Manager App — Composables + Pinia + localStorage",
      "📊 Products Dashboard — Axios + Vue Router + search & filter + CRUD",
      "🛒 Mini E-Commerce App — Shopping cart with Pinia + Checkout + Persistence",
    ]},
    { type: "heading", text: "📋 Prerequisites" },
    { type: "list", items: [
      "HTML & CSS basics — page structure and styling",
      "JavaScript ES6+ — const/let, arrow functions, .map(), async/await, Modules, destructuring",
      "Any prior framework experience helps but is not required",
    ]},
    { type: "heading", text: "🗺️ Course Roadmap" },
    { type: "list", items: [
      "Phase 1 (1-2): Introduction & Dev Environment",
      "Phase 2 (3-6): Vue Fundamentals, Reactivity, Templates",
      "Phase 3 (7-11): Components, Slots, Forms, Lifecycle",
      "Phase 4 (12-14): Routing, HTTP, Pinia",
      "Phase 5 (15-17): TypeScript, Styling, Performance",
      "Phase 6 (18-23): Projects, Testing, Deployment",
    ]},
    { type: "heading", text: "⚡ Vue 3.5 Highlights" },
    { type: "list", items: [
      "useTemplateRef() — modern typed way to access template elements",
      "Reactive Props Destructure — destructure props while keeping reactivity (now stable)",
      "onWatcherCleanup() — side-effect cleanup inside watchers",
      "useId() — stable, SSR-safe unique IDs per component instance",
    ]},
    { type: "tip", text: "This course uses Composition API with <script setup> throughout — the officially recommended style for Vue 3." },
    { type: "heading", text: "✅ Section Review" },
    { type: "qa", question: "What is the main difference between Vue, React, and Angular?", answer: "Vue is a progressive framework with a gentle learning curve and great Reactivity system. React is a flexible UI library needing extra solutions for routing/state. Angular is a complete framework with TypeScript suited for large enterprise apps but has a steeper learning curve." },
    { type: "qa", question: "What are the key additions in Vue 3.5?", answer: "useTemplateRef() for modern typed template refs, Reactive Props Destructure now stable, useId() for SSR-safe unique IDs, and onWatcherCleanup() for side-effect cleanup inside watchers." },
    { type: "qa", question: "Can I use Vue without build tools?", answer: "Yes! You can load Vue from a CDN and use it directly in HTML. But for real projects, use Vite + create-vue to get SFCs, TypeScript, HMR, and an optimized production build." },
  ],
};
