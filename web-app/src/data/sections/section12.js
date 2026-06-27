export default {
  id: 12,
  title: "Routing بـ Vue Router",
  titleEn: "Routing with Vue Router",
  level: "متوسط",
  levelEn: "Intermediate",
  lessons: ["نظرة عامة على Vue Router", "تثبيت Vue Router", "إنشاء Routes", "RouterView", "RouterLink", "useRoute وuseRouter", "الـ Links النشطة", "الـ Routes الديناميكية", "Route Params", "Query Params", "الـ Routes المتداخلة", "صفحة Not Found", "Navigation Guards", "Lazy Loading Routes"],
  lessonsEn: ["Vue Router Overview", "Installing Vue Router", "Creating Routes", "RouterView", "RouterLink", "useRoute & useRouter", "Active Links", "Dynamic Routes", "Route Params", "Query Params", "Nested Routes", "Not Found Page", "Navigation Guards", "Lazy-Loaded Routes"],
  intro: "Vue Router هو الحل الرسمي للتنقل في Vue — نبني SPA كامل مع صفحات متعددة وحماية وتحميل ذكي.",
  introEn: "Vue Router is the official routing solution — build a full SPA with multiple pages, guards, and smart loading.",
  content: [
    { type: "heading", text: "تثبيت وإعداد Vue Router" },
    { type: "code", code: `$ npm install vue-router@4` },
    { type: "code", code: `// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', component: Home },
  {
    path: '/about',
    component: () => import('../views/About.vue') // Lazy loading
  },
  {
    path: '/users/:id',
    component: () => import('../views/UserDetail.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router` },
    { type: "code", code: `// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')` },
    { type: "heading", text: "RouterView وRouterLink" },
    { type: "code", code: `<!-- App.vue -->
<template>
  <nav>
    <RouterLink to="/">الرئيسية</RouterLink>
    <RouterLink to="/about">عنّا</RouterLink>
    <RouterLink to="/users/1">مستخدم 1</RouterLink>
  </nav>

  <RouterView />
</template>` },
    { type: "heading", text: "useRoute وuseRouter" },
    { type: "code", code: `<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()   // البيانات الحالية
const router = useRouter() // التنقل البرمجي

// قراءة الـ params
const userId = route.params.id
// قراءة الـ query
const search = route.query.q

// التنقل برمجياً
function goHome() { router.push('/') }
function goBack() { router.back() }
function goToUser(id) { router.push({ name: 'user', params: { id } }) }
</script>` },
    { type: "heading", text: "Active Links وتنسيقها" },
    { type: "code", code: `<!-- RouterLink يُضيف تلقائياً: -->
<!-- router-link-active: الرابط والـ parents -->
<!-- router-link-exact-active: الرابط بالضبط -->

<RouterLink to="/" active-class="nav--active" exact-active-class="nav--exact">
  الرئيسية
</RouterLink>

<style>
.nav--exact { color: var(--primary); font-weight: 700; }
</style>` },
    { type: "heading", text: "Nested Routes — Routes متداخلة" },
    { type: "code", code: `const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: '', component: DashboardHome },        // /dashboard
      { path: 'profile', component: Profile },       // /dashboard/profile
      { path: 'settings', component: Settings },     // /dashboard/settings
    ]
  }
]

<!-- Dashboard.vue -->
<template>
  <nav>...</nav>
  <RouterView /> <!-- children يُعرضون هنا -->
</template>` },
    { type: "heading", text: "Navigation Guards — حماية الصفحات" },
    { type: "code", code: `// Global guard
router.beforeEach((to, from) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { path: '/login' }
  }
})

// في تعريف الـ route
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  }
]

// Component guard
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    return confirm('هل تريد المغادرة؟ سيتم فقدان التغييرات.')
  }
})` },
    { type: "tip", text: "Lazy Loading يقسّم bundle التطبيق — كل صفحة تُحمَّل فقط عند الحاجة إليها، مما يُسرّع وقت التحميل الأول." },
    { type: "heading", text: "✅ مراجعة" },
    { type: "qa", question: "ما الفرق بين route.params وroute.query؟", answer: "params هي جزء من مسار الـ URL (/users/:id). query هي البارامترات بعد علامة ?: (/users?role=admin). params مطلوبة في تعريف الـ route، query اختيارية دائماً." },
    { type: "qa", question: "لماذا نستخدم Lazy Loading للـ Routes؟", answer: "Lazy Loading يقسّم الكود إلى chunks — المتصفح يحمّل فقط كود الصفحة التي يزورها المستخدم، مما يُسرّع التحميل الأول للتطبيق." },
  ],
  contentEn: [
    { type: "heading", text: "Vue Router Setup" },
    { type: "code", code: `// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/users/:id', component: () => import('../views/User.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})` },
    { type: "heading", text: "useRoute & useRouter" },
    { type: "code", code: `<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const id = route.params.id
function goHome() { router.push('/') }
</script>` },
    { type: "heading", text: "Navigation Guards" },
    { type: "code", code: `router.beforeEach((to) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isLoggedIn) return '/login'
})` },
    { type: "heading", text: "✅ Review" },
    { type: "qa", question: "What is the difference between route.params and route.query?", answer: "params are part of the URL path (/users/:id). query are the parameters after ?: (/users?role=admin). Params are defined in the route config; query is always optional." },
  ],
};
