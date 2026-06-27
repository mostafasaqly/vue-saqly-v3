# القسم 12: التوجيه مع Vue Router
# Section 12: Routing with Vue Router

> **Vue 3 Course — 23 Sections** | القسم 12 من 23

## الدروس | Lessons

| # | بالعربية | In English |
|---|---------|------------|
| 1 | تثبيت Vue Router | Installing Vue Router |
| 2 | تعريف الـ Routes | Defining Routes |
| 3 | RouterView و RouterLink | RouterView & RouterLink |
| 4 | useRoute و useRouter | useRoute & useRouter Composables |
| 5 | Active Link Styling | Active Link Styling |
| 6 | Dynamic Routes (المعاملات) | Dynamic Routes with Params |
| 7 | Nested Routes | Nested Routes |
| 8 | Not Found (404) | Not Found — Catch-All Route |
| 9 | Navigation Guards | Navigation Guards (beforeEach) |
| 10 | Lazy Loading Routes | Lazy Loading Routes |

## المفاهيم الرئيسية | Key Concepts

- **`createRouter`** — إنشاء instance للـ router / Creates the router instance.
- **`createWebHistory`** — يستخدم HTML5 History API (لا # في الـ URL) / Uses HTML5 History API (clean URLs).
- **`route.params`** — المعاملات الديناميكية في الـ URL / Dynamic parameters from the URL.
- **`route.query`** — معاملات الاستعلام في الـ URL / Query string parameters.
- **`meta.requiresAuth`** — بيانات إضافية للـ route تُستخدم في الـ Guards / Extra route data used in guards.
- **`beforeEach`** — حارس التنقل العالمي / Global navigation guard.
- **Lazy Loading** — تحميل المكون فقط عند الحاجة / Load component only when needed.

## أمثلة مرجعية | Code Reference

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'), // Lazy loading
    },
    {
      path: '/users/:id',  // Dynamic route
      name: 'UserDetail',
      component: () => import('../views/UserDetail.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      component: () => import('../views/Dashboard.vue'),
      children: [  // Nested routes
        { path: '', component: () => import('../views/DashboardOverview.vue') },
        { path: 'settings', component: () => import('../views/DashboardSettings.vue') },
      ],
    },
    {
      path: '/:pathMatch(.*)*',  // 404 Catch-all
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

// Navigation Guard
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return { name: 'Login' }
  }
})

export default router
```

```vue
<!-- Using router in a component -->
<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userId = route.params.id
const searchQuery = route.query.q

// Programmatic navigation
const goHome = () => router.push({ name: 'Home' })
const goToUser = (id) => router.push({ name: 'UserDetail', params: { id } })
const goBack = () => router.back()
</script>
```

## أسئلة المراجعة | Review Q&A

**س: ما الفرق بين `router.push` و `router.replace`؟**
ج: `push` يُضيف entry جديد في تاريخ التصفح (يمكن الرجوع). `replace` يستبدل الـ entry الحالي (لا يمكن الرجوع).

**Q: What is the difference between `router.push` and `router.replace`?**
A: `push` adds a new entry to browser history (user can go back). `replace` replaces the current entry (user cannot go back).

**س: كيف تمنع المستخدم غير المسجّل من الوصول لصفحة؟**
ج: أضف `meta: { requiresAuth: true }` للـ route، ثم تحقق من ذلك في `router.beforeEach`.

**Q: How do you prevent an unauthenticated user from accessing a page?**
A: Add `meta: { requiresAuth: true }` to the route, then check it in `router.beforeEach`.

## مجلد الأمثلة | Examples Folder

راجع `examples/` للأكواد التشغيلية لكل درس.
See `examples/` for runnable code for each lesson.

---

**السابق | Prev:** Section 11 — Lifecycle Hooks  
**التالي | Next:** Section 13 — HTTP & APIs
