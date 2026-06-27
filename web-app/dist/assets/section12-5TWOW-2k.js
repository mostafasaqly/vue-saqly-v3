const e={id:12,title:"Routing بـ Vue Router",titleEn:"Routing with Vue Router",level:"متوسط",levelEn:"Intermediate",lessons:["نظرة عامة على Vue Router","تثبيت وإعداد الـ Router","RouterView وRouterLink","useRoute وuseRouter","الـ Routes الديناميكية والـ Params","Query Parameters","Named Routes","الـ Routes المتداخلة","صفحة 404 Not Found","Navigation Guards (Global وPer-Route وComponent)","Lazy Loading Routes","Programmatic Navigation"],lessonsEn:["Vue Router Overview","Install & Setup Router","RouterView & RouterLink","useRoute & useRouter","Dynamic Routes & Params","Query Parameters","Named Routes","Nested Routes","404 Not Found Page","Navigation Guards","Lazy-Loading Routes","Programmatic Navigation"],intro:"Vue Router هو الحل الرسمي للتنقل في Vue — نبني SPA كامل مع صفحات متعددة وحماية routes وتحميل ذكي (lazy loading).",introEn:"Vue Router is the official routing solution — build a full SPA with multiple pages, route guards, and smart lazy loading.",content:[{type:"heading",text:"إعداد Vue Router"},{type:"code",code:`// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'), // Lazy loading
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/users/:id',           // Dynamic route param
    name: 'user',
    component: () => import('@/views/UserView.vue'),
    meta: { requiresAuth: true }, // Custom meta
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
    children: [                   // Nested routes
      { path: '', name: 'dashboard-home', component: () => import('@/views/dashboard/HomeTab.vue') },
      { path: 'profile', name: 'profile', component: () => import('@/views/dashboard/ProfileTab.vue') },
      { path: 'settings', name: 'settings', component: () => import('@/views/dashboard/SettingsTab.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',     // 404 — catch all
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 } // تمرير للأعلى عند كل تنقل
  },
})

export default router`},{type:"code",code:`// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')`},{type:"heading",text:"RouterView وRouterLink"},{type:"code",code:`<!-- App.vue -->
<script setup>
import { RouterView, RouterLink } from 'vue-router'
<\/script>

<template>
  <nav>
    <!-- RouterLink ينشئ <a> مع تنسيق تلقائي للـ active state -->
    <RouterLink to="/">الرئيسية</RouterLink>
    <RouterLink :to="{ name: 'about' }">عنّا</RouterLink>
    <RouterLink :to="{ name: 'user', params: { id: 1 } }">ملفي</RouterLink>
  </nav>

  <!-- الصفحة الحالية تُعرض هنا -->
  <RouterView />
</template>

<style>
/* تلقائياً: router-link-active (الرابط النشط) */
/* و: router-link-exact-active (المطابق تماماً) */
nav a.router-link-exact-active {
  color: #42b883;
  font-weight: 700;
}
</style>`},{type:"heading",text:"useRoute وuseRouter"},{type:"code",code:`<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()   // البيانات الحالية للـ route (read-only)
const router = useRouter() // للتنقل البرمجي

// قراءة الـ params
const userId = computed(() => route.params.id)

// قراءة الـ query
const searchQuery = computed(() => route.query.q || '')
const page = computed(() => Number(route.query.page) || 1)

// اسم الـ route الحالي
const routeName = computed(() => route.name)

// التنقل برمجياً
function goHome() { router.push('/') }
function goBack() { router.back() }
function goForward() { router.forward() }
function goToUser(id) { router.push({ name: 'user', params: { id } }) }
function replaceSearch(q) {
  router.replace({ query: { q } }) // لا يُضاف للـ history
}
<\/script>`},{type:"heading",text:"الـ Routes المتداخلة (Nested Routes)"},{type:"code",code:`<!-- DashboardView.vue -->
<template>
  <div class="dashboard">
    <nav class="dashboard__nav">
      <RouterLink :to="{ name: 'dashboard-home' }">الرئيسية</RouterLink>
      <RouterLink :to="{ name: 'profile' }">الملف الشخصي</RouterLink>
      <RouterLink :to="{ name: 'settings' }">الإعدادات</RouterLink>
    </nav>

    <!-- الـ child route يُعرض هنا -->
    <RouterView />
  </div>
</template>`},{type:"heading",text:"Navigation Guards — حماية الصفحات"},{type:"code",code:`// --- 1. Global Guard ---
// router/index.js
router.beforeEach((to, from) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isLoggedIn) {
    // إعادة التوجيه لصفحة تسجيل الدخول مع حفظ الوجهة
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

// --- 2. Per-Route Guard ---
const routes = [
  {
    path: '/admin',
    component: AdminView,
    beforeEnter: (to, from) => {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (!user.isAdmin) return { name: 'home' }
    }
  }
]

// --- 3. Component Guard ---
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

// تحذير عند مغادرة صفحة بها تغييرات غير محفوظة
const hasUnsavedChanges = ref(false)

onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    const answer = window.confirm('هل تريد المغادرة؟ ستضيع التغييرات.')
    if (!answer) return false
  }
})

// ينفّذ عند تغيير params في نفس الـ route (/users/1 → /users/2)
onBeforeRouteUpdate(async (to, from) => {
  await fetchUser(to.params.id)
})`},{type:"tip",text:"في navigation guard، أعد { name: 'login' } وليس router.push('/login') — استخدام router.push داخل guard يسبب مشاكل. أعد كائن route مباشرةً."},{type:"heading",text:"✅ مراجعة"},{type:"qa",question:"ما الفرق بين route.params وroute.query؟",answer:"params هي جزء من مسار الـ URL تُعرَّف في تكوين الـ route (/users/:id). query هي البارامترات بعد علامة ? (/users?role=admin&page=2) وهي اختيارية دائماً ولا تحتاج تعريفاً."},{type:"qa",question:"لماذا نستخدم Lazy Loading للـ Routes؟",answer:"Lazy Loading يُقسّم الكود إلى chunks — الـ browser يحمّل فقط JavaScript الصفحة التي يزورها المستخدم. يُسرّع التحميل الأول للتطبيق بشكل كبير خاصة في المشاريع الكبيرة."},{type:"qa",question:"ما الفرق بين router.push() وrouter.replace()؟",answer:"router.push() يُضيف المسار الجديد لـ history stack — يمكن الضغط على 'رجوع' للعودة. router.replace() يستبدل السجل الحالي — لا يمكن العودة إليه بـ 'رجوع'. استخدم replace لصفحات search/filter."},{type:"qa",question:"ما هو الفرق بين router-link-active وrouter-link-exact-active؟",answer:"router-link-active يُضاف لأي رابط يكون ضمن الـ path الحالي — مثلاً /dashboard يكون active عند /dashboard/profile. router-link-exact-active يُضاف فقط إذا كان الـ path مطابقاً تماماً للمسار الحالي."}],contentEn:[{type:"heading",text:"Vue Router Setup"},{type:"code",code:`// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/users/:id', name: 'user', component: () => import('@/views/UserView.vue'), meta: { requiresAuth: true } },
  {
    path: '/dashboard', name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      { path: '', component: () => import('@/views/dashboard/HomeTab.vue') },
      { path: 'profile', component: () => import('@/views/dashboard/ProfileTab.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFoundView.vue') },
]

export default createRouter({ history: createWebHistory(), routes })`},{type:"heading",text:"useRoute & useRouter"},{type:"code",code:`<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userId = route.params.id
const search = route.query.q

function goToUser(id) { router.push({ name: 'user', params: { id } }) }
function goBack() { router.back() }
<\/script>`},{type:"heading",text:"Navigation Guards"},{type:"code",code:`// Global guard
router.beforeEach((to) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

// Component guard — warn before leaving unsaved form
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave(() => {
  if (hasUnsavedChanges.value) {
    return confirm('Leave? Changes will be lost.')
  }
})`},{type:"tip",text:"In navigation guards, return { name: 'login' } instead of calling router.push() — using push inside a guard causes issues."},{type:"heading",text:"✅ Review"},{type:"qa",question:"What is the difference between route.params and route.query?",answer:"params are defined in the route config and are part of the URL path (/users/:id). query are the parameters after ? (/users?role=admin) and are always optional, never defined in the route config."},{type:"qa",question:"Why use Lazy Loading for routes?",answer:"Lazy loading splits code into chunks — the browser downloads only the JavaScript for the page the user is visiting. This dramatically speeds up the initial load, especially for large apps."},{type:"qa",question:"What is the difference between router.push() and router.replace()?",answer:"router.push() adds to the history stack — the user can go back. router.replace() replaces the current history entry — no going back. Use replace for filter/search pages where going 'back' to an old search state doesn't make sense."}]};export{e as default};
