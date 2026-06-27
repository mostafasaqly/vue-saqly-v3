# Section 12: Routing with Vue Router

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Installing Vue Router |
| 2 | Defining Routes |
| 3 | RouterView & RouterLink |
| 4 | useRoute & useRouter Composables |
| 5 | Active Link Styling |
| 6 | Dynamic Routes with Params |
| 7 | Nested Routes |
| 8 | Not Found — Catch-All Route |
| 9 | Navigation Guards (beforeEach) |
| 10 | Lazy Loading Routes |

## Key Concepts

- **`createRouter`** — Creates the router instance.
- **`createWebHistory`** — Uses HTML5 History API for clean URLs.
- **`route.params`** — Dynamic parameters from the URL.
- **`route.query`** — Query-string parameters from the URL.
- **`meta.requiresAuth`** — Extra route metadata used in guards.
- **`beforeEach`** — Global navigation guard.
- **Lazy Loading** — Load components only when the route is visited.

## Code Reference

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
      path: '/users/:id',
      name: 'UserDetail',
      component: () => import('../views/UserDetail.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      component: () => import('../views/Dashboard.vue'),
      children: [
        { path: '', component: () => import('../views/DashboardOverview.vue') },
        { path: 'settings', component: () => import('../views/DashboardSettings.vue') },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

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

const goHome = () => router.push({ name: 'Home' })
const goToUser = (id) => router.push({ name: 'UserDetail', params: { id } })
const goBack = () => router.back()
</script>
```

## Review Q&A

**Q: What is the difference between `router.push` and `router.replace`?**
A: `push` adds a new entry to browser history (user can go back). `replace` replaces the current entry (user cannot go back).

**Q: How do you prevent an unauthenticated user from accessing a page?**
A: Add `meta: { requiresAuth: true }` to the route, then check it in `router.beforeEach`.

## Examples Folder

This section's examples are in `Section 12 - Routing with Vue Router/examples/`:

- `examples/router/`
- `examples/views/`

Open `Section 12 - Routing with Vue Router/examples/` to view the runnable routing setup.

---

**Prev:** Section 11 — Lifecycle Hooks  
**Next:** Section 13 — HTTP & APIs
