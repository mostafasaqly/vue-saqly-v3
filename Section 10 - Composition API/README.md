# Section 10: Composition API

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | What is the Composition API? |
| 2 | setup() function vs `<script setup>` |
| 3 | useId — Unique ID Generation (Vue 3.5) |
| 4 | What is a Composable? |
| 5 | Creating Your First Composable |
| 6 | useFetch — Data Fetching Composable |
| 7 | useLocalStorage — Persistent State Composable |
| 8 | Reusing Composables Across Components |

## Key Concepts

- **Composition API** — A set of APIs (`ref`, `computed`, `watch`, lifecycle hooks) that you call inside a `setup()` function (or `<script setup>`) to compose component logic.
- **`<script setup>`** — Syntactic sugar that eliminates the manual `return`. Every top-level variable and import is automatically available in the template.
- **Composable** — A plain JavaScript function prefixed with `use` that calls Composition API functions internally and returns reactive state. The Vue equivalent of a React Hook.
- **`useId()`** — Vue 3.5. Generates a unique, stable ID per component instance — useful for linking `<label>` and `<input>` elements accessibly without collisions.
- **Naming convention** — All composables must start with `use` (e.g., `useFetch`, `useCounter`, `useMousePosition`). This signals to Vue's linting tools that they follow composable rules.
- **Composables are nestable** — A composable can call other composables. `useProducts` can call `useFetch` internally.

## Options API vs Composition API

```
Options API                       Composition API (<script setup>)
──────────────────────────────    ──────────────────────────────────
data() { return { count: 0 } }    const count = ref(0)
methods: { inc() {...} }          const inc = () => count.value++
computed: { double() {...} }      const double = computed(() => ...)
watch: { count(v) {...} }         watch(count, (v) => {...})
mounted() { ... }                 onMounted(() => { ... })

Logic is split by type            Logic is grouped by feature
Hard to extract & reuse           Easy to extract to composables
```

## Code Reference

```js
// composables/useFetch.js — generic data-fetching composable
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  watchEffect(async () => {
    // toValue() unwraps ref or plain value — supports reactive URLs
    const resolvedUrl = toValue(url)
    if (!resolvedUrl) return

    isLoading.value = true
    error.value = null
    data.value = null

    try {
      const res = await fetch(resolvedUrl)
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
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

```js
// composables/useCounter.js — simple stateful counter composable
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0, options = {}) {
  const { min = -Infinity, max = Infinity } = options

  const count = ref(initialValue)
  const isAtMin = computed(() => count.value <= min)
  const isAtMax = computed(() => count.value >= max)

  const increment = (step = 1) => {
    count.value = Math.min(count.value + step, max)
  }
  const decrement = (step = 1) => {
    count.value = Math.max(count.value - step, min)
  }
  const reset = () => { count.value = initialValue }

  return { count, isAtMin, isAtMax, increment, decrement, reset }
}
```

```js
// composables/useLocalStorage.js — persist reactive state to localStorage
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  const value = ref(stored !== null ? JSON.parse(stored) : defaultValue)

  watch(value, (newVal) => {
    if (newVal === null || newVal === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(newVal))
    }
  }, { deep: true })

  return value
}
```

```vue
<!-- ComposableDemo.vue — using multiple composables in one component -->
<script setup>
import { ref, useId } from 'vue'
import { useFetch } from '@/composables/useFetch'
import { useCounter } from '@/composables/useCounter'
import { useLocalStorage } from '@/composables/useLocalStorage'

// useId — unique, collision-free ID for label-input pairing
const inputId = useId()

// useFetch — reactive URL (pass a ref to watch the URL change)
const userId = ref(1)
const { data: user, isLoading, error } = useFetch(
  () => `https://jsonplaceholder.typicode.com/users/${userId.value}`
)

// useCounter — with min/max bounds
const { count, isAtMin, isAtMax, increment, decrement, reset } = useCounter(0, { min: 0, max: 10 })

// useLocalStorage — persists across page reloads
const theme = useLocalStorage('app-theme', 'light')
</script>

<template>
  <div>
    <!-- useFetch demo -->
    <section>
      <h3>User Fetcher</h3>
      <label :for="inputId">User ID:</label>
      <input :id="inputId" v-model.number="userId" type="number" min="1" max="10" />

      <div v-if="isLoading">Loading user...</div>
      <div v-else-if="error" class="error">Error: {{ error }}</div>
      <pre v-else>{{ user }}</pre>
    </section>

    <!-- useCounter demo -->
    <section>
      <h3>Bounded Counter (0–10)</h3>
      <p>Count: {{ count }}</p>
      <button @click="decrement()" :disabled="isAtMin">−</button>
      <button @click="reset">Reset</button>
      <button @click="increment()" :disabled="isAtMax">+</button>
    </section>

    <!-- useLocalStorage demo -->
    <section>
      <h3>Theme (persisted)</h3>
      <select v-model="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <p>Reload the page — theme stays: {{ theme }}</p>
    </section>
  </div>
</template>
```

## Composable vs Mixin vs Utility Function

| | Composable (`useXxx`) | Mixin | Utility function |
|--|----------------------|-------|-----------------|
| Reactive state | ✅ Yes | ✅ Yes | ✗ No |
| Source clarity | ✅ Explicit import | ✗ Hidden/implicit | ✅ Explicit import |
| Name conflicts | ✅ None (local scope) | ✗ Can collide | ✅ None |
| TypeScript | ✅ Excellent | ✗ Poor | ✅ Excellent |
| Nesting | ✅ Composables call composables | ✗ Complex | N/A |

## Review Q&A

**Q: What is the difference between a Composable and a Mixin?**
A: Composables are explicit — you see exactly where each variable comes from because you import the composable and destructure its return. Mixins merged properties silently, making it impossible to know where `this.someProp` came from. Composables also have no naming conflicts and work perfectly with TypeScript.

**Q: Can a composable call another composable?**
A: Yes — composables are just functions. `useProducts` can call `useFetch` internally. This is one of the main advantages over mixins.

**Q: Why does `useFetch` use `watchEffect` instead of running the fetch in `onMounted`?**
A: `watchEffect` auto-tracks `url` as a dependency. If `url` is a ref and the parent changes it, `watchEffect` automatically re-runs the fetch with the new URL. `onMounted` would only fetch once.

**Q: What is `toValue()` and why is it used in `useFetch`?**
A: `toValue(x)` returns `x.value` if `x` is a ref, otherwise returns `x` as-is. This lets `useFetch` accept both a plain string URL and a reactive ref URL — making the composable more flexible.

## Examples Folder

- `examples/useFetch.js` — generic fetch composable with loading/error states
- `examples/useCounter.js` — counter composable with min/max options
- `examples/ComposableDemo.vue` — component using both composables

---

**Prev:** [Section 09 — Forms in Vue](../Section%2009%20-%20Forms%20in%20Vue/README.md)
**Next:** [Section 11 — Lifecycle Hooks](../Section%2011%20-%20Lifecycle%20Hooks/README.md)
