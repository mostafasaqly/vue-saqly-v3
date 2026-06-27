# Section 12: Routing with Vue Router

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Installing Vue Router |
| 2 | Defining Routes |
| 3 | RouterView & RouterLink |
| 4 | useRoute & useRouter Composables |
| 5 | Active Link Styling |
| 6 | Dynamic Routes with Params |
| 7 | Nested Routes (Child Routes) |
| 8 | Not Found — Catch-All Route |
| 9 | Navigation Guards (beforeEach) |
| 10 | Programmatic Navigation |
| 11 | Lazy Loading Routes |

## Key Concepts

- **`createRouter`** — Creates the router instance. Pass it to `app.use(router)` in `main.js`.
- **`createWebHistory`** — Uses the HTML5 History API for clean URLs (`/about` instead of `/#/about`). Requires server-side configuration for production.
- **`createWebHashHistory`** — Uses hash-based URLs (`/#/about`). Works without server config but looks less clean.
- **`<RouterView />`** — The outlet where the matched route's component renders. Put it in `App.vue`.
- **`<RouterLink to="/">`** — Renders an `<a>` tag that navigates without a page reload. Automatically adds the `router-link-active` class when the route is active.
- **Route params** — Dynamic segments in the path (`:id` in `/users/:id`). Accessed via `route.params.id`.
- **Route query** — URL query string (`?page=2`). Accessed via `route.query.page`.
- **Route meta** — Custom data attached to a route definition. Useful for auth guards (`meta.requiresAuth`).
- **`beforeEach` guard** — Runs before every navigation. Return `false` to cancel, or return a new location to redirect.
- **Lazy loading** — Using `() => import('./MyView.vue')` as the component delays loading the component JS until the route is first visited.

## Code Reference

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Static route
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
    },

    // Dynamic route — :id is a required param
    {
      path: '/users/:id',
      name: 'UserDetail',
      component: () => import('@/views/UserDetailView.vue'),
      meta: { requiresAuth: true },
    },

    // Nested routes
    {
      path: '/dashboard',
      component: () => import('@/views/DashboardLayout.vue'),
      children: [
        { path: '', name: 'DashboardHome', component: () => import('@/views/DashboardHome.vue') },
        { path: 'analytics', name: 'Analytics', component: () => import('@/views/Analytics.vue') },
        { path: 'settings', name: 'Settings', component: () => import('@/views/Settings.vue') },
      ],
    },

    // Catch-all — 404 Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],

  // Scroll to top on route change
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

// Global navigation guard
router.beforeEach((to, from) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
})

export default router
```

```vue
<!-- App.vue — router outlet and navigation -->
<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
    <!-- :class is automatically applied by Vue Router -->
  </nav>

  <!-- Active route component renders here -->
  <RouterView />
</template>

<style scoped>
nav a { margin-right: 1rem; text-decoration: none; color: #555; }
nav a.router-link-active { color: #42b883; font-weight: bold; }
nav a.router-link-exact-active { border-bottom: 2px solid #42b883; }
</style>
```

```vue
<!-- UserDetailView.vue — reading route params and navigating -->
<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const user = ref(null)
const isLoading = ref(true)

// Fetch user when route param changes
watch(
  () => route.params.id,
  async (id) => {
    isLoading.value = true
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    user.value = await res.json()
    isLoading.value = false
  },
  { immediate: true }
)

// Programmatic navigation
const goHome = () => router.push({ name: 'Home' })
const goToUser = (id) => router.push({ name: 'UserDetail', params: { id } })
const goBack = () => router.back()

// Replace current history entry (user can't go back)
const replaceRoute = () => router.replace({ name: 'Home' })
</script>

<template>
  <div>
    <button @click="goBack">← Back</button>

    <div v-if="isLoading">Loading user {{ route.params.id }}...</div>
    <div v-else-if="user">
      <h2>{{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>Query: page={{ route.query.page ?? 1 }}</p>
    </div>

    <div class="pagination">
      <button @click="goToUser(Number(route.params.id) - 1)">Prev user</button>
      <button @click="goToUser(Number(route.params.id) + 1)">Next user</button>
    </div>
  </div>
</template>
```

```vue
<!-- DashboardLayout.vue — nested routes parent -->
<template>
  <div class="dashboard">
    <nav class="sidebar">
      <RouterLink :to="{ name: 'DashboardHome' }">Overview</RouterLink>
      <RouterLink :to="{ name: 'Analytics' }">Analytics</RouterLink>
      <RouterLink :to="{ name: 'Settings' }">Settings</RouterLink>
    </nav>

    <main>
      <!-- Child routes render here -->
      <RouterView />
    </main>
  </div>
</template>
```

## Navigation Methods

| Method | History | Use case |
|--------|---------|---------|
| `router.push(location)` | Adds to history | Normal navigation (user can go back) |
| `router.replace(location)` | Replaces current | Redirect (user can't go back to this page) |
| `router.back()` | Goes back | Browser back button equivalent |
| `router.forward()` | Goes forward | Browser forward button equivalent |
| `router.go(-2)` | Relative jump | Jump N steps in history |

## Active Link Classes

| Class | Applied when |
|-------|-------------|
| `router-link-active` | The current URL starts with the link's path |
| `router-link-exact-active` | The current URL exactly matches the link's path |

## Review Q&A

**Q: What is the difference between `router.push` and `router.replace`?**
A: `push` adds a new entry to the browser history stack — the user can press Back. `replace` swaps the current entry — the user cannot go back to where they were. Use `replace` for redirects (e.g., after login).

**Q: How do you protect routes that require authentication?**
A: Add `meta: { requiresAuth: true }` to the route, then in `router.beforeEach` check `to.meta.requiresAuth`. If the user isn't authenticated, redirect to the login page and pass the intended URL as a query parameter so you can redirect back after login.

**Q: What is `createWebHashHistory` and when would I choose it over `createWebHistory`?**
A: `createWebHashHistory` uses `/#/` in the URL and works without any server configuration (the server always serves `index.html` because everything after `#` is ignored). Choose it when you can't configure your server (e.g., static file hosting without URL rewriting). Otherwise prefer `createWebHistory` for clean URLs.

**Q: How does lazy loading improve performance?**
A: With `component: () => import('./MyView.vue')`, Vite code-splits each route into a separate JS chunk. That chunk is only downloaded when the user first visits that route — reducing the initial bundle size and load time.

## Examples Folder

- `examples/router/` — complete router setup with guards and nested routes
- `examples/views/` — example view components (Home, UserDetail, NotFound)

---

**Prev:** [Section 11 — Lifecycle Hooks](../Section%2011%20-%20Lifecycle%20Hooks/README.md)
**Next:** [Section 13 — HTTP & APIs](../Section%2013%20-%20HTTP%20and%20APIs/README.md)
