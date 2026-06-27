# Section 11: Lifecycle Hooks

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Component Lifecycle Overview |
| 2 | onMounted — After Component Mounts |
| 3 | onUpdated — After Component Updates |
| 4 | onUnmounted — Before Component Unmounts |
| 5 | Data Fetching in onMounted |
| 6 | Cleanup Logic in onUnmounted |
| 7 | Using Lifecycle Hooks inside Composables |

## Key Concepts

- **`onMounted`** — Runs after the component is mounted in the DOM. Ideal for data fetching and DOM access.
- **`onUpdated`** — Runs after every component update.
- **`onUnmounted`** — Runs before the component is destroyed. Ideal for canceling subscriptions and clearing timers.
- **Memory Leaks** — Always clean up event listeners and timers in `onUnmounted`.
- **Lifecycle in Composables** — Lifecycle hooks can be used inside composables.

## Lifecycle Diagram

```
createApp()
    ↓
beforeCreate (Options API only)
    ↓
created (Options API only)
    ↓
Template Compiled
    ↓
onBeforeMount
    ↓
[DOM Rendered]
    ↓
onMounted  ← Fetch data here
    ↓
[Data Changes]
    ↓
onBeforeUpdate
    ↓
onUpdated
    ↓
[Component Removed]
    ↓
onBeforeUnmount
    ↓
onUnmounted  ← Cleanup resources here
```

## Code Reference

```vue
<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const data = ref(null)
const isLoading = ref(true)
let intervalId = null

onMounted(async () => {
  console.log('Component mounted!')

  const res = await fetch('https://api.example.com/data')
  data.value = await res.json()
  isLoading.value = false

  intervalId = setInterval(() => {
    console.log('Tick...')
  }, 1000)
})

onUpdated(() => {
  console.log('Component updated!')
})

onUnmounted(() => {
  clearInterval(intervalId)
  console.log('Component unmounted, interval cleared')
})
</script>
```

## Review Q&A

**Q: Why not fetch data directly in `<script setup>` without `onMounted`?**
A: You can, but `onMounted` guarantees the DOM is ready and is the right place for operations that need rendered DOM references.

**Q: What happens if you don't clean up event listeners in `onUnmounted`?**
A: Memory leak — the listener keeps running after the component is removed, potentially slowing the app or causing errors.

## Examples Folder

This section's examples are in `Section 11 - Lifecycle Hooks/examples/`:

- `examples/useMousePosition.js`
- `examples/DataFetcher.vue`

Open `Section 11 - Lifecycle Hooks/examples/` to view the runnable examples.

---

**Prev:** Section 10 — Composition API  
**Next:** Section 12 — Routing with Vue Router
