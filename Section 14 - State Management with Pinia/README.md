# Section 14: State Management with Pinia

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | When Do You Need State Management? |
| 2 | Installing Pinia |
| 3 | Setup Store — Modern Style |
| 4 | State, Getters & Actions |
| 5 | storeToRefs — Preserving Reactivity |
| 6 | Cart Store Example |
| 7 | Persistence with localStorage |

## Key Concepts

- **`defineStore`** — The function to create a Pinia store.
- **Setup Store** — A style similar to `<script setup>` for defining stores.
- **`storeToRefs`** — Required when destructuring from a store to preserve reactivity.
- **Persistence** — Saving state to `localStorage` using a deep `watch`.

## Code Reference

```js
// stores/useCounterStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => (count.value = 0)

  return { count, doubleCount, isPositive, increment, decrement, reset }
})
```

```vue
<!-- Using a store in a component -->
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/useCounterStore'

const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store)
const { increment, decrement, reset } = store
</script>
```

## Review Q&A

**Q: Why do we use `storeToRefs` instead of regular destructuring?**
A: Regular destructuring from the store breaks reactivity — values become static copies. `storeToRefs` converts each value to a reactive ref.

**Q: What is the difference between Pinia and Vuex?**
A: Pinia is simpler (no mutations), has better TypeScript support, works with the Composition API, and is the official state manager for Vue 3.

## Examples Folder

This section's examples are in `Section 14 - State Management with Pinia/examples/`:

- `examples/stores/`

Open `Section 14 - State Management with Pinia/examples/` to view the store examples.

---

**Prev:** Section 13 — HTTP & APIs
**Next:** Section 15 — TypeScript with Vue
