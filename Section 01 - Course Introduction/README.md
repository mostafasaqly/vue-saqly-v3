# Section 1: Course Introduction

> **Vue 3 Complete Course — 23 Sections**

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

- **Progressive Framework** — Vue can be adopted incrementally: embed a single widget in an existing page, or build a full SPA from scratch. You choose how much Vue you use.
- **createApp** — The entry point for every Vue 3 application. Replaces the `new Vue()` constructor from Vue 2.
- **SFC (Single File Component)** — A `.vue` file that co-locates `<template>`, `<script setup>`, and `<style scoped>` in one place.
- **Composition API** — The recommended way to write Vue 3 logic. Organizes code by feature rather than by option (data/methods/computed).
- **Virtual DOM** — Vue keeps a lightweight copy of the DOM in memory and only patches what actually changed, keeping updates fast.
- **Reactivity System** — Vue automatically tracks which data a template depends on and re-renders only what needs to update.
- **3 Real Projects** — Task Manager (Section 18), Products Dashboard (Section 19), Mini E-Commerce App (Section 20).

## What's New in Vue 3.3 – 3.5

| Version | Notable Addition |
|---------|-----------------|
| 3.3 | `defineModel()`, generic components, improved `defineProps` types |
| 3.4 | `v-bind` same-name shorthand (`:id` instead of `:id="id"`), performance improvements |
| 3.5 | `useId()`, `useTemplateRef()`, reactive props destructure stable, `onWatcherCleanup()` |

## Framework Comparison

| Feature | Vue 3 | React 18 | Angular 17 |
|---------|-------|----------|------------|
| Learning Curve | Easy | Medium | Hard |
| Bundle Size | ~22 kb | ~45 kb | ~130 kb |
| Official State Mgmt | Pinia | — | NgRx |
| Official Router | Vue Router | — | Angular Router |
| Language | JS / TS | JSX / TSX | TypeScript |
| Two-way Binding | `v-model` | Controlled inputs | `[(ngModel)]` |
| Rendering | Virtual DOM | Virtual DOM | Change Detection |
| Style | Options API or Composition API | Hooks | Decorators |

## Code Reference

```js
// Minimal Vue 3 application — main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

```vue
<!-- App.vue — Root component -->
<script setup>
import { ref } from 'vue'

const message = ref('Welcome to Vue 3!')
</script>

<template>
  <h1>{{ message }}</h1>
</template>

<style scoped>
h1 { color: #42b883; font-family: sans-serif; }
</style>
```

```vue
<!-- Vue without a build tool — embed in any HTML page -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
const { createApp, ref } = Vue

createApp({
  setup() {
    const message = ref('Hello from Vue!')
    return { message }
  }
}).mount('#app')
</script>
```

## Prerequisites Checklist

Before starting this course you should be comfortable with:

- [ ] HTML — elements, attributes, forms
- [ ] CSS — selectors, box model, flexbox
- [ ] JavaScript — variables, functions, arrays, objects, ES6+ (arrow functions, destructuring, spread, async/await)
- [ ] Basic command line / terminal usage
- [ ] `npm` — install packages, run scripts

You do **not** need to know React, Angular, or any other framework.

## Course Roadmap

```
Fundamentals (1–9)
  └─ Sections 1-9: Vue basics, template syntax, directives, reactivity, components, forms

Intermediate (10–17)
  └─ Sections 10-17: Composition API, lifecycle, routing, HTTP, Pinia, TypeScript, styling, performance

Projects (18–20)
  └─ Section 18: Task Manager App
  └─ Section 19: Products Dashboard
  └─ Section 20: Mini E-Commerce App

Ship It (21–23)
  └─ Section 21: Testing with Vitest
  └─ Section 22: Deployment
  └─ Section 23: Final Review & Next Steps
```

## Review Q&A

**Q: What is the difference between Options API and Composition API?**
A: Options API organizes code by category — `data`, `methods`, `computed`, `watch`. Composition API organizes code by logical concern inside a single `setup()` function (or `<script setup>`). For anything beyond small components, Composition API is easier to split, test, and reuse.

**Q: Why use Vue instead of Vanilla JS?**
A: Vue gives you automatic reactivity (change data → UI updates), a component model, an official router, official state management, and a build pipeline — all with minimal boilerplate.

**Q: Can I use Vue without a build tool?**
A: Yes. You can load Vue from a CDN via a `<script>` tag and write plain `.html` files. A build tool (Vite) is recommended for real projects because it gives you SFCs, TypeScript, hot reload, and optimized production builds.

**Q: What projects will you build in this course?**
A: Three projects: Task Manager App (Section 18), Products Dashboard (Section 19), and Mini E-Commerce App (Section 20). Each one grows in complexity and introduces new patterns.

## Examples Folder

- `examples/01-vue-overview.md` — framework overview notes

---

**Prev:** — This is the first section
**Next:** [Section 02 — Development Environment Setup](../Section%2002%20-%20Development%20Environment%20Setup/README.md)
