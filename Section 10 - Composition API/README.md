# Section 10: Composition API

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | What is Composition API? |
| 2 | setup() function vs `<script setup>` |
| 3 | useId — Unique ID Generation (Vue 3.5) |
| 4 | What is a Composable? |
| 5 | Creating Your First Composable |
| 6 | useFetch — Data Fetching Composable |
| 7 | Reusing Composables Across Components |

## Key Concepts

- **Composable** — A function prefixed with `use` that encapsulates reusable stateful logic.
- **`setup()` vs `<script setup>`** — Both use the Composition API; `<script setup>` is more concise.
- **`useId()`** — New in Vue 3.5, generates a unique ID per component instance.
- **Naming convention** — All composables should start with `use`.

## Code Reference

```js
// useFetch.js — Data fetching composable
import { ref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  watchEffect(async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(url.value ?? url)
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  })

  return { data, error, isLoading }
}
```

```vue
<!-- Using composables in a component -->
<script setup>
import { useFetch } from './composables/useFetch'
import { useCounter } from './composables/useCounter'

const { data: posts, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')
const { count, increment, decrement } = useCounter(0)
</script>
```

## Review Q&A

**Q: What is the difference between a Composable and a Mixin?**
A: Composables are explicit about data sources, have no name conflicts, and have better TypeScript support. Mixins caused ambiguity about where properties came from.

**Q: Can a composable call another composable?**
A: Yes! Composables can be nested — for example, `useProducts` can call `useFetch` internally.

## Examples Folder

This section's examples are in `Section 10 - Composition API/examples/`:

- `examples/useFetch.js`
- `examples/useCounter.js`
- `examples/ComposableDemo.vue`

Open `Section 10 - Composition API/examples/` to view the runnable examples.

---

**Prev:** Section 09 — Forms in Vue  
**Next:** Section 11 — Lifecycle Hooks
