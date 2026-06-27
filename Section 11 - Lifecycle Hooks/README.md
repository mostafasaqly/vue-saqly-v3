# Section 11: Lifecycle Hooks

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | Component Lifecycle Overview |
| 2 | onBeforeMount & onMounted |
| 3 | onBeforeUpdate & onUpdated |
| 4 | onBeforeUnmount & onUnmounted |
| 5 | Data Fetching in onMounted |
| 6 | Cleanup Logic in onUnmounted |
| 7 | onErrorCaptured — Catching Child Errors |
| 8 | Using Lifecycle Hooks inside Composables |

## Key Concepts

- **Lifecycle** — Every Vue component goes through a sequence of phases: creation → mounting → updating → unmounting. Lifecycle hooks let you run code at specific points.
- **`onMounted`** — Fires after the component is inserted into the DOM. The right place for data fetching, DOM measurements, and third-party library initialization.
- **`onUpdated`** — Fires after the component re-renders due to reactive state changes. Use sparingly — `watch` or `computed` are usually better alternatives.
- **`onUnmounted`** — Fires before the component is removed from the DOM. The right place to cancel timers, abort fetch requests, and remove event listeners to prevent memory leaks.
- **`onErrorCaptured`** — Catches errors thrown by descendant components. Return `false` to stop the error from propagating further.
- **Lifecycle hooks in composables** — You can use `onMounted`, `onUnmounted`, etc. inside a composable — they attach to whichever component calls the composable.

## Lifecycle Diagram

```
── Component created ──────────────────────────
   setup() / <script setup> runs
       ↓
   onBeforeMount
       ↓
   [DOM rendered for the first time]
       ↓
   onMounted ← ✅ fetch data, access DOM, init libraries
       ↓
── Data changes ───────────────────────────────
       ↓
   onBeforeUpdate
       ↓
   [DOM patched]
       ↓
   onUpdated ← access updated DOM
       ↓
── Component removed ──────────────────────────
       ↓
   onBeforeUnmount
       ↓
   onUnmounted ← ✅ cancel timers, remove listeners, abort requests
```

## Code Reference

```vue
<!-- DataFetcher.vue — lifecycle hooks with real use cases -->
<script setup>
import { ref, onMounted, onUpdated, onUnmounted, onErrorCaptured } from 'vue'

const props = defineProps({ userId: { type: Number, default: 1 } })

const user = ref(null)
const isLoading = ref(false)
const error = ref(null)

let abortController = null
let pollingInterval = null

const fetchUser = async () => {
  // Cancel any previous in-flight request
  abortController?.abort()
  abortController = new AbortController()

  isLoading.value = true
  error.value = null

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${props.userId}`,
      { signal: abortController.signal }
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    user.value = await res.json()
  } catch (e) {
    if (e.name !== 'AbortError') error.value = e.message
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  console.log('Mounted — DOM ready, starting fetch')
  await fetchUser()

  // Poll for updates every 30 seconds
  pollingInterval = setInterval(fetchUser, 30_000)
})

onUpdated(() => {
  // Only for DOM-dependent operations after re-render
  console.log('Component updated')
})

onUnmounted(() => {
  // Cleanup: prevent memory leaks and stale state
  clearInterval(pollingInterval)
  abortController?.abort()
  console.log('Unmounted — resources cleaned up')
})

onErrorCaptured((err, instance, info) => {
  console.error('Child error caught:', err.message, info)
  error.value = `Child error: ${err.message}`
  return false // stop propagation
})
</script>

<template>
  <div>
    <div v-if="isLoading">Loading user {{ userId }}...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="user" class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <p>{{ user.phone }}</p>
    </div>
  </div>
</template>
```

```js
// composables/useMousePosition.js — lifecycle hooks inside a composable
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  const update = (event) => {
    x.value = event.clientX
    y.value = event.clientY
  }

  // These hooks attach to the component that calls useMousePosition()
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

```vue
<!-- Using the composable in any component -->
<script setup>
import { useMousePosition } from '@/composables/useMousePosition'

const { x, y } = useMousePosition()
</script>

<template>
  <p>Mouse position: {{ x }}, {{ y }}</p>
</template>
```

```js
// composables/useEventListener.js — reusable event listener with auto-cleanup
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, handler) {
  onMounted(() => target.addEventListener(event, handler))
  onUnmounted(() => target.removeEventListener(event, handler))
}
```

## Lifecycle Hooks Reference

| Hook | When it runs | Common use |
|------|-------------|------------|
| `onBeforeMount` | Before first DOM render | Rarely needed |
| `onMounted` | After DOM is inserted | Fetch data, init libraries, access DOM |
| `onBeforeUpdate` | Before DOM re-render | Read DOM before patch |
| `onUpdated` | After DOM re-render | Access updated DOM |
| `onBeforeUnmount` | Before cleanup begins | Rarely needed |
| `onUnmounted` | After component is removed | Clear timers, cancel requests, remove listeners |
| `onErrorCaptured` | Child component throws | Error boundaries |

## Review Q&A

**Q: Why not just fetch data at the top level of `<script setup>` without `onMounted`?**
A: You can for simple cases (and it works fine — `<script setup>` runs at component creation). But `onMounted` is preferred when you need the DOM to be ready, or when the component might be conditionally rendered and you want to defer the fetch. It also makes the intent clearer and is where third-party libraries that need a DOM node must be initialized.

**Q: What happens if you don't clean up in `onUnmounted`?**
A: Memory leaks. A `setInterval` keeps firing after the component is gone. An event listener on `window` keeps running. An in-flight `fetch` can return and try to update a `ref` that no longer belongs to an active component. These bugs are silent and accumulate over time.

**Q: Can I use `async` with lifecycle hooks?**
A: Yes — `onMounted(async () => { ... })` works. The hook starts the async work but Vue doesn't await it. This means errors inside async hooks won't be caught by `onErrorCaptured` unless you catch them manually with try/catch.

**Q: What is the order when a parent and child both have `onMounted`?**
A: Child mounts first, then parent. So `onMounted` in a parent runs after all its children are already mounted. The unmounting order is reversed: parent's `onBeforeUnmount` runs first, then children are unmounted.

## Examples Folder

- `examples/DataFetcher.vue` — fetch with abort on unmount, polling with cleanup
- `examples/useMousePosition.js` — lifecycle hooks encapsulated in a composable

---

**Prev:** [Section 10 — Composition API](../Section%2010%20-%20Composition%20API/README.md)
**Next:** [Section 12 — Routing with Vue Router](../Section%2012%20-%20Routing%20with%20Vue%20Router/README.md)
