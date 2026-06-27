# Section 2: Development Environment Setup

> **Vue 3 Course — 23 Sections**

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

- **`npm create vue@latest`** — The fastest way to scaffold a Vue 3 + Vite project.
- **Vite** — A modern, blazing-fast build tool for development.
- **SFC Structure** — Every `.vue` file typically contains `<template>`, `<script setup>`, and `<style scoped>`.
- **Vue - Official (Volar)** — The official VS Code extension for Vue support.
- **`@` alias** — Points to the `src/` directory in the project.

## Folder Structure

```
my-vue-app/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images & CSS
│   ├── components/   # Reusable components
│   ├── views/        # Application pages
│   ├── router/       # Vue Router config
│   ├── stores/       # Pinia stores
│   ├── composables/  # Composable functions
│   ├── App.vue       # Root component
│   └── main.js       # Entry point
├── index.html        # Main HTML template
├── vite.config.js    # Vite configuration
└── package.json      # Project dependencies
```

## Code Reference

```bash
# Create a new project
npm create vue@latest my-vue-app

# Recommended options for this course
# ✅ TypeScript — No (start with JS, TypeScript in Section 15)
# ✅ JSX Support — No
# ✅ Vue Router — Yes
# ✅ Pinia — Yes
# ✅ Vitest — Yes (for testing)
# ✅ ESLint — Yes
# ✅ Prettier — Yes

cd my-vue-app
npm install
npm run dev
```

```js
// src/main.js — Entry point
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

```vue
<!-- src/App.vue — Root component -->
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
/* Global layout styles go here */
</style>
```

## VS Code Extensions

| Extension | Description |
|---|---|
| **Vue - Official (Volar)** | Official Vue 3 support |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Auto Rename Tag** | Auto-rename HTML tags |
| **Path Intellisense** | File path completion |
| **GitLens** | Enhanced Git tools |

## Review Q&A

**Q: What is the difference between Vite and Webpack?**
A: Vite uses native ES Modules in the browser during development making it significantly faster, while Webpack bundles everything on every change.

**Q: What does `npm create vue@latest` do?**
A: It scaffolds a new Vue 3 project using the create-vue tool with Vite as the build tool, offering options to add Router, Pinia, TypeScript, and testing.

## Examples Folder

The examples for this section are in the `Section 02 - Development Environment Setup/examples/` folder:

- `examples/App.vue`
- `examples/setup-commands.sh`

Open `Section 02 - Development Environment Setup/examples/` to view and run the code samples.

---

**Prev:** Section 01 — Course Introduction  
**Next:** Section 03 — Vue Fundamentals
