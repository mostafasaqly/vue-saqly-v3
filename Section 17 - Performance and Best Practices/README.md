# Section 17: Performance & Best Practices

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | computed vs Methods — When to Use Which |
| 2 | `v-memo` — Memoizing List Items |
| 3 | `shallowRef` & `shallowReactive` — Avoiding Deep Reactivity Cost |
| 4 | Async Components with `defineAsyncComponent` |
| 5 | `<Suspense>` — Handling Async Templates |
| 6 | Lazy Loading Routes |
| 7 | Bundle Optimization (Tree-shaking, Code Splitting) |
| 8 | Vue Best Practices Checklist |
| 9 | Vapor Mode — Vue 3.6 Experimental |

## Key Concepts

- **`computed` caching** — A `computed` value is cached and only recalculates when its reactive dependencies change. Calling it 1,000 times in the template costs one calculation.
- **`v-memo`** — Skips re-rendering a subtree entirely if specified dependency values haven't changed. Effective for long lists with stable items.
- **`shallowRef` / `shallowReactive`** — Only makes the top level reactive — nested properties are not tracked. Use for large objects where you only replace the whole object, not individual deep properties.
- **`defineAsyncComponent`** — Loads a component's JavaScript only when the component is first rendered. Reduces initial bundle size.
- **`<Suspense>`** — A built-in Vue component that shows fallback content (skeleton/spinner) while an async component or a component with a top-level `await` is loading.
- **Code splitting** — Vite automatically splits each lazily-loaded route and async component into a separate JS chunk.
- **Tree-shaking** — Vite/rollup removes unused exports from the final bundle. Import only what you need: `import { ref, computed } from 'vue'` not `import Vue from 'vue'`.
- **Vapor Mode (Vue 3.6 experimental)** — A new compiler mode that generates direct DOM operations instead of Virtual DOM diffing. Significantly less memory usage and faster updates for large component trees.

## Code Reference

```vue
<!-- computed vs method caching demonstration -->
<script setup>
import { ref, computed } from 'vue'

const items = ref([...Array(10000)].map((_, i) => ({ id: i, value: i * 2 })))

// ✅ computed — calculates once, cached until items changes
const expensiveComputed = computed(() => {
  console.log('computed ran')
  return items.value.reduce((sum, item) => sum + item.value, 0)
})

// ✗ method — runs on every re-render, even unrelated ones
const expensiveMethod = () => {
  console.log('method ran')
  return items.value.reduce((sum, item) => sum + item.value, 0)
}
</script>

<template>
  <!-- computed: 3 references = 1 calculation -->
  <p>Sum: {{ expensiveComputed }}</p>
  <p>Same: {{ expensiveComputed }}</p>
  <p>Again: {{ expensiveComputed }}</p>

  <!-- method: 3 references = 3 calculations -->
  <p>Sum: {{ expensiveMethod() }}</p>
</template>
```

```vue
<!-- v-memo — skip list item re-renders -->
<script setup>
import { ref } from 'vue'

const selectedId = ref(null)
const products = ref([...]) // large list
</script>

<template>
  <ul>
    <!--
      Only re-renders this <li> if product.id === selectedId changes.
      All other products are skipped during the Vue update cycle.
    -->
    <li
      v-for="product in products"
      :key="product.id"
      v-memo="[product.id === selectedId]"
    >
      <span>{{ product.name }}</span>
      <span>{{ product.price }}</span>
    </li>
  </ul>
</template>
```

```js
// shallowRef — only top-level change is reactive
import { shallowRef } from 'vue'

const bigList = shallowRef([...10000 items...])

// ✅ This triggers reactivity (replacing the whole array)
bigList.value = [...bigList.value, newItem]

// ✗ This does NOT trigger reactivity (mutating nested)
// bigList.value.push(newItem)  ← use .value = [...] instead
```

```js
// defineAsyncComponent — lazy load with loading/error UI
import { defineAsyncComponent } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorDisplay from '@/components/ErrorDisplay.vue'

// Simple async component
const HeavyChart = defineAsyncComponent(
  () => import('@/components/HeavyChart.vue')
)

// With loading and error states
const HeavyDashboard = defineAsyncComponent({
  loader: () => import('@/components/HeavyDashboard.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,       // show LoadingSpinner after 200ms
  timeout: 10_000,  // show ErrorDisplay after 10s
})
```

```vue
<!-- Suspense — async setup with await -->
<script setup>
// Top-level await — component suspends until resolved
const res = await fetch('https://api.example.com/data')
const data = await res.json()
</script>

<template>
  <div>Data: {{ data }}</div>
</template>
```

```vue
<!-- Parent using Suspense with an async component -->
<template>
  <Suspense>
    <!-- Renders when async component resolves -->
    <template #default>
      <AsyncDashboard />
    </template>

    <!-- Shown while loading -->
    <template #fallback>
      <div class="skeleton">
        <div class="skeleton-title"></div>
        <div class="skeleton-body"></div>
      </div>
    </template>
  </Suspense>
</template>
```

## Best Practices Checklist

```
REACTIVITY
  ✅ Use computed for derived values — never re-derive in the template
  ✅ Use watch for side effects, not to compute values
  ✅ Use shallowRef/shallowReactive for large objects you replace wholesale
  ✅ Don't store non-reactive data in ref/reactive — use plain variables or const

RENDERING
  ✅ Always provide a unique stable :key for v-for (use id, not index)
  ✅ Prefer v-show over v-if for elements that toggle frequently
  ✅ Use v-memo on expensive list items that rarely change
  ✅ Split large components into smaller focused ones

LOADING
  ✅ Lazy-load routes with () => import(...)
  ✅ Lazy-load heavy components with defineAsyncComponent
  ✅ Use <Suspense> to show skeletons during async loads
  ✅ Use onUnmounted to cancel fetches with AbortController

COMPONENTS
  ✅ Prefer props + emits over direct parent access
  ✅ Use scoped styles to avoid CSS leakage
  ✅ Keep components under ~150 lines — extract composables for logic
  ✅ Use defineProps with validation (type, required, default)

TYPESCRIPT
  ✅ Type API responses and store state
  ✅ Use generic components for reusable lists and tables
  ✅ Type composable return values explicitly
```

## Review Q&A

**Q: When is a method better than computed?**
A: Methods are better when you need to pass arguments (`getPrice(taxRate)`) or when you explicitly don't want caching (like `Math.random()` or `Date.now()`). For everything that derives a value from reactive data without arguments, use `computed`.

**Q: What is Vapor Mode?**
A: An experimental compiler mode in Vue 3.6. Instead of producing Virtual DOM nodes (which Vue then diffs), Vapor mode compiles templates directly to precise DOM operations — creating, updating, and removing specific nodes. Result: significantly less memory allocation and faster updates for component-heavy UIs. Not production-ready yet, but the future direction of Vue.

**Q: What is the difference between `defineAsyncComponent` and lazy-loading a route?**
A: Route lazy-loading (` () => import('./MyView.vue')`) is handled by Vue Router — it code-splits at the route level and downloads the chunk when the user navigates to that route. `defineAsyncComponent` works at the component level inside a view — it defers loading a heavy widget or chart until that component actually needs to render.

**Q: Should I always use `shallowRef` for performance?**
A: No. `shallowRef` / `shallowReactive` only make sense for large objects where you know you'll always replace the whole value and never mutate nested properties. For normal data, the overhead of deep reactivity is negligible and the ergonomics are much better.

## Examples Folder

- `examples/PerformanceDemo.vue` — computed caching, v-memo, async component, Suspense

---

**Prev:** [Section 16 — UI & Styling](../Section%2016%20-%20UI%20and%20Styling/README.md)
**Next:** [Section 18 — Project 1: Task Manager App](../Section%2018%20-%20Project%20Task%20Manager%20App/README.md)
