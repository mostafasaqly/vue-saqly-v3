// router/index.js — Full Vue Router setup with guards
// إعداد Vue Router الكامل مع الحماية
import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded route components
const Home = () => import('../views/Home.vue')
const UserDetail = () => import('../views/UserDetail.vue')
const NotFound = () => import('../views/NotFound.vue')

// Auth check (replace with your actual auth logic)
const isAuthenticated = () => {
  return localStorage.getItem('auth_token') !== null
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'الرئيسية',
      requiresAuth: false,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { title: 'عن التطبيق' },
  },
  {
    path: '/users/:id',
    name: 'UserDetail',
    component: UserDetail,
    props: true, // passes route.params as component props
    meta: {
      title: 'تفاصيل المستخدم',
      requiresAuth: true,
    },
    beforeEnter: (to) => {
      // Route-level guard
      if (isNaN(Number(to.params.id))) {
        return { name: 'NotFound' }
      }
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true, title: 'لوحة التحكم' },
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('../views/DashboardHome.vue'),
      },
      {
        path: 'settings',
        name: 'DashboardSettings',
        component: () => import('../views/DashboardSettings.vue'),
      },
    ],
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    // Query: /search?q=vue&category=courses
  },
  // Catch-all 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

// Global Navigation Guard
router.beforeEach((to, from) => {
  // Update page title
  document.title = to.meta.title ? `${to.meta.title} | Vue App` : 'Vue App'

  // Auth guard
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return {
      name: 'Login',
      query: { redirect: to.fullPath }, // Redirect after login
    }
  }
})

// After each navigation
router.afterEach((to) => {
  console.log(`Navigated to: ${to.path}`)
})

export default router
