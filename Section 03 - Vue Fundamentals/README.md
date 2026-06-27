# Section 3: Vue Fundamentals

> **Vue 3 Complete Course — 23 Sections**

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
| 8 | Compiler Macros (defineProps, defineEmits, defineModel) |

## Key Concepts

- **SFC (Single File Component)** — A `.vue` file with three blocks: `<template>` (HTML structure), `<script setup>` (logic), and `<style scoped>` (CSS). The build tool compiles it to JavaScript.
- **`<script setup>`** — Syntactic sugar over the Composition API `setup()` function. Every top-level variable and function is automatically available in the template — no `return` needed.
- **`ref()`** — Makes a primitive value (string, number, boolean) reactive. You read/write the value via `.value` in script, but use it directly in the template.
- **`computed()`** — A cached, derived value that only recalculates when its reactive dependencies change.
- **Compiler Macros** — Special functions (`defineProps`, `defineEmits`, `defineModel`) that are resolved at compile time. They look like function calls but are not imported — they only work inside `<script setup>`.
- **`defineProps`** — Declares what props a child component accepts from its parent.
- **`defineEmits`** — Declares what events a component can emit to its parent.
- **`defineModel`** — Vue 3.4+. Creates a two-way binding prop + emit pair in one line (replaces the `modelValue` / `update:modelValue` pattern).

## Options API vs Composition API

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
    console.log('Component is mounted!')
  }
}

// ===== Composition API with <script setup> =====
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
const increment = () => count.value++
onMounted(() => console.log('Component is mounted!'))
```

> **Why Composition API?** Related logic stays together. You can extract a `useCounter()` composable and reuse it across components. With Options API the same logic is split across `data`, `methods`, and `computed`.

## Code Reference

```vue
<!-- Counter.vue — fundamental building block example -->
<script setup>
import { ref, computed } from 'vue'

// ref wraps primitives — access via .value in script
const count = ref(0)

// computed caches the result until count changes
const isEven = computed(() => count.value % 2 === 0)
const doubled = computed(() => count.value * 2)

const increment = () => count.value++
const decrement = () => count.value--
const reset = () => (count.value = 0)
</script>

<template>
  <div class="counter">
    <h2>Count: {{ count }}</h2>
    <p>Double: {{ doubled }}</p>
    <p>{{ isEven ? 'Even ✓' : 'Odd' }}</p>

    <div class="buttons">
      <button @click="decrement" :disabled="count === 0">−</button>
      <button @click="reset">Reset</button>
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
.counter { text-align: center; padding: 2rem; font-family: sans-serif; }
.buttons { display: flex; gap: 1rem; justify-content: center; margin-top: 1rem; }
button {
  padding: 0.5rem 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  border: 2px solid #42b883;
  border-radius: 6px;
  background: white;
}
button:hover { background: #42b883; color: white; }
button:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
```

```vue
<!-- defineProps + defineEmits example -->
<script setup>
// Child component that receives a value and emits changes
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['increment', 'reset'])
</script>

<template>
  <div>
    <h3>{{ title }}: {{ count }}</h3>
    <button @click="emit('increment')">+1</button>
    <button @click="emit('reset')">Reset</button>
  </div>
</template>
```

```vue
<!-- defineModel — Vue 3.4+ two-way binding -->
<script setup>
// In a child input wrapper component:
const model = defineModel()         // creates v-model binding
// const model = defineModel({ default: '' })  // with default
</script>

<template>
  <input :value="model" @input="model = $event.target.value" />
</template>
```

```vue
<!-- Parent using the child with v-model -->
<script setup>
import { ref } from 'vue'
import MyInput from './MyInput.vue'

const username = ref('')
</script>

<template>
  <MyInput v-model="username" />
  <p>You typed: {{ username }}</p>
</template>
```

## Review Q&A

**Q: What are Compiler Macros and why don't I import them?**
A: `defineProps`, `defineEmits`, and `defineModel` are processed by the Vue compiler at build time. They are recognized by the compiler inside `<script setup>` and transformed into the appropriate runtime code — so there is nothing to import at runtime.

**Q: Why is `<script setup>` better than a regular `setup()` function?**
A: Less boilerplate. With a regular `setup()` you must `return` every variable you want the template to see. With `<script setup>` every top-level binding is automatically exposed, and component imports are auto-registered.

**Q: When do I need `.value` and when don't I?**
A: Inside `<script setup>` (JavaScript), you always access a `ref` via `.value`. Inside `<template>` (HTML), Vue automatically unwraps refs so you write `{{ count }}` not `{{ count.value }}`.

**Q: What is the difference between `ref` and `reactive`?**
A: `ref` works with any type (primitives and objects) and needs `.value`. `reactive` works only with objects/arrays and gives you direct property access without `.value`. Most developers default to `ref` for everything to stay consistent.

## Examples Folder

- `examples/Counter.vue` — counter with computed, increment, decrement, reset
- `examples/options-vs-composition.js` — side-by-side comparison

---

**Prev:** [Section 02 — Development Environment Setup](../Section%2002%20-%20Development%20Environment%20Setup/README.md)
**Next:** [Section 04 — Template Syntax & Binding](../Section%2004%20-%20Template%20Syntax%20and%20Binding/README.md)
