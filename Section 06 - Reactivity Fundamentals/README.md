# Section 6: Reactivity Fundamentals

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | What is Reactivity? |
| 2 | ref — Reactive References |
| 3 | reactive — Reactive Objects |
| 4 | ref vs reactive — When to Use Which |
| 5 | computed — Derived State |
| 6 | watch — Watching for Changes |
| 7 | watchEffect — Auto-tracked Side Effects |
| 8 | onWatcherCleanup — Vue 3.5 Watcher Cleanup |

## Key Concepts

- **`ref()`** — Makes a primitive or object value reactive; accessed via `.value` in JavaScript.
- **`reactive()`** — Makes an object deeply reactive without `.value`.
- **`computed()`** — Derived state that automatically updates and is cached.
- **`watch()`** — Watches a specific source and runs a callback when it changes.
- **`watchEffect()`** — Auto-tracks reactive dependencies used inside the effect.
- **`onWatcherCleanup()`** — Vue 3.5 feature that registers a cleanup callback before the next watcher run.

## ref vs reactive

| | `ref` | `reactive` |
|---|---|---|
| Type | Any primitive value | Objects / Arrays only |
| Access in JS | `.value` | Direct property access |
| Template usage | Automatically unwraps | Direct usage |
| Best for | Primitives and simple values | Complex objects |
| Destructuring | Breaks reactivity | Breaks reactivity unless using `toRefs()` |

## Code Reference

```js
import { ref, reactive, computed, watch, watchEffect, onWatcherCleanup } from 'vue'

const count = ref(0)
const user = reactive({
  firstName: 'Mina',
  lastName: 'Ali',
  age: 28,
})

const doubleCount = computed(() => count.value * 2)

const fullName = computed({
  get: () => `${user.firstName} ${user.lastName}`,
  set: (value) => {
    const [first, last] = value.split(' ')
    user.firstName = first
    user.lastName = last
  },
})

watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

watch([
  count,
  () => user.age,
], ([newCount, newAge]) => {
  console.log('count:', newCount, 'age:', newAge)
})

watch(user, (newUser) => {
  console.log('User changed:', newUser)
}, { immediate: true, deep: true })

watchEffect((onCleanup) => {
  console.log(`Count: ${count.value}, User: ${user.firstName}`)

  onWatcherCleanup(() => {
    console.log('Cleanup before next run')
  })
})
```

## Review Q&A

**Q: What is the difference between `watch` and `watchEffect`?**
A: `watch` requires an explicit source and provides old and new values. `watchEffect` automatically tracks dependencies and does not provide the old value.

**Q: Why is `computed` better than a method for derived values?**
A: `computed` caches the result and only recalculates when dependencies change. A method runs on every render.

## Examples Folder

This section's examples are in `Section 06 - Reactivity Fundamentals/examples/`:

- `examples/useCounter.js`
- `examples/ReactivityDemo.vue`

Open `Section 06 - Reactivity Fundamentals/examples/` to view the runnable code.

---

**Prev:** Section 05 — Directives  
**Next:** Section 07 — Components
