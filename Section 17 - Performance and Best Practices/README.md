# Section 17: Performance & Best Practices

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | computed vs Methods — When to Use Which |
| 2 | v-memo — Memoizing List Items |
| 3 | Async Components with defineAsyncComponent |
| 4 | Suspense — Handling Async Templates |
| 5 | Bundle Optimization (Tree-shaking, Code-splitting) |
| 6 | Vapor Mode (Vue 3.6 Experimental) |
| 7 | Vue Best Practices Checklist |

## Key Concepts

- **Computed caching** — `computed` caches its result and only recalculates when dependencies change.
- **`v-memo`** — Prevents re-rendering list items if specified values haven't changed.
- **`defineAsyncComponent`** — Loads a component lazily only when needed.
- **`<Suspense>`** — Shows fallback content while an async component loads.
- **Vapor Mode** — Experimental render engine in Vue 3.6 that eliminates the Virtual DOM for better performance.

## Code Reference

```vue
<!-- v-memo — skip re-render if selected/active haven't changed -->
<li v-for="item in list" :key="item.id" v-memo="[item.id === selectedId, item.isActive]">
  {{ item.name }}
</li>
```

```js
// defineAsyncComponent — lazy load
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 5000,
})
```

```vue
<!-- Suspense — async template handling -->
<Suspense>
  <template #default>
    <AsyncUserProfile />
  </template>
  <template #fallback>
    <SkeletonLoader />
  </template>
</Suspense>
```

## Best Practices Checklist

- ✅ Use `computed` for derived values (not `methods`)
- ✅ Always add `:key` in `v-for`
- ✅ Use `v-show` for frequent toggles, `v-if` for rare content
- ✅ Clean up event listeners in `onUnmounted`
- ✅ Use `shallowRef`/`shallowReactive` for large flat objects
- ✅ Split large components into smaller ones
- ✅ Use lazy loading for routes and heavy components

## Review Q&A

**Q: When is a `method` better than `computed`?**
A: When you need a function that accepts arguments, or when you don't want caching (like random generators or Date.now()).

**Q: What is Vapor Mode?**
A: An experimental render engine in Vue 3.6 that compiles templates directly to DOM operations without the Virtual DOM, significantly reducing memory usage and improving performance.

## Examples Folder

This section's examples are in `Section 17 - Performance and Best Practices/examples/`:

- `examples/PerformanceDemo.vue`

Open `Section 17 - Performance and Best Practices/examples/` to view the runnable example.

---

**Prev:** Section 16 — UI & Styling
**Next:** Section 18 — Project 1: Task Manager App
