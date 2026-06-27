# Section 6: Reactivity Fundamentals

> **Vue 3 Complete Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | What is Reactivity? |
| 2 | ref — Reactive References |
| 3 | reactive — Reactive Objects |
| 4 | ref vs reactive — When to Use Which |
| 5 | computed — Derived State |
| 6 | Writable computed |
| 7 | watch — Watching for Changes |
| 8 | watchEffect — Auto-tracked Side Effects |
| 9 | onWatcherCleanup — Vue 3.5 Cleanup |
| 10 | toRef and toRefs |

## Key Concepts

- **Reactivity** — Vue tracks which reactive values a template or computed reads. When those values change, Vue automatically re-renders only what's affected.
- **`ref()`** — Wraps any value (primitive or object) in a reactive container. Access the inner value via `.value` in JavaScript. Inside templates, Vue auto-unwraps refs.
- **`reactive()`** — Makes a plain object deeply reactive. No `.value` needed — you access properties directly. Limitation: only works with objects/arrays, not primitives.
- **`computed()`** — A derived value that is automatically cached. Vue only recalculates it when its reactive dependencies change. Calling a computed multiple times returns the cached result.
- **Writable computed** — A computed with both `get` and `set` — useful for two-way binding to a derived value.
- **`watch(source, callback, options)`** — Explicitly watches a reactive source and fires when it changes. Provides both `newValue` and `oldValue`.
- **`watchEffect(fn)`** — Runs the function immediately, auto-tracks every reactive value read inside it, and re-runs whenever any of them change.
- **`toRef` / `toRefs`** — Creates reactive refs from a reactive object's properties — useful for destructuring without losing reactivity.

## ref vs reactive

| | `ref` | `reactive` |
|---|-------|-----------|
| Accepts | Any type | Objects / Arrays only |
| Access in JS | `.value` required | Direct property access |
| Template | Auto-unwrapped (no `.value`) | Direct usage |
| Destructuring | OK — ref stays reactive | Loses reactivity unless `toRefs()` |
| Re-assignment | `ref.value = newObject` works | `reactive = {}` breaks reactivity |
| **Recommended** | ✅ Default choice | For large nested objects |

## Code Reference

```js
import { ref, reactive, computed, watch, watchEffect, toRefs, onWatcherCleanup } from 'vue'

// ── ref ──
const count = ref(0)
const name = ref('Vue')
const list = ref([1, 2, 3])

count.value++             // mutate in script
list.value.push(4)        // objects inside ref are also reactive

// ── reactive ──
const user = reactive({
  firstName: 'Sara',
  lastName: 'Ahmed',
  age: 25,
})

user.age++                // direct property access — no .value

// ── toRefs — destructure without losing reactivity ──
const { firstName, lastName } = toRefs(user)
// firstName and lastName are now refs linked to user

// ── computed (read-only) ──
const doubled = computed(() => count.value * 2)
const fullName = computed(() => `${user.firstName} ${user.lastName}`)

// ── computed (writable) ──
const fullNameWritable = computed({
  get: () => `${user.firstName} ${user.lastName}`,
  set: (value) => {
    const [first, ...rest] = value.split(' ')
    user.firstName = first
    user.lastName = rest.join(' ')
  },
})

// fullNameWritable.value = 'Ali Hassan'  → updates user.firstName and user.lastName

// ── watch — explicit source ──
watch(count, (newVal, oldVal) => {
  console.log(`count: ${oldVal} → ${newVal}`)
})

// Watch multiple sources
watch([count, () => user.age], ([newCount, newAge], [oldCount, oldAge]) => {
  console.log('count:', newCount, 'age:', newAge)
})

// Watch options
watch(
  () => user.firstName,
  (newVal) => console.log('Name changed:', newVal),
  { immediate: true }   // run immediately on setup
)

// Deep watch — detects nested object changes
watch(user, (newUser) => {
  console.log('User changed:', newUser)
}, { deep: true })

// ── watchEffect — auto-tracks dependencies ──
watchEffect(() => {
  // Vue tracks count.value and user.firstName automatically
  console.log(`${user.firstName} clicked ${count.value} times`)

  // Vue 3.5: register cleanup before next run
  onWatcherCleanup(() => {
    console.log('Cleanup before next watchEffect run')
  })
})
```

```vue
<!-- ReactivityDemo.vue — comparing ref and reactive in a template -->
<script setup>
import { ref, reactive, computed } from 'vue'

const score = ref(0)
const player = reactive({ name: 'Player 1', lives: 3 })

const status = computed(() => {
  if (player.lives === 0) return 'Game Over'
  if (score.value >= 100) return 'Winner!'
  return 'Playing...'
})
</script>

<template>
  <div>
    <h2>{{ player.name }}</h2>
    <p>Score: {{ score }} | Lives: {{ player.lives }}</p>
    <p>Status: {{ status }}</p>
    <button @click="score++">+1 Score</button>
    <button @click="player.lives--" :disabled="player.lives === 0">Lose a Life</button>
    <button @click="score = 0; player.lives = 3">Restart</button>
  </div>
</template>
```

## watch vs watchEffect

| | `watch` | `watchEffect` |
|--|---------|--------------|
| Source | Explicit — you declare what to watch | Auto-tracked — reads inside the function |
| Old value | ✅ Available | ✗ Not available |
| Runs immediately | Only with `{ immediate: true }` | ✅ Always runs on setup |
| Use case | React to specific value changes | Side effects that depend on multiple values |

## Review Q&A

**Q: What is the difference between `watch` and `watchEffect`?**
A: `watch` watches an explicit source and gives you both the old and new values. `watchEffect` runs immediately, auto-discovers its dependencies, but doesn't provide the old value. Use `watch` when you care about what changed; use `watchEffect` for side effects that depend on many reactive values.

**Q: Why is `computed` better than a method for derived values?**
A: `computed` caches the result and only recalculates when dependencies change. If you call a computed 10 times with no data change, it calculates once. A method re-runs every time it's called.

**Q: When should I use `ref` over `reactive`?**
A: Default to `ref` for everything — it works with primitives and objects alike and behaves consistently. Use `reactive` when you have a large nested object and want cleaner property access without `.value` everywhere.

**Q: What happens if I destructure a `reactive` object?**
A: The destructured variables become plain, non-reactive values. To safely destructure, use `toRefs(obj)` — it wraps each property in a ref that stays linked to the original object.

## Examples Folder

- `examples/ReactivityDemo.vue` — reactive counter and player state demo
- `examples/useCounter.js` — composable wrapping count logic with watch

---

**Prev:** [Section 05 — Directives](../Section%2005%20-%20Directives/README.md)
**Next:** [Section 07 — Components](../Section%2007%20-%20Components/README.md)
