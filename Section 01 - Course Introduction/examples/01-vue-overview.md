# Vue vs React vs Angular — Comparison Table

## Overview

| Feature | Vue 3 | React 18 | Angular 17 |
|---|---|---|---|
| **Type** | Progressive Framework | UI Library | Full Framework |
| **Language** | JavaScript / TypeScript | JSX / TSX | TypeScript (required) |
| **Learning Curve** | Easy | Medium | Hard |
| **Bundle Size (min+gz)** | ~22 KB | ~45 KB | ~130 KB |
| **Rendering** | Virtual DOM | Virtual DOM | Incremental DOM |
| **State Management** | Pinia (official) | Redux / Zustand / Jotai | NgRx / Signals |
| **Routing** | Vue Router (official) | React Router / TanStack | Angular Router |
| **Two-way Binding** | `v-model` | Controlled components | `[(ngModel)]` |
| **Component Style** | SFC `.vue` | JSX in `.jsx/.tsx` | Decorators in `.ts` |
| **SSR** | Nuxt 3 | Next.js | Angular Universal |
| **Mobile** | Ionic / NativeScript | React Native | Ionic / NativeScript |

## When to Use Vue

✅ **Choose Vue when:**
- You want a gentle learning curve
- You're building a SPA or progressive web app
- You want official, well-integrated tools (Router + Pinia)
- Your team values readable, clean template syntax
- You need fast prototyping

❌ **Consider React when:**
- You need the largest ecosystem / job market
- You're building a very complex UI with fine-grained control
- Your team is already proficient in React

❌ **Consider Angular when:**
- You're building enterprise-scale apps
- Your team wants an opinionated, batteries-included framework
- You need strict TypeScript enforcement from day 1

## What's New in Vue 3.3–3.5

### Vue 3.3
- `defineProps` with imported types
- `defineEmits` shorthand
- Generic components (`generic="T"`)

### Vue 3.4
- `defineModel()` — simplifies two-way binding in custom components
- `v-bind` same-name shorthand: `:value` instead of `:value="value"`

### Vue 3.5
- **Reactive Props Destructure** — `const { title } = defineProps(...)` is now reactive
- **useTemplateRef()** — replaces `ref=""` string-based template refs
- **useId()** — generates unique IDs for accessibility
- **onWatcherCleanup()** — registers cleanup logic inside watchers
- **Lazy hydration strategies** for SSR
