# Section 3: Vue Fundamentals

> **Vue 3 Course — 23 Sections**

## Lessons

| # | Lesson |
|---|--------|
| 1 | What is Vue? |
| 2 | createApp — Bootstrapping a Vue App |
| 3 | Single File Components (SFC) |
| 4 | Template / Script / Style — The Three Blocks |
| 5 | Composition API as the Default Style |
| 6 | Options API vs Composition API |
| 7 | `<script setup>` — Syntactic Sugar |
| 8 | Compiler Macros (defineProps, defineEmits, etc.) |

## Key Concepts

- **SFC (Single File Component)** — A `.vue` file co-locating template, logic, and styles.
- **Composition API** — The recommended Vue 3 style that organizes code by logic.
- **`<script setup>`** — Syntactic sugar that auto-exposes all top-level bindings to the template.
- **defineProps** — Compiler Macro to declare component props.
- **defineEmits** — Compiler Macro to declare emitted events.
- **defineModel** — Compiler Macro for two-way binding (Vue 3.4+).

## Comparison

```js
// ===== Options API =====
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    doubled() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  },
  mounted() {
    console.log('Mounted!')
  }
}

// ===== Composition API (script setup) =====
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
const increment = () => count.value++
onMounted(() => console.log('Mounted!'))
```

## Code Reference

```vue
<!-- Counter.vue — Simple counter component -->
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

const increment = () => count.value++
const decrement = () => count.value--
const reset = () => (count.value = 0)
</script>

<template>
  <div class="counter">
    <h2>Counter: {{ count }}</h2>
    <p>{{ isEven ? 'Even' : 'Odd' }}</p>
    <div class="buttons">
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
.counter { text-align: center; padding: 2rem; }
.buttons { display: flex; gap: 1rem; justify-content: center; margin-top: 1rem; }
button { padding: 0.5rem 1.5rem; font-size: 1.2rem; cursor: pointer; }
</style>
```

## Review Q&A

**Q: What are Compiler Macros?**
A: Special functions like `defineProps` and `defineEmits` that are processed at compile time and don't need to be imported — they only work inside `<script setup>`.

**Q: Why is `<script setup>` better than a regular `setup()` function?**
A: It's more concise — all top-level variables and functions are automatically available in the template without needing an explicit return.

## Examples Folder

This section's examples are in `Section 03 - Vue Fundamentals/examples/`:

- `examples/Counter.vue`
- `examples/options-vs-composition.js`

Open `Section 03 - Vue Fundamentals/examples/` to view the code samples.

---

**Prev:** Section 02 — Development Environment Setup  
**Next:** Section 04 — Template Syntax & Binding
