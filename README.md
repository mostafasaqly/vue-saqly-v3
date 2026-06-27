# Vue 3 Course — 23 Sections

A complete Vue 3.5 course covering everything from the fundamentals to real-world projects, TypeScript, Testing, and Deployment.

**Live Web App:** [mostafasaqly.github.io/vue-saqly-v3](https://mostafasaqly.github.io/vue-saqly-v3/)

---

## Course Sections

| # | Section | Level |
|---|---|---|
| 01 | Course Introduction | Beginner |
| 02 | Development Environment Setup | Beginner |
| 03 | Vue Fundamentals | Beginner |
| 04 | Template Syntax & Binding | Beginner |
| 05 | Directives | Beginner |
| 06 | Reactivity Fundamentals | Beginner |
| 07 | Components | Intermediate |
| 08 | Slots & Reusable Components | Intermediate |
| 09 | Forms in Vue | Intermediate |
| 10 | Composition API | Intermediate |
| 11 | Lifecycle Hooks | Intermediate |
| 12 | Routing with Vue Router | Intermediate |
| 13 | HTTP & APIs | Intermediate |
| 14 | State Management with Pinia | Intermediate |
| 15 | TypeScript with Vue | Advanced |
| 16 | UI & Styling | Intermediate |
| 17 | Performance & Best Practices | Advanced |
| 18 | Project 1: Task Manager App | Hands-on |
| 19 | Project 2: Products Dashboard | Hands-on |
| 20 | Project 3: Mini E-Commerce App | Hands-on |
| 21 | Testing Basics | Advanced |
| 22 | Deployment | Advanced |
| 23 | Final Review & Next Steps | Wrap-up |

---

## Repository Structure

```
Vue Course 23 Sections/
│
├── web-app/                              # Interactive bilingual learning app
│   ├── src/
│   │   ├── components/                   # Sidebar, LessonContent, CodeBlock, QABlock
│   │   ├── composables/                  # useLang, useTheme, useProgress, useNotes, useSearch
│   │   └── data/sections/               # section01.js – section23.js
│   ├── vite.config.js
│   └── README.md
│
├── Section 01 - Course Introduction/
│   ├── README.md                         # Section notes & summary
│   └── examples/                         # Code examples
├── Section 02 - Development Environment Setup/
├── Section 03 - Vue Fundamentals/
├── Section 04 - Template Syntax and Binding/
├── Section 05 - Directives/
├── Section 06 - Reactivity Fundamentals/
├── Section 07 - Components/
├── Section 08 - Slots and Reusable Components/
├── Section 09 - Forms in Vue/
├── Section 10 - Composition API/
├── Section 11 - Lifecycle Hooks/
├── Section 12 - Routing with Vue Router/
├── Section 13 - HTTP and APIs/
├── Section 14 - State Management with Pinia/
├── Section 15 - TypeScript with Vue/
├── Section 16 - UI and Styling/
├── Section 17 - Performance and Best Practices/
├── Section 18 - Project Task Manager App/
├── Section 19 - Project Products Dashboard/
├── Section 20 - Project Mini E-Commerce App/
├── Section 21 - Testing Basics/
├── Section 22 - Deployment/
├── Section 23 - Final Review and Next Steps/
│
└── .github/
    └── workflows/
        └── deploy-web-app.yml            # Auto-deploy to GitHub Pages on push to main
```

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| Vue | 3.5 | UI framework — Composition API, `<script setup>` |
| Vite | 6 | Build tool & dev server |
| Vue Router | 4 | Client-side routing (Section 12+) |
| Pinia | latest | State management (Section 14+) |
| Axios | latest | HTTP client with interceptors (Section 13+) |
| TypeScript | 5 | Typed components & composables (Section 15+) |
| Vitest | latest | Unit & component testing (Section 21) |
| Vue Test Utils | latest | Component testing utilities (Section 21) |
| GitHub Actions | — | CI/CD — auto-deploy to GitHub Pages |

---

## Key Concepts

```
Composition API        ref · reactive · computed · watch · watchEffect · toRefs
Vue 3.4                defineModel() · same-name v-bind shorthand (:id)
Vue 3.5                useTemplateRef() · Reactive Props Destructure · onWatcherCleanup() · useId()
Components             defineProps · defineEmits · defineModel · defineExpose · slots
Composables            useXxx pattern · toValue() · useFetch · useLocalStorage
Pinia                  Setup Store · storeToRefs · localStorage persistence
Vue Router             Dynamic routes · nested routes · navigation guards · lazy loading
TypeScript             Typed props/emits · withDefaults · generic components · utility types
UI & Styling           Scoped CSS · CSS Modules · v-bind() in CSS · Tailwind · Transitions
Performance            computed caching · v-memo · defineAsyncComponent · Suspense
Testing                Vitest · Vue Test Utils · Pinia testing · vi.mock
Deployment             Netlify · Vercel · GitHub Pages · GitHub Actions CI/CD
```

---

## Projects Built in This Course

### Project 1 — Task Manager App (Section 18)

**Stack:** Vue 3 · Pinia · Composition API · localStorage

**Features:**
- Add, edit inline, and delete tasks
- Filter by status: all / active / done
- Instant search and sort
- Auto-save to localStorage
- TransitionGroup animations on add/remove

**Key patterns:** `useTaskStore` (Pinia Setup Store) · `useTaskFilter` composable · `watch` with `deep: true` for persistence

---

### Project 2 — Products Dashboard (Section 19)

**Stack:** Vue 3 · Vue Router · Axios · Pinia

**Features:**
- Product list with instant search and category filter
- Product detail page
- Add / edit / delete products
- Skeleton loading cards
- Error handling with retry

**Key patterns:** `useProductsStore` · `useProductSearch` composable · `productsAPI` service layer · lazy-loaded routes

---

### Project 3 — Mini E-Commerce App (Section 20)

**Stack:** Vue 3 · Vue Router · Pinia · Axios · localStorage

**Features:**
- Product catalog with search and filter
- Product detail page with quantity picker
- Full shopping cart with quantity controls
- Checkout form with validation
- Tax + shipping calculation
- Order success page
- Cart persisted in localStorage

**Key patterns:** `useCartStore` · computed totals (subtotal / tax / shipping) · Navigation Guard for checkout · `watch deep` for cart persistence

---

## Interactive Web App

The `web-app/` folder is a standalone Vue 3 app that presents all 23 sections as an interactive course.

**Features:**
- Full Arabic (RTL) and English bilingual content, switchable at runtime
- Dark / Light theme — persisted in localStorage
- Section completion tracking — persisted in localStorage
- Personal notes per section — auto-saved
- Instant search across all sections
- Syntax-highlighted code blocks with one-click copy

**Run locally:**

```bash
cd web-app
npm install
npm run dev
# http://localhost:5173
```

**Deployed automatically** to GitHub Pages via GitHub Actions on every push to `main`.

---

## Deployment

The web app is deployed to GitHub Pages using the official GitHub Actions workflow:

```
.github/workflows/deploy-web-app.yml
```

- Triggers on every push to `main`
- Runs `npm ci` + `npm run build` inside `web-app/`
- Deploys `web-app/dist/` using `actions/deploy-pages`
- Live URL: `https://mostafasaqly.github.io/vue-saqly-v3/`

---

Made by **Mostafa Saqly** · [saqly.com](https://saqly.com) · [Individual Training](https://saqly.com/individual-training)
