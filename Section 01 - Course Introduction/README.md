# Section 1: Course Introduction

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Welcome — Meet Your Instructor |
| 2 | What You'll Build in This Course |
| 3 | Prerequisites |
| 4 | Course Roadmap |
| 5 | Vue Overview |
| 6 | What's New in Vue 3.3–3.5 |
| 7 | Vue vs React vs Angular |
| 8 | When to Use Vue? |

## Key Concepts

- **Progressive Framework** — Vue can be adopted incrementally from a single widget to a full SPA.
- **createApp** — The entry point for any Vue application.
- **3 Real Projects** — Task Manager, Products Dashboard, Mini E-Commerce.
- **Composition API** — The recommended approach in Vue 3.
- **SFC (Single File Component)** — A `.vue` file that combines Template, Script, and Style.

## Code Reference

```js
// Simplest Vue application
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

```vue
<!-- Basic Vue component -->
<script setup>
import { ref } from 'vue'
const message = ref('Welcome to Vue 3!')
</script>

<template>
  <h1>{{ message }}</h1>
</template>

<style scoped>
  h1 { color: #42b883; }
</style>
```

### Framework Comparison

| Feature | Vue 3 | React 18 | Angular 17 |
|---|---|---|---|
| Learning Curve | Easy | Medium | Hard |
| Bundle Size | ~22kb | ~45kb | ~130kb |
| State Management | Pinia (official) | Redux / Zustand | NgRx |
| Routing | Vue Router (official) | React Router | Angular Router |
| Language | JS / TS | JSX / TSX | TypeScript |
| Rendering | Virtual DOM | Virtual DOM | Change Detection |
| Two-way Binding | v-model | Controlled components | [(ngModel)] |

## Review Q&A

**Q: What is the difference between Options API and Composition API?**
A: Options API organizes code by options (data, methods, computed), while Composition API organizes by logical concerns (composables), making reuse easier.

**Q: Why use Vue instead of Vanilla JS?**
A: Vue provides automatic reactivity, smart DOM management, and a clear application structure with official tools for routing and state management.

**Q: What projects will you build in this course?**
A: You'll build 3 projects: Task Manager App (Section 18), Products Dashboard (Section 19), and Mini E-Commerce App (Section 20).

## Examples Folder

See `examples/` for runnable code for each lesson.

---

**Prev:** — This is the first section  
**Next:** Section 02 — Development Environment Setup
