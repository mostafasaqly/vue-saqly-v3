# Section 2: Development Environment Setup

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Installing Node.js |
| 2 | Creating a Vue Project with create-vue |
| 3 | Project Options (Router, Pinia, TS, Tests) |
| 4 | Folder Structure Explained |
| 5 | Running the Dev Server |
| 6 | Understanding main.js & App.vue |
| 7 | Essential VS Code Extensions |

## Key Concepts

- **`npm create vue@latest`** — The official scaffolding tool (create-vue). Generates a Vite-powered project and lets you pick Router, Pinia, TypeScript, and testing.
- **Vite** — A next-generation build tool. Uses native ES Modules in the browser during dev so there is no bundling step — the server starts instantly and hot-module replacement (HMR) is near-instant.
- **SFC** — Each `.vue` file is a Self-Contained Component with `<template>`, `<script setup>`, and `<style scoped>`. Vite compiles these to plain JS.
- **`@` alias** — Configured by Vite and create-vue to resolve to `src/`. Use `@/components/Foo.vue` instead of `../../components/Foo.vue`.
- **`npm run dev`** — Starts the development server at `http://localhost:5173`.
- **`npm run build`** — Compiles and minifies for production into the `dist/` folder.
- **`npm run preview`** — Serves the production build locally so you can verify it before deploying.

## Project Folder Structure

```
my-vue-app/
├── public/               # Static assets served as-is (favicon, robots.txt)
├── src/
│   ├── assets/           # Images, global CSS
│   ├── components/       # Reusable UI components
│   ├── views/            # Page-level components (one per route)
│   ├── router/
│   │   └── index.js      # Vue Router configuration
│   ├── stores/           # Pinia stores (one file per domain)
│   ├── composables/      # Reusable stateful logic (useXxx.js)
│   ├── App.vue           # Root component — holds <RouterView />
│   └── main.js           # App entry point
├── index.html            # Single HTML page — Vue mounts into <div id="app">
├── vite.config.js        # Vite + Vue plugin config
├── package.json          # Scripts & dependencies
└── .eslintrc.cjs         # ESLint rules
```

## Code Reference

```bash
# 1. Scaffold a new project
npm create vue@latest my-vue-app

# Recommended answers for this course:
# ✅ Add TypeScript?          → No  (we add it in Section 15)
# ✅ Add JSX Support?         → No
# ✅ Add Vue Router?          → Yes
# ✅ Add Pinia?               → Yes
# ✅ Add Vitest?              → Yes
# ✅ Add an End-to-End Testing Solution? → No
# ✅ Add ESLint?              → Yes
# ✅ Add Prettier?            → Yes

# 2. Install dependencies and start
cd my-vue-app
npm install
npm run dev
```

```js
// src/main.js — Application entry point
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())   // register Pinia (global state)
app.use(router)          // register Vue Router

app.mount('#app')        // attach to <div id="app"> in index.html
```

```vue
<!-- src/App.vue — Root component -->
<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>

  <!-- Active route component renders here -->
  <RouterView />
</template>

<style scoped>
nav { display: flex; gap: 1rem; padding: 1rem; background: #42b883; }
nav a { color: white; text-decoration: none; font-weight: bold; }
nav a.router-link-active { text-decoration: underline; }
</style>
```

```js
// vite.config.js — Vite configuration
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

## VS Code Extensions

| Extension | Purpose |
|-----------|---------|
| **Vue - Official (Volar)** | Syntax highlighting, IntelliSense, type checking for `.vue` files |
| **ESLint** | Highlights linting errors in the editor |
| **Prettier - Code formatter** | Auto-formats code on save |
| **Auto Rename Tag** | Renames closing tag when you rename the opening tag |
| **Path Intellisense** | Autocompletes file paths |
| **GitLens** | Enhanced Git history and blame in the editor |
| **Error Lens** | Displays errors inline on the line they occur |

> **Tip:** Disable or uninstall the old **Vetur** extension — it conflicts with Volar.

## npm Scripts Reference

| Script | What it does |
|--------|-------------|
| `npm run dev` | Start dev server with HMR at localhost:5173 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run test:unit` | Run Vitest unit tests |
| `npm run lint` | Run ESLint across the project |
| `npm run format` | Run Prettier across the project |

## Review Q&A

**Q: What is the difference between Vite and Webpack?**
A: Vite uses native browser ES Modules during development — it serves files as-is without bundling, so the dev server starts in milliseconds. Webpack bundles everything on every change. In production both output similar bundles, but Vite's dev experience is dramatically faster.

**Q: What does `npm create vue@latest` do?**
A: It runs the create-vue scaffolding tool, which generates a Vue 3 + Vite project. It walks you through optional features (Router, Pinia, TypeScript, Vitest, ESLint, Prettier) and creates the folder structure with all config files ready to go.

**Q: Why is there an `index.html` at the project root instead of inside `public/`?**
A: Vite treats `index.html` as an entry point, not a static asset. It processes the `<script type="module">` tag inside it and injects the bundled output. This is how Vite bootstraps the app.

**Q: What is `<style scoped>` and why should I use it?**
A: `scoped` makes CSS rules apply only to elements in that component. Vue adds a unique data attribute (like `data-v-abc123`) to each element and scopes the CSS selectors to match. Without `scoped`, styles leak globally.

## Examples Folder

- `examples/App.vue` — starter root component
- `examples/setup-commands.sh` — all terminal commands in one file

---

**Prev:** [Section 01 — Course Introduction](../Section%2001%20-%20Course%20Introduction/README.md)
**Next:** [Section 03 — Vue Fundamentals](../Section%2003%20-%20Vue%20Fundamentals/README.md)
